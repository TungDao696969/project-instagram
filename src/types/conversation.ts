export interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
}

export interface LastMessage {
  _id: string;
  messageType: "text" | "image" | "file";
  content: string;
  createdAt: string;
  senderId: string;
  isRead: boolean;
}

export interface Conversation {
  _id: string;
  participants: User[];
  lastMessage?: LastMessage;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalConversations: number;
    hasMore: boolean;
  };
}

export interface Message {
  _id: string;
  senderId: {
    _id: string;
  };
  messageType: "text" | "image";
  content?: string;
  imageUrl?: string;
}