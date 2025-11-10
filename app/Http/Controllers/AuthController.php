<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use  Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
class AuthController extends Controller
{
    public function login(Request $req)
    {
        $req->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);

        $user=User::where('email',$req->email)->first();
        if(!$user || !Hash::check($req->password,$user->password)){
            throw ValidationException::withMessages([
                'email'=>['the provided credentials are Incorrect']
            ]);
            
        }
        //create session
        auth()->login($user);
        $token = $user->createToken('authToken')->plainTextToken;
        return response()->json([
            'user'=>$user,
            'message'=>'Loggedin',
            
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
