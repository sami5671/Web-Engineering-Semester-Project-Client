import { apiSlice } from "../Api/apiSlice";

export const userAccessRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["usersAccessRequest"],
    }),
    giveAccessUser: builder.mutation({
      query: (userId) => ({
        url: "/admin/giveAccessUsers",
        method: "PATCH",
        body: userId,
      }),
      invalidatesTags: ["usersAccessRequest"],
    }),
  }),
});
export const { useGetUsersQuery, useGiveAccessUserMutation } =
  userAccessRequestApi;
