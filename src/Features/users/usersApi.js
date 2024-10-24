import { apiSlice } from "../Api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendRequest: builder.mutation({
      query: (email) => ({
        url: "/user/userRequestSend",
        method: "PATCH",
        body: email,
      }),
    }),
  }),
});
export const { useSendRequestMutation } = usersApi;
