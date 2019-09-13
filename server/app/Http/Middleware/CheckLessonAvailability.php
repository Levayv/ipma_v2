<?php

namespace App\Http\Middleware;

use App\Http\Controllers\LessonController;
use App\Lesson;
use Closure;

//todo consider refactoring , research middleware naming conventions
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
//  $entity = request()->route('entity');
//  const a = [
//      'lesson' => Lesson::class,
//  ];
}
