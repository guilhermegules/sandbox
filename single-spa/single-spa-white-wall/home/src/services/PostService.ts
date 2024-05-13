import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { fetcher } from "../config/fetcher";
import { PostResponse } from "../types/Post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const useListPosts = () => {
  const { data, error, isLoading } = useSWR<PostResponse[]>(
    `${BASE_URL}/posts`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useCreatePost = () => {
  const { data, isMutating, error, trigger } = useSWRMutation<
    unknown,
    unknown,
    string,
    PostResponse
  >(`${BASE_URL}/post`, async (url, { arg }) => {
    const response = fetcher(url, {
      body: JSON.stringify(arg),
      method: "POST",
    });
    return response;
  });

  return {
    data,
    error,
    trigger,
    isLoading: isMutating,
  };
};
