<?php

namespace App\Services;

use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;

class LeaveService
{
    public function createLeave(User $user, array $data)
    {
        $start = Carbon::parse($data['start_date']);
        $end   = Carbon::parse($data['end_date']);
        $days  = $start->diffInDays($end) + 1;

        if ($user->leave_balance < $days) {
            return ['error' => 'Insufficient leave balance'];
        }

        $leave = Leave::create([
            'user_id'    => $user->id,
            'start_date' => $data['start_date'],
            'end_date'   => $data['end_date'],
            'type'       => $data['type'],
            'reason'     => $data['reason'] ?? null,
            'days'       => $days,
            'status'     => 'pending',
        ]);

        return $leave;
    }

    public function getLeaves(User $user)
    {
        if ($user->hasRole('hr')) {
            return Leave::with('user')->orderByDesc('created_at')->get();
        }

        if ($user->hasRole('manager')) {
            $teamIds = $user->teamMembers()->pluck('id');
            return Leave::whereIn('user_id', $teamIds)
                ->with('user')
                ->orderByDesc('created_at')
                ->get();
        }

        return $user->leaves()->orderByDesc('created_at')->get();
    }

    public function approveLeave(User $approver, Leave $leave)
    {
        $employee = $leave->user;

        if ($employee->leave_balance < $leave->days) {
            return ['error' => 'Employee has insufficient balance'];
        }

        $leave->update([
            'status'      => 'approved',
            'approved_by' => $approver->id,
        ]);

        $employee->decrement('leave_balance', $leave->days);

        return $leave;
    }

    public function rejectLeave(User $approver, Leave $leave, string $reason)
    {
        $leave->update([
            'status'          => 'rejected',
            'approved_by'     => $approver->id,
            'rejected_reason' => $reason,
        ]);

        return $leave;
    }
}
