import { create } from "zustand";

export interface Conversation {
  _id: string;
  participants: {
    _id: string;
    username: string;
    fullName?: string;
    profilePicture?: string;
  }[];
}

interface ConversationState {
  activeConversation?: Conversation;
  setActiveConversation: (conv: Conversation) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  activeConversation: undefined,
  setActiveConversation: (conv) => set({ activeConversation: conv }),
}));
