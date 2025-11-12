<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $hr=User::firstOrCreate(
            ['email'=>'shyampalreddy@pal.tech'],
             ['name'=>'Shyampal Reddy',
            'password'=>Hash::make('password'),
            'leave_balance'=>20
             ]
        );
        $hr->assignRole('hr');

        $manager=User::FirstOrCreate(
            ['email'=>'suresh@pal.tech'],
            ['name'=>'Suresh',
            'password'=>Hash::make('password'),
            'role'=>'manager',
            'leave_balance'=>20
            ]
        );
        $manager->assignRole('manager');
        $employee=User::FirstOrCreate(
           [ 'email'=>'meghanabaggam@pal.tech'],
            ['name'=>'Meghana Baggam',
            'password'=>Hash::make('password'),
            'role'=>'employee',
            'manager_id'=>$manager->id,
            'leave_balance'=>20
            ]
        );
        $employee->assignRole('employee');
    }
}
