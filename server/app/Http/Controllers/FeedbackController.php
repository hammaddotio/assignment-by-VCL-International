<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::orderBy('created_at', 'desc')->get();
        return response()->json($feedbacks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string'
        ]);

        $feedback = Feedback::create($validated);
        return response()->json($feedback, 201);
    }

    public function show(Feedback $feedback)
    {
        return response()->json($feedback);
    }

    public function update(Request $request, Feedback $feedback)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string'
        ]);

        $feedback->update($validated);
        return response()->json($feedback);
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return response()->json(null, 204);
    }
}
