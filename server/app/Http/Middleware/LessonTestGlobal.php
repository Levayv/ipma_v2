<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class LessonTestGlobal
{
    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->testKey === "testValueGlobal"){
            return response()->json(['lesson' => 'test global Middleware works'], 200);
        }
        return $next($request);
    }
}
