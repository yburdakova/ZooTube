import React, {useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';

import { BASE_URL } from '@/utils';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import useAuthStore from '@/store/authStore';
import { IUser, Video } from '@/types';



const SearchResult = ({videos}: {videos: Video[]}) => {

    const [showVideos, setShowVideos] = useState(true);
    const router = useRouter();
    const { searchTerm }:any = router.query;

    const {allUsers} = useAuthStore();

    const videoList = showVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const accounts = !showVideos ? 'border-b-2 border-black' : 'text-gray-400';

    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <div className='w-full'>
            <div>
                <div className="flex w-full gap-10 mt-10 mb-10 border-b-2 border-gray-200 bg-whitr">
                    <p className={`mt-2 text-xl font-semibold cursor-pointer ${videoList}`} onClick={()=>setShowVideos(true)}>
                        <span>Videos</span><span className='ml-2'>{videos.length || 0}</span>
                    </p>
                    <p className={`mt-2 text-xl font-semibold cursor-pointer ${accounts}`} onClick={()=>setShowVideos(false)}>
                        <span>Accounts</span><span className='ml-2'>{searchedAccounts.length || 0}</span>
                    </p>
                </div>
                <div className="flex flex-wrap gap-6 " >
                    {showVideos
                    ? (<div className='flex flex-wrap gap-6 md:mt-6'>
                        {videos.length
                        ? (videos.map((video:Video, index ) => (
                            <VideoCard key={index} post={video} />)))
                        :   <NoResults text={`No Videos Found for "${searchTerm}"`}/>}
                    </div>)
                    : (<div className='md:mt-6 w-[100%] ' >
                            {searchedAccounts.length > 0
                            ? (searchedAccounts.map((user:IUser, index:number) => (
                                <Link key={index} href={`/profile/${user._id}`}>
                                    <div className='flex gap-3 p-6 font-semibold border-b-2 border-gray-200 rounded cursor-pointer'>
                                    <div>
                                        <Image width={50} height={50} className='rounded-full' alt='user-profile' src={user.image}/>
                                    </div>
                                    <div>
                                        <div>
                                        <p className="flex items-center gap-1 text-lg font-bold lowercase text-primary">
                                            {user.userName.replaceAll(' ', '')}
                                            <GoVerified className='ml-2 text-blue-400'/>
                                        </p>
                                        <p className='text-sm text-gray-400 capitalize'>
                                            {user.userName}
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                </Link>)))
                            :   <NoResults text={`No Accounts Found for "${searchTerm}"`}/>}
                        </div>)
                    }
                    
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string }}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

    return {
        props: { videos: res.data },
    };
};


export default SearchResult;