import React, {useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/image';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';

import { DetailsProps, Video } from '@/types';
import useAuthStore from '@/store/authStore';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';


const Detail = ({ postDetails }: DetailsProps) => {

    const [post, setPost] = useState(postDetails);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    const { userProfile }: any = useAuthStore();

    const onVideoClick = () => {
        if (isPlaying) {
            videoRef?.current?.pause();
            setIsPlaying(false);
        } else {
            videoRef?.current?.play();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (post && videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
        }, [post, isVideoMuted]);
    
    const handleLike = async (like: boolean) => {
        if (userProfile) {
            const res = await axios.put(``, {
            userId: userProfile._id,
            postId: post._id,
            like
            });
            setPost({ ...post, likes: res.data.likes });
        }
    };


    return (
        <div>
            DETAIL
        </div>
    )

    };
    
    export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
        const res = await axios.get(`http://localhost:3000/posts/${id}`);
        return {
            props: { postDetails: res.data },
        };
    };
    
    export default Detail;