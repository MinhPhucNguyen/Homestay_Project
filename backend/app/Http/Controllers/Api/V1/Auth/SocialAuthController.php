<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;


class SocialAuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        $url =  Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'url' => $url
        ], 200);
    }

    public function handleProviderCallback($provider)
    {
        //stateless() có tác dụng để không lưu lại trạng thái của user sau khi đăng nhập xong
        $user = Socialite::driver($provider)->stateless()->user();
        if (!$user) {
            dd('Failed');
        }

        //Lấy ra user trong database nếu có email trùng với email của social trả về
        //Nếu không có thì tạo mới user trong database
        $appUser = User::where('email', $user->email)->first();

        if (!$appUser) {
            //Nếu không có người dùng thì tạo mới và thêm provider;
            $appUser
                = User::create([
                    'firstname' => isset($user->user['given_name']) ? $user->user['given_name'] : '',
                    'lastname' => isset($user->user['family_name']) ? $user->user['family_name'] : '',
                    'username' => $user->user['name'],
                    'email' =>  $user->user['email'],
                    'phone' => '',
                    'email_verified_at' => isset($user->user['email_verified']) ? now() : null,
                    'avatar' => 'default.jpg',
                    'password' => Str::random(8),
                    'confirm_password' => 'true',
                    'role_as' => 0,
                ]);

            $socialAccount = SocialAccount::create([
                'provider' => $provider,
                'provider_user_id' => $user->id,
                'user_id' => $appUser->id
            ]);
        } else {
            // Nếu có người dùng thì kiểm tra xem người dùng đã có tài khoản social nào chưa
            $socialAccount  = $appUser->socialAccouts()->where('provider', $provider)->first();

            //Nếu người dùng chưa có tài khoản social nào do đăng ký bằng form thì tạo mới
            if (!$socialAccount) {
                //tạo tài khoản social mới
                $socialAccount = SocialAccount::create([
                    'provider' => $provider,
                    'provider_user_id' => $user->id,
                    'user_id' => $appUser->id
                ]);
            }
        }

        return response()->json([
            'message' => 'Đăng nhập thành công.',
            'user' => $appUser,
            'token' => $appUser->createToken('API Token of ' . $appUser->username)->plainTextToken,
        ], 200);
    }
}
