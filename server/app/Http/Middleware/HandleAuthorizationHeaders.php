<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

/**
 * Get Authorization Header from Request if present , valid and not expired
 * Set appropriate Authorization Header if needed
 */
class HandleAuthorizationHeaders extends BaseMiddleware
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
//        return $next($request);

        // todo standardize error codes and error structure
        try {
            $this->auth->parseToken()->authenticate(); // returns $user
        } catch (TokenExpiredException $e) {
            return response()->json([
                'status' => 'fail',
                'title' => 'Token is Expired',
                'details' => '... You have been idle for too long ...',
            ],500);
        } catch (TokenBlacklistedException $e) {
            return response()->json([
                'status' => 'fail',
                'title' => 'Token is blacklisted',
                'details' => '... Token was refreshed , this is old one  ...',
            ],500);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'status' => 'fail',
                'title' => 'Token is Invalid',
                'details' => '... Token is not provided by server ...',
            ],500);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'fail',
                'title' => 'Token is missing',
                'details' => '... Authorization Token not found in request headers ...',
            ],500);
        }

        $response = $next($request);

        $token = auth()->refresh();
        $response->header('Authorization', $token);

        return $response;
    }
}
