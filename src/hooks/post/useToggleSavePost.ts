import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savePostApi, unsavePostApi } from "@/services/postApi";

export const useToggleSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      postId,
      isSaved,
    }: {
      postId: string;
      isSaved: boolean;
    }) => {
      return isSaved ? unsavePostApi(postId) : savePostApi(postId);
    },

    onSuccess: (_, { postId }) => {
      queryClient.setQueryData(["newsfeed"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              posts: page.data.posts.map((post: any) =>
                post._id === postId
                  ? { ...post, isSaved: !post.isSaved }
                  : post,
              ),
            },
          })),
        };
      });
    },
  });
};
