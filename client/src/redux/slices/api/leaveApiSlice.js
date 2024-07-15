import { apiSlice } from "../apiSlice";

const LEAVE_URL = "/leave";

export const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLeave: builder.mutation({
      query: (leaveData) => ({
        url: `${LEAVE_URL}/create-leave`,
        method: "POST",
        body: leaveData,
        credentials: "include",
      }),
    }),
    getLeaves: builder.query({
      query: () => ({
        url: `${LEAVE_URL}/get-leave`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateLeave: builder.mutation({
      query: ({ id, ...leaveData }) => ({
        url: `${LEAVE_URL}/update-leave/${id}`,
        method: "PUT",
        body: leaveData,
        credentials: "include",
      }),
    }),
    approveLeave: builder.mutation({
      query: (id) => ({
        url: `${LEAVE_URL}/approve/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    rejectLeave: builder.mutation({
      query: (id) => ({
        url: `${LEAVE_URL}/reject/${id}`,
        method: "PUT",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateLeaveMutation,
  useGetLeavesQuery,
  useUpdateLeaveMutation,
  useApproveLeaveMutation,
  useRejectLeaveMutation,
} = leaveApiSlice;
