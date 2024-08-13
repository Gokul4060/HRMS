
import { apiSlice } from "../apiSlice";

const PROJECT_URL = "/project";
export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECT_URL}/create`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    getProjects: builder.query({
      query: () => `${PROJECT_URL}/project`,
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECT_URL}/${id}`, // Ensure correct URL format
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});



export const { useCreateProjectMutation, useGetProjectsQuery, useDeleteProjectMutation} = projectApiSlice;
