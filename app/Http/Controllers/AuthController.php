<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Profile;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    function login(Request $request) {
        $credentials = array();
        $credentials['name'] = $request->input('name');
        $credentials['password'] = $request->input('password');


        if ($token = JWTAuth::attempt($credentials)) {
            $nickname = User::where('name', $credentials['name'])->first()->nickname;

            return response()->json(compact('token', 'nickname'));
        } else {
            return response()->json(['error' => 'message_not_valid']);
        }
    }

    function register(Request $request) {
        $name = $request->input('name');
        $password = $request->input('password');
        $email = $request->input('email');
        $nickname = $request->input('nickname');

        if (User::where('name')->first()) {
            return response()->json(['error' => 'dublicated_user_name']);
        }

        $user = new User();
        $user->name = $name;
        $user->password = bcrypt($password);
        $user->email = $email;
        $user->nickname = $nickname;
        $user->save();

        $profile = new Profile();
        $profile->adress = '';
        $profile->telnumber = '';
        $profile->personal_comment = '';

        $user->profile()->save($profile);

        return 'success';
    }

    function verifyAccount() {
        // this will set the token on the object
        JWTAuth::parseToken();

        // and you can continue to chain methods
        $user = JWTAuth::parseToken()->authenticate();

        return response()->json($user->nickname);
    }

    function test() {
        // $profile = new Profile();
        // $profile->telnumber = 'ha-ha';
        // $profile->adress = 'ha-ha';
        // $profile->personal_comment = 'ha-ha';

        // return User::find(2)->profile()->save($profile);

        return User::find(2)->profile()->get();
    }
}
