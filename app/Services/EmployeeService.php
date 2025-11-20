<?php
namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class EmployeeService{
    public function getAllEmployees(){
        return User::with(['roles','manager'])->orderBy('name')->get();
    }
    public function createEmployee(array $data){
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
        return $user;
    }
    public function updateEmployee(User $user,array $data){
        $req->validate([
            'name'        => 'sometimes|string',
            'email'       => 'sometimes|email|unique:users,email,' . $user->id,
            'role'        => 'sometimes|in:employee,manager,hr',
            'manager_id'  => 'nullable|exists:users,id',
            'leave_balance' => 'sometimes|numeric'
        ]);

        $user->update($req->all());

        return response()->json($user);
    }
    public function deleteEmployee(User $user){
        $user->delete();
    }

}

