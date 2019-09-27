<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'me']]);
        $this->middleware('authHandle', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['errors' => ['Invalid Credentials', 'Wrong Email and/or Password']], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        $userInfo = auth()->user();

        if (!isset($userInfo)) {
            // todo research use case,
            //  HandleAuthorizationHeaders middleware will exclude the case of missing user
            $userInfo = [
                'status' => 'fail',
                'title' => '... No user defined with this token , practically impossible ...',
            ];
        }
        // todo strip $userInfo from unused data
        return response()->json($userInfo);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ],
            200
//            ,
//            ["Authorization" => "$token"]
        );
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        return response()->json(compact('user'));
    }


    /**
     * @return string|null
     */
    public
    static function getAuthBearerToken($request)
    {
        $authHeader = null;
        $authHeaderBuffer = $request->header('Authorization', '');
        if (Str::startsWith($authHeaderBuffer, 'Bearer ')) {
            $authHeader = Str::substr($authHeaderBuffer, 7);
        }
        return $authHeader;
    }

    public
    static function setAuthBearerToken($response)
    {

    }

    public
    static function getRefreshedToken()
    {
        return auth()->refresh();
    }
}
