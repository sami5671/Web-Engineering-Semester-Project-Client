import { apiSlice } from "../Api/apiSlice";

export const saveVideoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveUserVideo: builder.mutation({
      query: ({ _id, email }) => ({
        url: `/user/postSaveVideo/${encodeURIComponent(_id)}`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["SavedUsersVideos"],
    }),
    getUserSaveVideo: builder.query({
      query: (email) => ({
        url: `/user/getSaveVideoUser/${email}`,
        method: "GET",
      }),
      providesTags: ["SavedUsersVideos"],
    }),
    deleteUserSaveVideo: builder.mutation({
      query: ({ _id, email }) => ({
        url: `/user/deleteUserSaveVideo/${_id}`,
        method: "DELETE",
        body: { email },
      }),
      invalidatesTags: ["SavedUsersVideos"],
    }),
  }),
});

export const {
  useSaveUserVideoMutation,
  useGetUserSaveVideoQuery,
  useDeleteUserSaveVideoMutation,
} = saveVideoApi;
