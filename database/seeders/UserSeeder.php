<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // HR
        $hr = User::firstOrCreate(
            ['email' => 'shyampalreddy@pal.tech'],
            [
                'name' => 'Shyampal Reddy',
                'password' => Hash::make('password'),
                'leave_balance' => 20,
                'role' => 'hr'
            ]
        );
        $hr->assignRole('hr');

        // Manager
        $manager = User::firstOrCreate(
            ['email' => 'suresh@pal.tech'],
            [
                'name' => 'Suresh',
                'password' => Hash::make('password'),
                'leave_balance' => 20,
                 'role'=>'manager'
            ]
        );
        $manager->assignRole('manager');

        // Employee
        $employee = User::firstOrCreate(
            ['email' => 'meghanabaggam@pal.tech'],
            [
                'name' => 'Meghana Baggam',
                'password' => Hash::make('password'),
                'manager_id' => $manager->id,
                'leave_balance' => 20,
                'role'=>'employee'
            ]
        );
        $employee->assignRole('employee');
    }
}
