<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index(){
        return User::with(['roles','manager'])->orderBy('name')->get();
    }

    public function store(Request $req){
        $req->validate([
            'name'       => 'required',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:6',
            'role'       => 'required|in:employee,manager,hr',
            'manager_id' => 'nullable|exists:users,id',
        ]);

        $user = User::create([
            'name'        => $req->name,
            'email'       => $req->email,
            'password'    => Hash::make($req->password),
            'manager_id'  => $req->manager_id,
            'leave_balance'=> 20,
        ]);

        $user->assignRole($req->role);

        return response()->json($user, 201);
    }

    public function update(Request $req, User $user){

        $req->validate([
            'name'        => 'sometimes|string',
            'email'       => 'sometimes|email|unique:users,email,' . $user->id,
            'role'        => 'sometimes|in:employee,manager,hr',
            'manager_id'  => 'nullable|exists:users,id',
            'leave_balance' => 'sometimes|numeric'
        ]);

        if ($req->has('name')) {
            $user->name = $req->name;
        }

        if ($req->has('email')) {
            $user->email = $req->email;
        }

        if ($req->has('manager_id')) {
            $user->manager_id = $req->manager_id;
        }

        if ($req->has('leave_balance')) {
            $user->leave_balance = $req->leave_balance;
        }

        if ($req->has('role')) {
            $user->syncRoles([$req->role]);
        }

        $user->save();

        return response()->json($user);
    }

    public function destroy(User $user){
        $user->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
