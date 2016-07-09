<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::get('/articles', 'HomeController@articles');
Route::get('/article/{article}', 'HomeController@article');

Route::get('/galleries', 'HomeController@galleries');
Route::get('/gallery/{gallery}', 'HomeController@gallery');

Route::get('/map', 'MapController@index');
Route::get('/map/positions/{latest?}', 'MapController@getPositions');
Route::get('/map/add', 'MapController@addPosition');

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function() {
    Route::get('/', function() {
        return view('admin_home');
    });
    Route::resource('gallery', 'GalleryController');
    Route::resource('article', 'ArticleController');
});

Route::auth();
