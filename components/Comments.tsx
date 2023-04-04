import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '@/store/authStore';
import NoResults from './NoResults';

const Comments = () => {

    const userProfile = useAuthStore();
    const comments = [];
    const isPostingComment = false;

    return (
        <div className='mt-6 px-10 pt-4 border-t-2 border-gray-200 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
            <div className="overflow-scroll lg:h-[440px]">
                {comments.length 
                ? (<div>videos</div>)
                : (<NoResults text='No comments yet'/>)}
            </div>
            {userProfile && (
                <div className="absolute bottom-0 left-0 px-2 pb-6 md:px-10 w-[100%]">
                    <form onSubmit={()=>{}} action="submit" className="flex gap-4 ">
                        <input 
                            type="text" 
                            className="mx-2 my-2 px-4 py-2 font-medium border bg-primary-2 w-[100%]  border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg" 
                            value=''
                            onChange={()=>{}}
                            placeholder='Add a comment...'
                        />
                        <button className='text-gray-400' onClick={()=>{}}>
                            {isPostingComment ? 'Commenting...' : 'Comment'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Comments;