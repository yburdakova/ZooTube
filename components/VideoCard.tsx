import React, {useState, useEffect, useRef} from 'react';
import { VideoCardProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';


const VideoCard = ({post}:VideoCardProps) => {

    const [isHover, setIsHover] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const onVideoPress = () => {
        if (isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play();
            setIsPlaying(true);
        }
    };
    
    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isMuted;
        }
        }, [isMuted]);

    return (
        <div className='flex flex-col pb-6 border-b-2 border-gray-200'>
            <div>
                <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer">
                    <div className="w-10 h-10 md:w-16 md:h-16">
                        <Link href={`/profile/${post.postedBy._id}`}>
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
                    <Link href={`/profile/${post.postedBy._id}`}>
                        <div className="flex items-center gap-2">
                            <p className="flex items-center gap-2 font-bold md:text-md text-primary">
                                {post.postedBy.userName} {` `}
                                <GoVerified className="text-blue-400 text-md"/>
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="relative flex gap-4 lg:ml-20">
                <div 
                    className="rounded-3xl"
                    onMouseEnter={()=> setIsHover(true)}
                    onMouseLeave={()=> setIsHover(false)}
                >
                    <Link href={`/detail/${post._id}`}>
                        <video
                            preload="metadata"
                            loop
                            ref={videoRef}
                            src={post.video.asset.url}
                            className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] bg-gray-100 rounded-2xl cursor-pointer"
                        >

                        </video>
                    </Link>
                    {isHover && (
                        <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
                            {isPlaying 
                            ? (
                                <button>
                                    <BsFillPauseFill 
                                        onClick={onVideoPress}
                                        className='text-2xl text-black lg:text-4xl'
                                    />
                                </button>) 
                            : (
                                <button>
                                    <BsFillPlayFill 
                                        onClick={onVideoPress}
                                        className='text-2xl text-black lg:text-4xl'
                                    />
                                </button>
                                )
                            }
                            {isMuted 
                            ? (
                                <button>
                                    <HiVolumeOff 
                                        onClick={()=> setIsMuted(false)}
                                        className='text-2xl text-black lg:text-4xl'
                                    />
                                </button>) 
                            : (
                                <button>
                                    <HiVolumeUp 
                                        onClick={()=> setIsMuted(true)}
                                        className='text-2xl text-black lg:text-4xl'
                                    />
                                </button>
                                )
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCard;