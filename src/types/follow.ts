export interface FollowingUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
  bio?: string;
  isFollowing: boolean;
}

export interface FollowingResponse {
  following: FollowingUser[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalFollowing: number;
    hasMore: boolean;
  };
}
