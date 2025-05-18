<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\Feedback;

Route::get('/', function (Request $request, Response $response) {
    return response()->json([
        'Success'=> 'true'
    ], 200);
});




Route::post('/api/feedback', function (Request $request) {
    $validator = Validator::make($request->all(), [
        'name' => 'required|string',
        'email' => 'required|email',
        'message' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => $validator->errors()], 400);
    }

    try {
        Feedback::create($request->only(['name', 'email', 'message']));
        return response()->json(['message' => 'Feedback submitted successfully'], 201);
    } catch (Exception $e) {
        Log::error('Error saving feedback: ' . $e->getMessage());
        return response()->json(['error' => 'Server error. Please try again later.'], 500);
    }
});
