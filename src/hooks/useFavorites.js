import {useQuery} from "@tanstack/react-query";
import {getFavorites} from "@/api/favorite";
import {useAuth} from "@/context/AuthContext";

export const useFavorites = () => {
  const {isAuth, loadingUser} = useAuth();

  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    enabled: isAuth && !loadingUser,
    staleTime: 0,
    retry: false
  });
};