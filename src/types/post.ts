export interface User {
  _id: string;
  username: string;
  fullName: string;
  profilePicture?: string | null;
}

export interface Post {
  _id: string;

  userId: string | User;

  caption: string;
  image: string | null;
  video: string | null;
  mediaType: "image" | "video";

  likes: number;
  comments: number;

  likedBy: string[];
  savedBy: string[];

  isLiked: boolean;
  isSaved: boolean;

  createdAt: string;
}

export interface NewsfeedResponse {
  success: boolean;
  message: string;
  data: {
    posts: Post[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// post khám phá
export interface ExplorePost {
  _id: string;
  caption: string;
  image: string | null;
  video: string | null;
  mediaType: "image" | "video";
  likes: number;
  comments: number;
  engagementScore: number;
  createdAt: string;
  user: {
    _id: string;
    username: string;
    fullName: string;
    profilePicture: string;
  };
}

export interface ExplorePagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasMore: boolean;
}

export interface ExploreResponse {
  posts: ExplorePost[];
  hasMore: boolean;
  offset: number;
  limit: number;
  total: number;
}
