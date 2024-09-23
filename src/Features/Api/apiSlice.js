import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  tagTypes: ["Videos", "Video", "RelatedVideos"],
  endpoints: (builder) => ({}),
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:9000",
//   }),
//   // tag whitelisting
//   tagTypes: ["Videos", "Video", "RelatedVideos"],
//   endpoints: (builder) => ({
//     getVideos: builder.query({
//       query: () => "/videos",
//       keepUnusedDataFor: 600,
//       providesTags: ["Videos"],
//     }),
//     getVideo: builder.query({
//       query: (videoId) => `/videos/${videoId}`,
//       providesTags: (result, error, arg) => [{ type: "Video", id: arg }],
//     }),
//     getRelatedVideos: builder.query({
//       query: ({ id, title }) => {
//         const tags = title.split(" ");
//         const likes = tags.map((tag) => `title_like=${tag}`);
//         const queryString = `/videos?${likes.join("&")}&_limit=4`;
//         return queryString;
//       },
//       providesTags: (result, error, arg) => [
//         { type: "RelatedVideos", id: arg.id },
//       ],
//     }),
//     addVideo: builder.mutation({
//       query: (data) => ({
//         url: "/videos",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Videos"],
//     }),
//     editVideo: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `/videos/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//       invalidatesTags: (result, error, arg) => [
//         "Videos",
//         { type: "Video", id: arg.id },
//         { type: "RelatedVideos", id: arg.id },
//       ],
//     }),
//     deleteVideo: builder.mutation({
//       query: (id) => ({
//         url: `/videos/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Videos"],
//     }),
//   }),
// });

// export const {
//   useGetVideosQuery,
//   useGetVideoQuery,
//   useGetRelatedVideosQuery,
//   useAddVideoMutation,
//   useEditVideoMutation,
//   useDeleteVideoMutation,
// } = apiSlice;
