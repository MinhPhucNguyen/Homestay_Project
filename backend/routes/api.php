<?php

use App\Http\Controllers\Api\V1\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\Auth\SocialAuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function() {
    Route::post('/auth/login', 'login')->name('login');
    Route::post('/auth/register', 'register')->name('register');
});
Route::get('/authorize/{provider}/redirect', [SocialAuthController::class, 'redirectToProvider']);
Route::get('/authorize/{provider}/callback', [SocialAuthController::class, 'handleProviderCallback']);
