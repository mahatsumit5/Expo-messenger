// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { getToken } from "@/util";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.20.8:8080/api/v1/",
    prepareHeaders: async (headers) => {
      const token = await getToken("token");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
