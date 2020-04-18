<?php

use Illuminate\Http\Request;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
/*
 * Routes for authenticate
 *
 */
Route::post('/login', 'AuthController@login');
Route::post('/user', 'AuthController@register');
Route::get('me', 'AuthController@me');
Route::post('/logout', 'AuthController@logout');
Route::get('/loggeduser', 'AuthController@loggedUser');

Route::get('user/{id}', 'AuthController@getUserById');
Route::put('/edituser', 'AuthController@editUser');
Route::put('/profilepicture', 'AuthController@updateProfilePic');

/*
 * Routes related with Poi's
 *
 */

Route::post('poi/create', 'PoiController@createPoi');
Route::post('location/create', 'PoiController@createLocation');
Route::get('locations/find', 'PoiController@getLocations');
Route::get('poi/{id}', 'PoiController@getPoiById');