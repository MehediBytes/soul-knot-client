import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";


const UseBiodata = () => {
    const axiosPublic = useAxiosPublic();

    const { data: biodata = [], isPending: loading, refetch } = useQuery({
        queryKey: ['biodata'],
        queryFn: async () => {
            const res = await axiosPublic.get('/biodata');
            return res.data;
        }
    })

    return [biodata, loading, refetch]
};

export default UseBiodata;