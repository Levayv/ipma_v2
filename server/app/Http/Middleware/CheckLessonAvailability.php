<?php

namespace App\Http\Middleware;

use App\Http\Controllers\LessonController;
use App\Lesson;
use Closure;

//todo consider refactoring , research middleware naming conventions

/**
 *  Create Response imminently if Lesson doesn't exist without accessing controller actions
 */
class CheckLessonAvailability
{
    /**
     * Handle an incoming request.
     *
     * @param $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $id = request()->route('id');
        $lesson = Lesson::query()->find($id);
        if (!$lesson) {
            return response()->json(
                LessonController::getJsonFail(null)
            );
        }
        return $next($request);
    }

//  todo future - implement universal solution
//  1. array for storing Model list
//      const a = [
//          'lesson' => Lesson::class,
//      ];
//  2. compare if corresponding Model exist with array map
//  3. add 'lesson' , 'topic' , 'user' etc to parameters inside routes/api.php
//      //Route::get('{entity}/{id}');
//  4. getCorresponding model name like id parameter
//      $entity = request()->route('entity');
}
