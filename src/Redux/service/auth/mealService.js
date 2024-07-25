import { apiService } from "../../apiService";

export const borderService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMeal: builder.query({
      query: () => {
        return {
          url: "meal",
          method: "GET",
        };
      },
    }),
    // start create data =================
    createMeal: builder.mutation({
      query: ({ postBody }) => ({
        url: "meal",
        method: "POST",
        body: postBody,
      }),
    }),
    //end create data =================
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
  useGetMealQuery,
  useCreateMealMutation,
  //   useDeleteborderMutation,
  //   useEditborderMutation,
  //   useSingleBorderQuery,
} = borderService;
