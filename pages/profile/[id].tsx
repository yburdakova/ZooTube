import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';

import { ProfileProps, Video } from '@/types';
import { BASE_URL } from '@/utils';

const Profile = ({data}: ProfileProps) => {
    const {user, userVideos, userLikes} = data;
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videoList, setVideoList] = useState<Video[]>([]);

    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect(() => {
        if (showUserVideos) {
            setVideoList(userVideos);
        } else {
            setVideoList(userLikes);
        }
    }, [showUserVideos, userLikes, userVideos]);
    
    return (
        <div>
            <div className="w-full">
                <div className="flex w-full gap-4 mb-4 bg-white ">
                    <div className="w-16 h-16 md:w-32 md:h-32">
                        <Image 
                            src={user.image} 
                            width={120} 
                            height={120} 
                            className='rounded-full' 
                            alt='user profile'/>
                    </div>
                    <div className='flex'>
                        <p className="flex items-center justify-center gap-1 font-bold tracking-wide lowercase text-primary md:text-2xl">
                            {user.userName.replaceAll(' ', '')}
                            <GoVerified className='ml-2 text-blue-400'/>
                        </p>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex w-full gap-10 mt-10 mb-10 border-b-2 border-gray-200 bg-whitr">
                    <p className={`mt-2 text-xl font-semibold cursor-pointer ${videos}`} onClick={()=>setShowUserVideos(true)}>
                        Videos
                    </p>
                    <p className={`mt-2 text-xl font-semibold cursor-pointer ${liked}`} onClick={()=>setShowUserVideos(false)}>
                        Liked
                    </p>
                </div>
                <div className="flex flex-wrap gap-6 md:justify-start">
                    {videoList.length > 0
                    ? (videoList.map((post:Video, index:number) => (
                        <VideoCard key={index} post={post} />
                    )))
                    : <NoResults text={`No ${showUserVideos ? '' : ' Liked'} Videos Yet`}/>
                    }
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

    return {
        props: { data: res.data },
    };
};

export default Profile;