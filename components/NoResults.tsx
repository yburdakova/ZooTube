import React from 'react';
import { NoResultsProps } from '@/types';

const NoResults = ({text}:NoResultsProps) => {
    return (
        <div>
            {text}
        </div>
    );
};

export default NoResults;