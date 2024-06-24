import { UserModel } from "../users/user-model";
import { ChatType } from "./contant";


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
  createdAt: Date;
  updatedAt: Date
}

export interface GetConversationResposeModel extends ConversationModal {}
