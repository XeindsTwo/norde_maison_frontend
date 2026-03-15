import {useQuery} from "@tanstack/react-query";
import {getOrderPreview} from "@/api/orders";

export const useOrderPreview = () => {
  return useQuery({
    queryKey: ["order-preview"],
    queryFn: async () => {
      const res = await getOrderPreview();
      return res.data;
    },
    retry: false,
    staleTime: 30 * 1000
  });
};