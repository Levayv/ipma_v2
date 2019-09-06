<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\JWTAuth;
use JWTAuthException;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    private static function getToken($email, $password)
    {
        $token = null;
//        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password] )) {
                return response()->json([
                    'response' => 'error',
                    'message' => 'Password or email is invalid',
                    'token'=>"EMPTY"
                ]);
            }
        } catch (JWTAuthException $e) {
            return response()->json([
                'response' => 'error',
                'message' => 'Token creation failed',
            ]);
        }
        return $token;
    }
    public function login(Request $request)
    {
        $user = \App\User::where('email', $request->email)->get()->first();
        if ($user && Hash::check($request->password, $user->password)) // The passwords match...
        {
            $token = self::getToken($request->email, $request->password);
            $user->auth_token = $token;
            $user->save();
            $response = ['success'=>true, 'data'=>['id'=>$user->id,'auth_token'=>$user->auth_token,'name'=>$user->name, 'email'=>$user->email]];
        }
        else
            $response = ['success'=>false, 'data'=>'Record doesnt exists'];

        return response()->json($response, 201);
    }
    public function register(Request $request)
    {
        // todo add validator
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'name' => 'required|string|max:64',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $payload = [
            'password'=>Hash::make($request->password),
            'email'=>$request->email,
//            'first_name'=>$request->first_name,
//            'last_name'=>$request->last_name,
            'name'=> $request->name,
            'auth_token'=> '',
        ];

        $user = new \App\User($payload);
        if ($user->save())
        {
            // generate user token
            $token = self::getToken(
                $request->email,
                $request->password
            );

            // if token generation failed , return
            if (!is_string($token)){
                return response()->json(['success'=>false,'data'=>'Token generation failed'], 201);
            }

            $user = \App\User::where('email', $request->email)->get()->first();

//            $user->auth_token = $token; // update user token

            $user->save();
            $response = [
                'success'=>true,
                'data'=>[
                    'name'=>$user->name,
                    'id'=>$user->id,
                    'email'=>$request->email,
                ]
            ];
            $response->header("AUTH_TEMP" , $token);
        }
        else
            $response = ['success'=>false, 'data'=>'User registration failed'];


        return response()->json($response, 201);
    }
}
