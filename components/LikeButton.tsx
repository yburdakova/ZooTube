import React, {useState, useEffect} from 'react';
import { MdFavorite } from 'react-icons/md';

import useAuthStore from '@/store/authStore';

import { LikeProps } from '@/types';

const LikeButton = ({ likes, handleLike, handleDislike }: LikeProps) => {

    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const {userProfile}: any = useAuthStore();
    const filterLikes = likes?.filter((item:any) => item._ref === userProfile?._id);

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true);
        } else {
            setAlreadyLiked(false);
        }
    }, [filterLikes, likes]);
    
    return (
        <div className='flex gap-6'>
            <div className="flex flex-col items-center justify-center mt-4 cursor-pointer">
                {alreadyLiked
                ? (<div className='p-2 rounded-full bg-primary md:p-4 text-[#F51997]'>
                    <MdFavorite 
                        className='text-lg md:text-2xl'
                        onClick={handleDislike}/>
                    </div>)
                : (<div className='p-2 rounded-full bg-primary md:p-4'>
                    <MdFavorite 
                        className='text-lg md:text-2xl'
                        onClick={handleLike}/>
                </div>)}
                <p className="font-semibold">{likes?.length | 0}</p>
            </div>
        </div>
    );
};

export default LikeButton;