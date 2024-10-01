import { apiSlice } from "../Api/apiSlice";

export const videoControlApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos/addVideo",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Videos"],
    }),
    editVideo: builder.mutation({
      query: ({ videoId, data }) => ({
        url: `/videos/editVideo/${videoId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "Videos",
        { type: "Video", id: arg.videoId },
        { type: "RelatedVideos", id: arg.videoId },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/deleteVideo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Videos"],
    }),
  }),
});
export const {
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videoControlApi;
