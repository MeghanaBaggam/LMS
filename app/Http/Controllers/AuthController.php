<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use  Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
class AuthController extends Controller
{
    public function login(Request $req){
    $crendetials=$req->only('email','password');
    
        try{
            if(!$token=JWTAuth::attempt($crendetials)){
                return response()->json(['error'=>'invalid Credentials'],401);
            }
        }
          catch (JWTException $e) {
        return response()->json(['error' => 'Could not create token'], 500);
    }
       return response()->json([
        'token'=>$token,
        'user'=>auth()->user()
       ]);
    }
    public function logout(Request $req){
        auth()->logout();
        return response()->json(['message'=>'Logged Out']);
    }
    public function userData(Request $req){
        return response()->json(auth()->user());
    }
}
