import { UserModel } from "../users/user-model";
import { ChatType } from "./contant";
import { MesssageModal } from "./message-model";


export interface ConversationModal {
  _id: string;
  name: string;
  userIds: any[];
  users?: UserModel[];
  createdBy: UserModel;
  messageIds: any[];
  messages?: string[];
  latestMessage: string;
  chatType?: ChatType;
  isTyping:Boolean;
  isNewMessage:MesssageModal| null;
  isOnline:Boolean;
  createdAt: Date;
  updatedAt: Date
}

export interface GetConversationResposeModel extends ConversationModal {}
