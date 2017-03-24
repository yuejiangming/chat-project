<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    function login(Request $request) {
        $credentials = array();
        $credentials['name'] = $request->input('name');
        $credentials['password'] = $request->input('password');

        $name = $credentials['name'];

        if ($token = JWTAuth::attempt($credentials)) {
            return response()->json(compact('token', 'name'));
        } else {
            return response()->json(['error' => 'message_not_valid']);
        }
    }

    function register(Request $request) {
        $name = $request->input('name');
        $password = $request->input('password');
        $email = $request->input('email');

        $user = new User();
        $user->name = $name;
        $user->password = bcrypt($password);
        $user->email = $email;
        $user->save();

        return 'success';
    }
}
