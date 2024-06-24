import { GetUserResposeModel } from "@/app/(main)/lib/users/user-model";
import api from "@/app/axios";
import { firebaseAuth, signInWithPhoneNumber } from "@/app/firebase/firebase";
import { Routes } from "@/app/lib/constant";
import { ErrorResponse } from "@/app/lib/error-response-model";
import { SuccessResponse } from "@/app/lib/response-model";
import { Toaster } from "@/app/lib/toast";
import { deleteCookie, setCookie } from "cookies-next";
import { RecaptchaVerifier } from "firebase/auth";

export const userAuth = async <Payload>(
    payload: Payload,
    setState: Function,
    setLoading: Function,
    navigate: Function,
) => {
    try {
        setLoading(true)
        const {data} = await api.post<SuccessResponse<GetUserResposeModel>>('/user/login',payload);

        setCookie('user', data.data)
        setCookie('accessToken', data.data.accessToken)

        setState(data.data)
        Toaster('success', data.statusCode);

        await navigate(Routes.Users)
        setLoading(false)

    } catch (err) {
        
         setLoading(false)
         const error = err as ErrorResponse;

         Toaster('error',error?.data?.message || error.message);
    }
};

export const userRegister = async <Payload>(
    payload: Payload,
    setState: Function,
    setLoading: Function,
    navigate: Function,
) => {
    try {

        setLoading(true)
        const {data} = await api.post<SuccessResponse<GetUserResposeModel>>('/user/register',payload);

        setCookie('accessToken', data.data?.accessToken)
        setCookie('user', data.data)

        setState(data.data)
        Toaster('success', data.statusCode);

        await navigate(Routes.Users)
        setLoading(false)

    } catch (err) {
        setLoading(false)
        const error = err as ErrorResponse;

         Toaster('error',error?.data?.message || error.message);
    }
};

export const verifyEmail = async(
    setLoading: Function
) => {
    try {

        setLoading(true)
        const {data} = await api.get<SuccessResponse<null>>('/user/verify-email');
        
        Toaster('success', data.message);
        setLoading(false)

    } catch (err) {
        setLoading(false)
        const error = err as ErrorResponse;

         Toaster('error',error?.data?.message || error.message);
    }
};

export const forgetPassword = async<Payload>(
    payload:Payload,
    setLoading: Function
) => {
    try {

        setLoading(true)
        const {data} = await api.post<SuccessResponse<GetUserResposeModel>>('/user/forget-password',payload);
        
        setCookie('forgetPassword',true)
        Toaster('success', data.message);
        setLoading(false)

    } catch (err) {
        setLoading(false)
        deleteCookie('forgetPassword')

        const error = err as ErrorResponse;
         Toaster('error',error?.data?.message || error.message);
    }
};

export const changePassword = async(
    payload: {new_password: string, token: string},
    setLoading: Function,
    navigate: Function
) => {
    try {

        setLoading(true)
        const {data} = await api.post<SuccessResponse<GetUserResposeModel>>(`/user/change-password?token=${payload?.token}`,payload);
        
        Toaster('success', data.message);
        setLoading(false)

        deleteCookie('forgetPassword')
        navigate(Routes.Login)

    } catch (err) {
        deleteCookie('forgetPassword')
        setLoading(false)

        const error = err as ErrorResponse;
         Toaster('error',error?.data?.message || error.message);
    }
};

// export const sendOtp = async() => {
//     try {
       
//         const recaptcha = new RecaptchaVerifier(firebaseAuth, 'recaptcha', {})
//         const confirmationResult = await signInWithPhoneNumber(firebaseAuth, "+917888730431", recaptcha);
//         // OTP sent successfully
//         const verificationCode: any = prompt('Enter OTP');
//         const result = await confirmationResult.confirm(verificationCode);
//         // OTP verification successful
//         console.log(result);
//       } catch (error: any) {
//         // Handle errors
//         console.log(error);
//       }      
// };