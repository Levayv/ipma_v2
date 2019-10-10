<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'name' => 'super_admin',
        ]);
        DB::table('roles')->insert([
            'name' => 'mentor_admin',
        ]);
        DB::table('roles')->insert([
            'name' => 'intern_user',
        ]);
    }
}
