import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createOrder} from "@/api/orders";
import {showNotification} from "@/components/Notification/Notification";

export const useCreateOrder = ({onSuccess} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (res) => {
      queryClient.invalidateQueries({queryKey: ["cart"]});
      queryClient.removeQueries({queryKey: ["order-preview"]});
      onSuccess?.(res.data);
    },
    onError: (err) => {
      const detail = err?.response?.data?.detail || "Ошибка при оформлении заказа";
      showNotification({
        title: "Ошибка",
        message: detail,
        type: "error"
      });
    }
  });
};