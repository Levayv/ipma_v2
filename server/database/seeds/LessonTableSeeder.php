<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('lessons')->insert([
            'name' => "Lesson 1 - Routing",
            'link' => "https://laravel.com/docs/5.8/routing",
            'topic_id' => "123",
            'user_id' => "2",
        ]);
        DB::table('lessons')->insert([
            'name' => "Lesson 2 - Middleware",
            'link' => "https://laravel.com/docs/5.8/middleware",
            'topic_id' => "123",
            'user_id' => "2",
        ]);
        DB::table('lessons')->insert([
            'name' => "Lesson 3 - Requests",
            'link' => "https://laravel.com/docs/5.8/requests",
            'topic_id' => "123",
            'user_id' => "2",
        ]);
        DB::table('lessons')->insert([
            'name' => "Lesson 4 - Responses",
            'link' => "https://laravel.com/docs/5.8/responses",
            'topic_id' => "123",
            'user_id' => "2",
        ]);
        DB::table('lessons')->insert([
            'name' => "Lesson 5 - Views",
            'link' => "https://laravel.com/docs/5.8/views",
            'topic_id' => "123",
            'user_id' => "2",
        ]);
    }
}
