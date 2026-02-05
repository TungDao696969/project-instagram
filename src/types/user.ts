import type { Post } from "./post";

export interface UserProfile {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  website?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing: boolean;
  createdAt: string;
}

export interface UserPostsResponse {
  posts: Post[];
  total: number;
}

// user gợi í
export interface SuggestedUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
  recentImages: string[];
}
