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

export const getServerSideProps = async () => {
  const {data} = await axios.get(`${BASE_URL}/api/post`);

  return {
    props: {
      videos: data
    },
  };
}

export default Home;