import {useMutation, useQueryClient} from "@tanstack/react-query"
import {createOrder} from "@/api/orders"
import {showNotification} from "@/components/Notification/Notification"

export const useCreateOrder = ({onSuccess} = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data) => {
      const res = await createOrder(data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ["cart"]})
      onSuccess?.(data)
    },
    onError: (err) => {
      const detail = err?.response?.data?.detail || "Ошибка при оформлении заказа"
      showNotification({title: "Ошибка", message: detail, type: "error"})
    }
  })
}