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
        $user = JWTAuth::parseToken()->authenticate();
        $profile = $user->profile()->get();

        $credential = [
            'name' => $user->name,
            'email' => $user->email,
            'nickname' => $user->nickname,
            'adress' => $profile[0]->adress,
            'telnumber' => $profile[0]->telnumber,
            'personal_comment' => $profile[0]->personal_comment
        ];
        return response()->json($credential);
    }

    function changeProfile(Request $request) {
        $name = $request->input('name');
        $email = $request->input('email');
        $nickName = $request->input('nickName');
        $adress = $request->input('adress');
        $telNumber = $request->input('telNumber');
        $selfComment = $request->input('selfComment');

        $user = JWTAuth::parseToken()->authenticate();

        $user->name = $name;
        $user->email = $email;
        $user->nickname = $nickName;
        $user->save();

        $profile = $user->profile()->get()[0];
        $profile->adress = $adress;
        $profile->telnumber = $telNumber;
        $profile->personal_comment = $selfComment;
        $profile->save();

        return response()->json(['success' => '200']);
    }
}
