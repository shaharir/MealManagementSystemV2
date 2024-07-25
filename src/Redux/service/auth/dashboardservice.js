import { apiService } from "../../apiService";

export const borderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => {
        return {
          url: "",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetDashboardQuery } = borderService;
