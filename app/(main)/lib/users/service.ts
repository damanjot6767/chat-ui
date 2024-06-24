import { GetUserResposeModel } from "@/app/(main)/lib/users/user-model";
import api from "@/app/axios";
import { ErrorResponse } from "@/app/lib/error-response-model";
import { SuccessResponse } from "@/app/lib/response-model";
import { Toaster } from "@/app/lib/toast";
import { deleteCookie, setCookie } from "cookies-next";

export const getAllUsers = async ( setState:Function, setLoading: Function ) => {
    try {

        const {data} = await api.get<SuccessResponse<GetUserResposeModel[]>>('/user/get-all-users');
        setState(data.data)
        
    } catch (err) {

        const error = err as ErrorResponse;
        if(error.status===401){
            deleteCookie('accessToken')
        }

        Toaster('error',error?.data?.message || error.message);
    }
};

export const getUserById = async (setState: Function ,userId = null) => {
    try {

        const {data} = await api.get<SuccessResponse<GetUserResposeModel[]>>(`/user/${userId}`);
        
        setState(data.data)
        setCookie('user', data.data)
        
    } catch (err) {

        const error = err as ErrorResponse;
        if(error.status===401){
            deleteCookie('accessToken')
        }

        Toaster('error',error?.data?.message || error.message);
    }
};