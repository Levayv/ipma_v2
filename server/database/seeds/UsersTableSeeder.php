<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Levon',
            'email' => 'levayv@mail.ru',
            'password' => '$2y$10$wf4xNG0FT2J2GMY/P6McBes7/p0ZHL.ycLUDKLP.dlpEK7NyG1c8O',
//            'role_id' => '1',
//            'password' => bcrypt('password'),
        ]);
    }
}
