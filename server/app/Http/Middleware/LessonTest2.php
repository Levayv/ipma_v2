<?php

namespace App\Http\Middleware;

use Closure;

class LessonTest2
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        \Auth::user();
        $response->header('Authorization', "my_crappy_token");
        return $response;
    }
}
