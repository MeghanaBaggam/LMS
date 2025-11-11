<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\EmployeeController;

// Public route
Route::post('user/login', [AuthController::class, 'login']);


//  Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('user-data', [AuthController::class, 'userData']);
    Route::apiResource('leaves', LeaveController::class);
    Route::post('leaves/{leave}/approve', [LeaveController::class, 'approve'])->middleware('role:manager,hr');
    Route::post('leaves/{leave}/reject', [LeaveController::class, 'reject'])->middleware('role:manager,hr');
});

// Restricted routes
Route::middleware(['auth:sanctum', 'role:hr'])->group(function () {
    Route::apiResource('employees', EmployeeController::class);
});
