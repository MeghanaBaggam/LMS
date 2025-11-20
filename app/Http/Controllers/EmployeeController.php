<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Services\EmployeeServices;

class EmployeeController extends Controller
{
    protected EmployeeService $employeeService;

    public function __construct(EmployeeService $employeeService){
        $this->employeeService=$employeeService;
    }
    
    public function index(){
        $employees=$this->employeeService->getAllEmployees();
        return response()->json($employees);
    }

    public function store(Request $req){
        $req->validate([
            'name'       => 'required',
            'email'      => 'required|email|unique:users',
            'password'   => 'required|min:6',
            'role'       => 'required|in:employee,manager,hr',
            'manager_id' => 'nullable|exists:users,id',
        ]);

        
    }

    public function update(Request $req, User $user){
         $req->validate([
            'name'        => 'sometimes|string',
            'email'       => 'sometimes|email|unique:users,email,' . $user->id,
            'role'        => 'sometimes|in:employee,manager,hr',
            'manager_id'  => 'nullable|exists:users,id',
            'leave_balance' => 'sometimes|numeric'
        ]);

    }

    public function destroy(User $user){
       
    }
}
