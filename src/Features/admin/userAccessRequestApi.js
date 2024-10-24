import { apiSlice } from "../Api/apiSlice";

export const userAccessRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/admin/users",
    }),
  }),
});
export const { useGetUsersQuery } = userAccessRequestApi;
