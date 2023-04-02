import React, {useState, useEffect, useRef} from 'react';
import { VideoCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';


const VideoCard = ({post}:VideoCardProps) => {
    return (
        <div className='flex flex-col border-gray-200 border-b-2 pb-6'>
            <div className="">
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
                    <div className="md:w-16 md:h-16 w-10 h-10">
                        <Link href='/'>
                            <>
                            <Image
                                width={62}
                                height={62}
                                className='rounded-full'
                                src={post.postedBy.image}
                                alt="profile avatar"
                                
                            />
                            </>
                        </Link>
                    </div>
                    <Link href='/'>
                        <div className="flex items-center gap-2">
                            <p className=" flex gap-2 items-center md:text-md font-bold text-primary">
                                {post.postedBy.userName} {` `}
                                <GoVerified className="text-blue-400 text-md"/>
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="lg:ml-20 flex gap-4 relative">
                <div 
                    className="rounded-3xl"
                    onMouseEnter={()=> {}}
                    onMouseLeave={()=> {}}
                >
                    <Link href='/'>
                        <video
                            loop
                            src={post.video.asset.url}
                            className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] bg-gray-100 rounded-2xl cursor-pointer"
                        >

                        </video>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default VideoCard;