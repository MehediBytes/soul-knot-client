import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const UseUsers = () => {
    const axiosSecure= useAxiosSecure()

    const { data: users = [], isPending: usersLoading, refetch: usersRefetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    return [users, usersLoading, usersRefetch]
};

export default UseUsers;