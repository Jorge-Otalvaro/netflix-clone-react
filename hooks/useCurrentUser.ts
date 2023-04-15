import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useCurrentUser = () => {

  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
  
  return {
    data,
    isLoading,
    mutate,
    error
  };
};

export default useCurrentUser;