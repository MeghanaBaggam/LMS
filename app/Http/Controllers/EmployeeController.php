<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use  Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index(){
        return User::with('roles')->orderBy('name')->get();
    }
    public function store(Request $req){
        $req->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6',
            'role'=>'required|in:employee,manager,hr',
            'manager_id'=>'nullable|exists:users,id',
        ]);
        $user=User::create([
            'name'=>$req->name,
            'email'=>$req->email,
            'password'=>Hash::make($req->password),
            'manager_id'=>$req->manager_id,//hr choose manager
            'leave_balance'=>20,
        ]);
        $user->assignRole($req->role);
        return response()->json($user,201);
    }
    public function update(Request $req,User $user){
        $req->validate([
            'name'        => 'sometimes',
            'email'       => 'sometimes|email|unique:users,email,' . $user->id,
            'role'        => 'sometimes|in:employee,manager,hr',
            'manager_id'  => 'nullable|exists:users,id',
            'leave_balance' => 'sometimes|numeric'
        ]);
        $data=$req->only(['name','email','manager_id','leave_balance']);
         $user->update($data);
        //if role updated
        if($req->role){
            $user->syncRoles([$req->role]);
        }
       
        return response()->json($user);
    }
    public function destroy(User $user){
        $user->delete();
        return response()->json(['message'=>'Deleted']);
    }
}
