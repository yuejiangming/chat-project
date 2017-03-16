<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use Tymon\JWTAuth\MiddlewareGetUserFromToken;
use Auth;
use Session;
use Validator;
use App\Model\Invitation;
use Gregwar\Captcha\CaptchaBuilder;

class AuthController extends Controller
{
    function login(Request $request) {
        $user = User::first();

        return $token = JWTAuth::fromUser($user);
    }
}
