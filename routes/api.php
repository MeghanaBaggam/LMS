<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\AuthController;


Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('user-data', [AuthController::class, 'userData']);
    Route::apiResource('leaves', LeaveController::class);
    Route::post('leaves/{leave}/approve',[LeaveController::class, 'approve']);
    Route::post('leaves/{leave}/reject',[LeaveController::class, 'reject']);
});
