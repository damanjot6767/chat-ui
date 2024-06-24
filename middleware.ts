import { NextResponse, NextRequest } from "next/server";
import { Routes } from "./app/lib/constant";

export function middleware(request: NextRequest) {

    const accessToken = request.cookies.get('accessToken');
    const user = request.cookies.get('user')?.value;

    const pathname = request.nextUrl.pathname;
    const loggedInUserNotAccessPaths =
        pathname === Routes.Login ||
        pathname === Routes.Signup ||
        pathname === Routes.ForgetPassword ||
        pathname === Routes.NewPassword


    if (
        accessToken
        && user
        && !JSON.parse(user)?.isEmailVerified
        && pathname !== Routes.VerifyEmail
    ) {
        return NextResponse.redirect(new URL(Routes.VerifyEmail, request.url))
    }

    else if (
        accessToken
        && user
        && JSON.parse(user)?.isEmailVerified
        && pathname === Routes.VerifyEmail
    ) {
        return NextResponse.redirect(new URL(Routes.Users, request.url))
    }

    else if (accessToken && loggedInUserNotAccessPaths) {
        return NextResponse.redirect(new URL(Routes.Users, request.url))
    }

    else if (!accessToken && !loggedInUserNotAccessPaths) {
        return NextResponse.redirect(new URL(Routes.Login, request.url))
    }

    else if (!accessToken && pathname === Routes.NewPassword) {
       
        if (pathname === Routes.NewPassword && !request.cookies.get('forgetPassword')) {
            return NextResponse.redirect(new URL(Routes.Login, request.url))
        }

    }
}

export const config = {
    matcher: [
        '/',
        '/signup',
        '/login',
        '/forgetPassword',
        '/newPassword',
        '/verifyEmail',
        '/users/:path*',
        '/conversations/:path*'
    ]
}