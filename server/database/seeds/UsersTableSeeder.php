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
            'email' => 'LevAyv@mail.ru',
            'password' => bcrypt('123456789'),
        ]);
        DB::table('users')->insert([
            'name' => 'Telman',
            'email' => 'TelSar@mail.ru',
            'password' => bcrypt('88665544'),
        ]);
    }
}
