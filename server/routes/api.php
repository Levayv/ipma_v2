<?php

//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//Route::middleware('auth')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group([

//   middleware api is assigned in AuthController's constructor
//    'middleware' => 'api',
    'prefix' => 'auth'

], function (/*$router*/) {

    Route::post('login', 'AuthController@login')->name('login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');

});

Route::group([
    'prefix' => 'lesson'
], function () {

    Route::post('/', 'LessonController@store');  // store lesson
    Route::get('/', 'LessonController@index');   // read list of lessons
    Route::get('{id}', 'LessonController@show');    // read single lesson
    Route::put('{id}', 'LessonController@update');  // update lesson
    Route::delete('{id}', 'LessonController@delete'); // delete lesson
}
);

