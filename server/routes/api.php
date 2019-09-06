<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//------------------------------------------------------------------
Route::group(['middleware' => 'api-cors'], function () {

    // The registration and login requests doesn't come with tokens
    // as users at that point have not been authenticated yet
    // Therefore the jwtMiddleware will be exclusive of them
    Route::post('user/login', 'UserController@login');
    Route::post('user/register', 'UserController@register');
});
//Route::put('post/{id}', function ($id) {
//    //
//})->middleware('role:editor');


Route::group(
    [
        'prefix' => 'lesson',
        'middleware' => [
            'lesson-test',
            'lesson-test2',
            'api-cors',
        ]
    ]
    , function () {
    Route::get('/', 'LessonController@index');
    Route::get('{id}', 'LessonController@read');
    Route::post('/', 'LessonController@create');
    Route::put('{id}', 'LessonController@update');
    Route::delete('{id}', 'LessonController@delete');
});

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
