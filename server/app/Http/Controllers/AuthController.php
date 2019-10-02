<?php

namespace App\Http\Controllers;

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
            return response()->json([
                'errors' => [
                    'Invalid Credentials',
                    'Wrong Email and/or Password',
                ],
                'isLoginSuccessful' => false,
            ],
                200);
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
        $response = response();
        return $response
            ->json(
                [
                    'isLoginSuccessful' => true,
                    'access_token' => "look in the header dude",
                    'token_type' => 'bearer',
                    'expires_in' => auth()->factory()->getTTL() * 60
                ], 200)
            ->header(
                'Authorization', $token
            );
    }
}
