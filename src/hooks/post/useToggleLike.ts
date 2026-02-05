import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePostApi } from "@/services/postApi";
import { deletePostApi } from "@/services/postApi";
interface ToggleLikeVariables {
  postId: string;
  isLiked: boolean;
}

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, isLiked }: ToggleLikeVariables) => {
      if (isLiked) {
        return deletePostApi(postId);
      }

      return likePostApi(postId);
    },

    onMutate: async ({ postId, isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["newsfeed"] });

      const previousData = queryClient.getQueryData<any>(["newsfeed"]);

      queryClient.setQueryData(["newsfeed"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => {
            if (!page?.data?.posts) return page;

            return {
              ...page,
              data: {
                ...page.data,
                posts: page.data.posts.map((post: any) => {
                  if (post._id !== postId) return post;

                  return {
                    ...post,
                    isLiked: !isLiked,
                    likes: isLiked ? post.likes - 1 : post.likes + 1,
                  };
                }),
              },
            };
          }),
        };
      });

      return { previousData };
    },

    // Nếu API lỗi thì rollback về data cũ
    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["newsfeed"], context.previousData);
      }
    },
  });
};
