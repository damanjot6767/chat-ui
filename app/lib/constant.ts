export const Routes = {
        Signup: '/signup',
        Login: '/login',
        ForgetPassword: '/forgetPassword',
        NewPassword: '/newPassword',
        VerifyEmail: '/verifyEmail',
        Users: '/users',
        Conversations: '/conversations'
}

export const AvailableRoutes = Object.values(Routes);


export enum ChatEventEnum {
        CONNECTED_EVENT= "connected",
        DISCONNECT_EVENT= "disconnect",
        JOIN_CHAT_EVENT= "joinChat",
        LEAVE_CHAT_EVENT= "leaveChat",// FOR GROUP
        UPDATE_GROUP_NAME_EVENT= "updateGroupName",// FOR GROUP
        MESSAGE_RECEIVED_EVENT= "messageReceived",
        NEW_CHAT_EVENT= "newChat",
        SOCKET_ERROR_EVENT= "socketError",
        STOP_TYPING_EVENT= "stopTyping",
        TYPING_EVENT= "typing"
      } 