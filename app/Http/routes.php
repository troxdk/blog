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
Route::get('/article', 'HomeController@articles');
Route::get('/gallery', 'HomeController@gallery');
Route::get('/map', 'MapController@index');
Route::get('/map/positions/{latest?}', 'MapController@getPositions');
Route::get('/map/add', 'MapController@addPosition');

Route::group(['prefix' => 'admin', 'middleware' => 'auth'], function() {

    Route::resource('gallery', 'GalleryController');
    Route::resource('article', 'ArticleController');
});

Route::auth();
