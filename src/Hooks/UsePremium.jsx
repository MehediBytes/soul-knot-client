import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePremium = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isPremium, isPending: isPremiumLoading, refetch: premiumRefetch } = useQuery({
        queryKey: [user?.email, 'premium'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.premium;
        }
    })
    return [isPremium, isPremiumLoading, premiumRefetch]
};

export default usePremium;