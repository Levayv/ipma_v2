<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permissions')->insert([
            'name' => 'read_lesson',
        ]);
        DB::table('permissions')->insert([
            'name' => 'create_lesson',
        ]);
        DB::table('permissions')->insert([
            'name' => 'update_lesson',
        ]);
        DB::table('permissions')->insert([
            'name' => 'delete_lesson',
        ]);
        DB::table('permissions')->insert([
            'name' => 'read_user',
        ]);
        DB::table('permissions')->insert([
            'name' => 'create_user',
        ]);
        DB::table('permissions')->insert([
            'name' => 'update_user',
        ]);
        DB::table('permissions')->insert([
            'name' => 'delete_user',
        ]);

    }
}
