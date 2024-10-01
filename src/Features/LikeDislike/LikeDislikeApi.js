import { apiSlice } from "../Api/apiSlice";

export const likeDislikeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    likeVideo: builder.mutation({
      query: ({ email, _id }) => ({
        url: `/user/likeVideoApi/${_id}`,
        method: "PATCH",
        body: { email },
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.videoId },
        { type: "RelatedVideos", id: arg.videoId },
      ],
    }),
    disLikeVideo: builder.mutation({
      query: ({ email, _id }) => ({
        url: `/user/dislikeVideoApi/${_id}`,
        method: "PATCH",
        body: { email },
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.videoId },
        { type: "RelatedVideos", id: arg.videoId },
      ],
    }),
  }),
});
export const { useLikeVideoMutation, useDisLikeVideoMutation } = likeDislikeApi;
