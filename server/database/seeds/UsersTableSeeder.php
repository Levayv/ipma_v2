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
            'name' => 'Armen M.',
            'email' => 'A.Mshetsyan@mail.ru',
            'password' => '$2y$10$wf4xNG0FT2J2GMY/P6McBes7/p0ZHL.ycLUDKLP.dlpEK7NyG1c8O',
            'role_id' => '1',
        ]);
        DB::table('users')->insert([
            'name' => 'Armen F.',
            'email' => 'A.Feroyan@mail.ru',
            'password' => '$2y$10$wf4xNG0FT2J2GMY/P6McBes7/p0ZHL.ycLUDKLP.dlpEK7NyG1c8O',
            'role_id' => '2',
        ]);
        DB::table('users')->insert([
            'name' => 'Anushavan K.',
            'email' => 'A.Karapetyan@mail.ru',
            'password' => '$2y$10$wf4xNG0FT2J2GMY/P6McBes7/p0ZHL.ycLUDKLP.dlpEK7NyG1c8O',
            'role_id' => '2',
        ]);
        DB::table('users')->insert([
            'name' => 'Levon A.',
            'email' => 'L.Ayvazyan@mail.ru',
            'password' => '$2y$10$wf4xNG0FT2J2GMY/P6McBes7/p0ZHL.ycLUDKLP.dlpEK7NyG1c8O',
            'role_id' => '3',
        ]);


    }
}
