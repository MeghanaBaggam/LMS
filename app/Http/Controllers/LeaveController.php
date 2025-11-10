<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Leave;
use  Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use  Illuminate\Support\Facades\Validator;

class LeaveController extends Controller
{
    //employee apply
    public function store(Request $req){
        $data=$req->validate([
            'start_date'=>'required|date',
            'end_date'=>'required|date|after_or_equal:start_date',
            'type'=>'required|in:sick|vacation|casual',
            'reason'=>'nullable|string|max:500',
        ]);
       $user=$req->user();
       $start=Carbon::parse($data['start_date']);
       $end=Carbon::parse($data['end_date']);
       $days=$start->diffInDays($end)+1;


       //check balance
       if($user->leave_balance<$days){
        return response()->json(['message'=>'Insufficient leave balance'],422);
       }
       $leave=Leave::create([
        'user_id'=>$user->id,
        'start_date'=>$data['start_date'],
        'end_date'=>$data['end_date'],
        'type'=>$data['type'],
        'reason'=>$data['reason']?? null,
        'days'=>$days,
        'status'=>'pending',
       ]);
       return response()->json($leave,201);
    }
    //employee:view own leaves
    public function index(Request $req){
        $user=$req->user();
        if($user->role==='hr'){
            return Leave::with('user')->orderByDesc('created_at')->get();
        }
        if($user->role==='manager'){//manager see all leaves
            $teamIds=$user->teamMembers()->pluck('id');
            return Leave::whereIn('user_id',$teamIds)->with('user')->orderByDesc('created_at')->get();
        }
        //for normal employee
        return $user->leaves()->orderByDesc('created_at')->get();
    }
        public function approve(Request $req,Leave $leave){
            $user=$req->user();
            if($user->role!=='manager' && $user->role!=='hr'){
                return response()->json(['message'=>'Forbidden'],403);
            }
            if($user->role==='manager' && $leave->user->manager_id!==$user->id){
                return response()->json(['message'=>'Not your team member'],403);
            }
            $employee=$leave->user;
            if($employee->leave_balance<$leave->days){
                return response()->json(['message'=>'Employee has insufficient balance'],422);
            }
            $leave->update([
                'status'=>'approved',
                'approved_by'=>$user->id
            ]);
             $employee->decrement('leave_balance',$leave->days);
           return response()->json($leave);
        }
        public function reject(Request $req,Leave $leave){
            $user=$req->user();
            $req->validate(['rejected_reason'=>'required|string|max:500']);
            if($user->role!=='manager' && $user->role!=='hr'){
                return response()->json(['messages'=>'Forbidden'],403);
            }
            if($user->role==='manager' && $leave->user->manager_id!==$user->id){
                return response()->json(['message'=>'Not your team member'],403);
            }
            $leave->update([
                'status'=>'rejected',
                'approved_by'=>$user->id,
                'rejected_reason'=>$req->rejected_reason,
            ]);
            return response()->json($leave);
        }

    }

