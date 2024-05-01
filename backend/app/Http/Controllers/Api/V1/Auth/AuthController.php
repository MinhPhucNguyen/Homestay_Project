<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'errors' => 'Email hoặc mật khẩu không chính xác.'
            ], 401);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => 'Email hoặc mật khẩu không chính xác.'
            ], 401);
        }

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user' => $user,
            'token' => $user->createToken('API Token of ' . $user->username)->plainTextToken,
        ], 200);
    }

    public function register(RegisterRequest $request){
        $validatedData = $request->validated();
        $user = User::create([
            'firstname' => $validatedData['firstname'],
            'lastname' => $validatedData['lastname'],
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'phone' => '+84' . substr($validatedData['phone'], 1),
            'password' => Hash::make(trim($validatedData['password'])),
            'confirm_password' => $validatedData['confirm_password'] == $validatedData['password'] ? 1 : 0,
        ]);

        return response()->json([
            'success' => 'Đăng ký thành công.',
            'user' => $user,
            'token' => $user->createToken('API Token of ' . $user->username)->plainTextToken,
        ], 200);
    }
}
