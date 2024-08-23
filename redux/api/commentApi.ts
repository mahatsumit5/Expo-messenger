import { emptySplitApi } from ".";

interface Response extends ServerResponse {
  comments: IComment[];
}

export const commentApi = emptySplitApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<Response, string>({
      query: (postId) => `comment/${postId}`,
    }),
  }),
});
