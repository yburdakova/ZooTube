import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '@/store/authStore';
import NoResults from './NoResults';
import { CommentsProps, IUser } from '@/types';

const Comments = ({comment, comments, isPostingComment, setComment, addComment}: CommentsProps) => {

    const {userProfile, allUsers} = useAuthStore();

    return (
        <div className='mt-6 px-10 pt-4 border-t-2 border-gray-200 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
            <div className="overflow-scroll lg:h-[440px]">
                {comments?.length 
                ? (comments.map((item, index) => (
                    <>
                    {allUsers.map((user: IUser) => (
                        user._id === (item.postedBy._id || item.postedBy._ref) && (
                            <div className="items-center p-2" key={index}>
                                <Link href={`/profile/${user._id}`} >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 ">
                                            <Image 
                                                src={user.image} 
                                                width={34} 
                                                height={34} 
                                                className='rounded-full' 
                                                alt='user profile'/>
                                        </div>
                                        <div className="hidden xl:block">
                                            <p className="flex items-center font-bold lowercase text-primary">
                                                {user.userName.replaceAll(' ', '')}
                                                <GoVerified className='ml-2 text-blue-400'/>
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="ml-10 ">
                                    <p className="">{item.comment}</p>
                                </div>
                            </div>
                        )
                    ))}
                    </>
                )))
                : (<NoResults text='No comments yet'/>)}
            </div>
            {userProfile && (
                <div className="absolute bottom-0 left-0 px-2 pb-6 md:px-10 w-[100%]">
                    <form onSubmit={addComment} action="submit" className="flex gap-4 ">
                        <input 
                            type="text" 
                            className="mx-2 my-2 px-4 py-2 font-medium border bg-primary-2 w-[100%]  border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg" 
                            value={comment}
                            onChange={(e)=> setComment(e.target.value)}
                            placeholder='Add a comment...'
                        />
                        <button className='text-gray-400' onClick={addComment}>
                            {isPostingComment ? 'Commenting...' : 'Comment'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Comments;