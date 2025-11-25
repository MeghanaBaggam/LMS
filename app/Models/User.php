<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Spatie\Permission\Traits\HasRoles; 

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, HasRoles, Notifiable;

    protected $guard_name = 'api';

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'manager_id',
        'leave_balance',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    public function teamMembers()
    {
        return $this->hasMany(User::class, 'manager_id');
    }

    public function leaves()
    {
        return $this->hasMany(Leave::class, 'user_id');
    }

    public function approvedLeaves()
    {
        return $this->hasMany(Leave::class, 'approved_by');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
