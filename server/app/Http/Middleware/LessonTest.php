<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LessonTest
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->testKey === "testValue") {
            return response()->json(['lesson' => 'test Middleware works '], 200);
        }
        return $next($request);
    }
}
