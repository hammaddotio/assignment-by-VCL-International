<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/welcome', function (Request $request) {
    // Validate the request data (optional but recommended)
    $validated = $request->validate([
        'review' => 'required|string|max:255',
    ]);

    // Access the review data
    $review = $validated['review'];

    // Process the review (e.g., save to the database, log, etc.)

    return response()->json([
        'message' => 'Review received successfully!',
        'review' => $review,
    ]);
});

Route::get('/test', function (Request $request, Response $response) {
    return response()->json([
        'msg' => 'Server running successfully!',
    ]);
});