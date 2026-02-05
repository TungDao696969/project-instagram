export interface Comment {
  _id: string;
  postId: string;

  userId: {
    _id: string;
    username: string;
    profilePicture?: string;
  };

  content: string;
  parentCommentId: string | null;

  likes: number;
  repliesCount: number;

  createdAt: string;
}
