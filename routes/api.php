<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\EmployeeController;
use Tymon\JWTAuth\Facades\JWTAuth;

// Public route
Route::post('user/login', [AuthController::class, 'login']);

//  Protected routes
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('user-data', [AuthController::class, 'userData']);
    
    //employee actions
    Route::middleware('role:employee')->group(function (){
        Route::post('leaves',[LeaveController::class,'store']);
        Route::get('leaves',[LeaveController::class,'index']);
    });

    //manager actions
    Route::middleware('role:manager')->group(function (){
        Route::get('team/leaves',[LeaveController::class,'index']);
        Route::post('leaves/{leaves}/approve',[LeaveController::class,'approve']);
        Route::post('leaves/{leaves}/reject',[LeaveController::class,'reject']);
    });
    //HR actions
    Route::middleware('role:hr')->group(function (){
        Route::get('all/leaves',[LeaveController::class,'index']);
        Route::apiResource('employees',EmployeeController::class);
    });
    //admin actions
    Route::middleware('role:admin')->group(function (){
        Route::get('roles',function (){
            return \Spatie\Permission\Models\Role::all();
        });
    });
});

