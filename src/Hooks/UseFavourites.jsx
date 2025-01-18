import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseFavourites = () => {
    const axiosSecure = useAxiosSecure();

    const { data: favorites = [], isPending: loading, refetch } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => {
            const res = await axiosSecure.get('/favorites');
            return res.data;
        }
    })

    return [favorites, loading, refetch]
};

export default UseFavourites;