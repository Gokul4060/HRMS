import { apiSlice } from "../apiSlice";

const SHEET_URL = "/time";

export const timeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTime: builder.mutation({
      query: (data) => ({
        url: `${SHEET_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    fetchTime: builder.query({
      query: () => ({
        url: `${SHEET_URL}/getAll`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateTime: builder.mutation({
      query: (updatedProfile) => ({
        url: `${SHEET_URL}/update`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});






export const {
  useCreateTimeMutation,
  useFetchTimeQuery,
  useUpdateTimeMutation,
} = timeApiSlice;
