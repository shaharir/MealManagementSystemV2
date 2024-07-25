import { apiService } from "../../apiService";

export const borderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: () => {
        return {
          url: "summary",
          method: "GET",
        };
      },
    }),
    // // start create data =================
    // createBorder: builder.mutation({
    //   query: ({ postBody }) => ({
    //     url: "border",
    //     method: "POST",
    //     body: postBody,
    //   }),
    //   onQueryStarted(_arg, { dispatch, queryFulfilled }) {
    //     queryFulfilled
    //       .then(({ data }) => {
    //         dispatch(
    //           apiService.util.updateQueryData(
    //             "getBorder",
    //             undefined,
    //             (draft) => {
    //               draft.unshift(data?.data?.border);
    //             }
    //           )
    //         );
    //       })
    //       .catch(({ error }) => {
    //         console.log(error);
    //       });
    //   },
    // }),
    // //end create data =================
    // // start delete data =================

    // deleteborder: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `border/${id}`,
    //     method: "DELETE",
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
    //               return (draft = draft.filter((item) => item._id !== id));
    //             }
    //           )
    //         );
    //       })
    //       .catch(({ error }) => {
    //         console.log(error);
    //       });
    //   },
    // }),
    // // end delete data =================
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
  useGetSummaryQuery,
  //   useCreateBorderMutation,
  //   useDeleteborderMutation,
  //   useEditborderMutation,
  //   useSingleBorderQuery,
} = borderService;
