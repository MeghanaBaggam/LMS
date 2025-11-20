<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $employee=Role::create(["name"=>"employee"]);
        $manager=Role::create(["name"=>"manager"]);
        $hr=Role::create(["name"=>"hr"]);
        $admin=Role::create(["name"=>"admin"]);

        $permissions=[
           'apply-leave',
            'view-own-leaves',
            'view-team-leaves',
            'approve-leave',
            'reject-leave',
            'view-all-leaves',
            'manage-employees'
        ];

        foreach($permissions as $permission){
            Permission::create(['name'=>$permission]);
        }
       
        $employee->givePermissionTo(['apply-leave','view-own-leaves']);
        $manager->givePermissionTo(['view-team-leaves','approve-leave','reject-leave']);
        $hr->givePermissionTo(['view-all-leaves','manage-employees']);
       $admin->givePermissionTo(Permission::all());
    }
}
