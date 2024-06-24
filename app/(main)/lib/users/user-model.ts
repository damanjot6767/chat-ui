

export interface UserModel {
  _id: string;
  email: string;
  isEmailVerified: string;
  fullName: string;
  avatar?: string;
  coverImage?: string;
  isActive?: boolean;
  conversationId: string[];
  messageId: string[];
  accessToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUserResposeModel extends UserModel {}
