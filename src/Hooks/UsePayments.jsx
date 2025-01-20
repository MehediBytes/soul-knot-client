import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const UsePayments = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isPending: paymentsLoading, refetch: refetchPayments } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    })

    return [payments, paymentsLoading, refetchPayments]
};

export default UsePayments;