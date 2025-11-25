<?php
namespace App\Services;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class EmployeeService{
    public function getAllEmployees(){
        return User::with(['roles','manager'])->orderBy('name')->get();
    }
    public function createEmployee(array $data){
        
        $user = User::create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password'      => Hash::make($data['password']),
            'role'          =>$data['role'], 
            'manager_id'    => $data['manager_id'] ?? null,
            'leave_balance' => 20,
        ]);

         $user->syncRoles([$data['role']]);
        return $user;
    }
    public function updateEmployee(User $user,array $data){
       

        $user->update($data);

        return response()->json($user);
    }
    public function deleteEmployee(User $user){
        $user->delete();
    }

}

