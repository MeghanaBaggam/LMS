<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Leave extends Model

{
    protected $fillable=[
        'user_id','start_date','end_date','type','reason','status','approved_by',
        'rejected_reason','days',
    ];
     protected $table = 'leaves';
         protected $primaryKey = 'id'; 
    //get the user who requested the leave
    public function user(): BelongsTo
    {
        
        return $this->belongsTo(User::class, 'user_id');
    }
    //get the manager/hr who approves the leave
    public function approver(): BelongsTo
    {
        
        return $this->belongsTo(User::class, 'approved_by');
    }
}

