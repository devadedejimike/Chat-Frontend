export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Message {
  _id: string;
  text: string;
  sender: User;
  attachments?: string[];
  createdAt: string;
}

export interface Chat {
  _id: string;
  chatName: string;
  users: User[];
  isGroupChat: boolean;
  latestMessage?: Message;
}
