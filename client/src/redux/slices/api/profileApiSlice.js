import { apiSlice } from "../apiSlice";

const PROFILE_URL = "/profile";

export const infoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: `${PROFILE_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    fetchEmployee: builder.query({
      query: () => ({
        url: `${PROFILE_URL}/getAll`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateEmployee: builder.mutation({
      query: (updatedProfile) => ({
        url: `${PROFILE_URL}/update`,
        method: "PUT",
        body: updatedProfile,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateEmployeeMutation, useFetchEmployeeQuery, useUpdateEmployeeMutation} =
  infoApiSlice;
