<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Profile;

class DataController extends Controller
{
    function getUserProfile(Request $request) {
        JWTAuth::parseToken();
        $user = JWTAuth::parseToken()->authenticate();
        $profile = $user->profile()->get();

        $credential = [
            'name' => $user->name,
            'password' => encrypt($user->password),
            'email' => $user->email,
            'nickname' => $user->nickname,
            'adress' => $profile[0]->adress,
            'telnumber' => $profile[0]->telnumber,
            'personal_comment' => $profile[0]->personal_comment
        ];

        return response()->json($credential);
    }
}
