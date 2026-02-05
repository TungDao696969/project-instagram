export interface UserSearch {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  website?: string;
}

export interface SearchedUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string | null;
}

export interface SearchHistoryItem {
  _id: string;
  searchQuery: string;
  searchedUserId: SearchedUser;
  createdAt: string;
}
