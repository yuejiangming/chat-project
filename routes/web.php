<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('/build/main');
});

Route::any('/login', 'AuthController@login');

Route::any('/test', 'AuthController@test');

Route::get('/home', 'HomeController@index');

Route::any('/register', 'AuthController@register');

Route::get('/validateaccount', 'AuthController@verifyAccount');

Route::any('/changepswd', 'AuthController@changePswd');

Route::any('/profile', 'DataController@getUserProfile');

Route::post('/changeprofile', 'DataController@changeProfile');

Route::get('{path?}', function() {
    return view('/build/main');
})->where('path', '.+');