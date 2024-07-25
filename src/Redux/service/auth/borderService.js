import { apiService } from "../../apiService";

export const borderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getBorder: builder.query({
      query: () => {
        return {
          url: "member",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBorderQuery } = borderService;
