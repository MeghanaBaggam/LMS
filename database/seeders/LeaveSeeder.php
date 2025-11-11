<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;

class LeaveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $employee=User::where('email','meghanabaggam@pal.tech')->first();
        $manager=User::where('email','suresh@pal.tech')->first();

        if($employee && $manager){
             Leave::create([
                'user_id' => $employee->id,
                'start_date' => Carbon::now()->addDays(7),
                'end_date' => Carbon::now()->addDays(9),
                'type' => 'vacation',
                'reason' => 'Going to my Hometown',
                'status' => 'pending', 
                'days' => 3,
            ]);
              Leave::create([
                'user_id' => $employee->id,
                'start_date' => Carbon::now()->subDays(10),
                'end_date' => Carbon::now()->subDays(9),
                'type' => 'sick',
                'reason' => 'Had the flu.',
                'status' => 'approved', 
                'approved_by' => $manager->id,
                'days' => 2,
            ]);
        }
    }
}
