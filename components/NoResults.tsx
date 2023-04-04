import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import { BiCommentX } from 'react-icons/bi';

import { NoResultsProps } from '@/types';

const NoResults = ({text}:NoResultsProps) => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <p className="text-6xl">
                {text === 'No comments yet' 
                ? <BiCommentX/> 
                : <MdOutlineVideocamOff />}
            </p>
            <p className="text-xl text-center">
                {text}
            </p>
        </div>
    );
};

export default NoResults;