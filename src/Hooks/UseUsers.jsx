import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";


const UseUsers = () => {
    const axiosPublic = useAxiosPublic();

    const { data: users = [], isPending: usersLoading, refetch: usersRefetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    })

    return [users, usersLoading, usersRefetch]
};

export default UseUsers;