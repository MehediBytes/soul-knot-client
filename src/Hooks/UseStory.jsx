import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";


const UseStory = () => {
    const axiosPublic = useAxiosPublic();

    const { data: stories = [], isPending: storiesLoading, refetch: storiesRefetch } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/success-stories');
            return res.data;
        }
    })

    return [stories, storiesLoading, storiesRefetch]
};

export default UseStory;