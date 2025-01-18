import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const UseFavourites = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: userFavorites = [], isPending: favoritesLoading, refetch: refetchFavorites } = useQuery({
        queryKey: ['favorites', user?.email],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/favorites/${user?.email}`);
                return res.data;
            }
            return [];
        }
    })

    return [userFavorites, favoritesLoading, refetchFavorites]
};

export default UseFavourites;