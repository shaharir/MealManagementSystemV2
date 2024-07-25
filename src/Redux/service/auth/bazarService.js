import { apiService } from "../../apiService";

export const borderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getBazar: builder.query({
      query: () => {
        return {
          url: "market",
          method: "GET",
        };
      },
    }),
    // start create data =================
    createBazar: builder.mutation({
      query: ({ postBody }) => ({
        url: "market",
        method: "POST",
        body: postBody,
      }),
    }),
    //end create data =================
    // start delete data =================

    deleteBazar: builder.mutation({
      query: ({ id }) => ({
        url: `border/${id}`,
        method: "DELETE",
      }),
    }),
    // end delete data =================
    // // start update data =================
    // editborder: builder.mutation({
    //   query: ({ id, postBody }) => ({
    //     url: `border/${id}`,
    //     method: "PUT",
    //     body: postBody,
    //   }),
    //   onQueryStarted({ id }, { dispatch, queryFulfilled }) {
    //     queryFulfilled;
    //     queryFulfilled
    //       .then(({ data }) => {
    //         dispatch(
    //           apiService.util.updateQueryData(
    //             "getBorder",
    //             undefined,
    //             (draft) => {
    //               const findIndex = draft.findIndex((item) => item._id === id);
    //               draft[findIndex] = data?.data;
    //             }
    //           )
    //         );
    //       })
    //       .catch(({ error }) => {
    //         console.log(error);
    //       });
    //   },
    // }),
    // // end update data =================
    // singleBorder: builder.query({
    //   query: ({ id }) => {
    //     return {
    //       url: `border/${id}`,
    //       method: "GET",
    //     };
    //   },
    // }),
  }),
});

export const {
  useGetBazarQuery,
  useCreateBazarMutation,
  useDeleteBazarMutation,
  //   useEditborderMutation,
  //   useSingleBorderQuery,
} = borderService;
