import React from 'react';
import axios from 'axios';

import { Video } from '@/types';
import VideoCard from '@/components/VideoCard';
import NoResults from '@/components/NoResults';
import { IndexProps } from '@/types';
import { BASE_URL } from '@/utils';

const Home = ({ videos }: IndexProps) => {

  return (
    <div className="flex flex-col h-full gap-10 videos">
      {videos.length ? (
        videos.map((video:Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No videos'}/>
      )}
    </div>
  );
};


export const getServerSideProps = async ({ query: {topic} } : { query: {topic: string} }) => {

  let response = null;
  
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  } else {
    response = await axios.get(`${BASE_URL}/api/post`);
  }

  return {
    props: {
      videos: response.data
    },
  };
}

export default Home;