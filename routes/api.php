<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\AuthController;

Route::post('leaves/{leave}/approve',[LeaveController::class, 'approve']);
Route::post('leaves/{leave}/reject',[LeaveController::class, 'reject']);

