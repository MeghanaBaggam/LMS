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
        $hr=User::create([
            'name'=>'Shyampal Reddy',
            'email'=>'shyampalreddy@pal.tech',
            'password'=>Hash::make('password'),
            'role'=>'hr',
            'leave_balance'=>20
        ]);

        $manager=User::create([
             'name'=>'Suresh',
            'email'=>'suresh@pal.tech',
            'password'=>Hash::make('password'),
            'role'=>'manager',
            'leave_balance'=>20
        ]);
        $emp=User::create([
            'name'=>'Meghana Baggam',
            'email'=>'meghanabaggam@pal.tech',
            'password'=>Hash::make('password'),
            'role'=>'employee',
            'manager_id'=>$manager->id,
            'leave_balance'=>20
        ]);
    }
}
