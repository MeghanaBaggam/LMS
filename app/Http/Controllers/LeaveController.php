<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leave;
use App\Services\LeaveService;

class LeaveController extends Controller
{
    protected  $leaveService;

    public function __construct(LeaveService $leaveService)
    {
        $this->leaveService = $leaveService;
    }

    public function store(Request $req)
    {
        $req->user()->can('apply-leave') || abort(403, 'Forbidden');

        $data = $req->validate([
            'start_date' => 'required|date',
            'end_date'   => 'required|date|after_or_equal:start_date',
            'type'       => 'required|in:sick,vacation,casual',
            'reason'     => 'nullable|string|max:500',
        ]);

        $result = $this->leaveService->createLeave($req->user(), $data);

        if (isset($result['error'])) {
            return response()->json(['message' => $result['error']], 422);
        }

        return response()->json($result, 201);
    }

    public function index(Request $req)
    {
        return $this->leaveService->getLeaves($req->user());
    }

    public function approve(Request $req, Leave $leave)
    {
        $req->user()->can('approve-leave') || abort(403, 'Forbidden');

        $result = $this->leaveService->approveLeave($req->user(), $leave);

        if (isset($result['error'])) {
            return response()->json(['message' => $result['error']], 422);
        }

        return response()->json($result);
    }

    public function reject(Request $req, Leave $leave)
    {
        $req->user()->can('reject-leave') || abort(403, 'Forbidden');

        $validated = $req->validate([
            'rejected_reason' => 'required|string|max:500'
        ]);

        $result = $this->leaveService->rejectLeave(
            $req->user(),
            $leave,
            $validated['rejected_reason']
        );

        return response()->json($result);
    }
}
