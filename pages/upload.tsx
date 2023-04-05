import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '@/store/authStore';
import { client } from '@/utils/client'
import { topics } from '@/utils/constants';
import { BASE_URL } from '@/utils';

const Upload = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [videoAsset, setVideoAsset] = useState < SanityAssetDocument | undefined > ();
    const [wrongFileType, setWrongFileType] = useState(false);
    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState(topics[0].name);
    const [savingPost, setSavingPost] = useState(false);

    const router = useRouter();

    const { userProfile }: { userProfile : any } = useAuthStore();

    const uploadVideo = async (e:any) => {
        const selectedFile = e.target.files[0];
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
        if (fileTypes.includes(selectedFile.type)) {
            client.assets.upload('file', selectedFile, {
                contentType:selectedFile.type,
                filename: selectedFile.name
            }).then((data) => {
                setVideoAsset(data);
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    }

    const handlePost = async() => {
        if (caption && videoAsset?._id && category) {
            setSavingPost(true);

            const document = {
                _type: 'post',
                caption,
                video: {
                    type: 'file',
                    asset: {
                        _type: 'reference',
                        _ref: videoAsset?._id
                    }
                },
                userId: userProfile?._id,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userProfile?._id
                },
                topic: category
            }

            await axios.post(`${BASE_URL}/api/post`, document);
            router.push('/');
        }
    }

    return (
        <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center'>
            <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-between w-[50%] items-center p-14 pt-6">
                <div>
                    <div>
                        <p className="text-xl font-bold">Upload Video</p>
                        <p className="mt-1 text-md text-grau-400">Post a video to your account</p>
                    </div>
                    <div className="border-dashed rounded-xl border-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                        {isLoading
                        ? (<p>
                                Uploading...
                            </p>)
                        : (
                            <div>
                                {videoAsset
                                ? (<div>
                                    <video
                                        src={videoAsset.url}
                                        loop
                                        controls
                                        className='rounded-xl h-[450px] mt-16 bg-black'
                                    >
                                    </video>
                                </div>)
                                :(<label className='cursor-pointer'>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-xl font-bold">
                                                <FaCloudUploadAlt className='text-6xl text-gray-300'/>
                                            </p>
                                            <p className='font-semibold text-gray-300'>Upload Video</p>
                                        </div>
                                        <p className="mt-10 text-sm leading-10 text-center text-gray-400 ">MP4 or WebM or ogg <br /> 720-1280 or higher <br /> Up to 10 minutes <br /> Less then 2GB</p>
                                        <p className=" bg-[#F51997] text-center mt-10 rounded text-white font-medium p-2 w-52 outline-none">Select File</p>
                                    </div>
                                    <input type="file" 
                                            name='upload-video'
                                            className='w-0 h-0'
                                            onChange={uploadVideo}/>
                                </label>)}
                                {wrongFileType && (
                                    <p className='text-center text-xl text-red-400 font-semibold mt-4 w-[260px]'>
                                    Select the correct file type
                                    </p>
                                )}
                            </div>
                        )
                        }
                    </div>
                </div>
                <div className="flex flex-col gap-3 pb-10">
                    <label className='mt-10 font-medium'>Caption</label>
                    <input type="text" value={caption} onChange={(e)=> setCaption(e.target.value)} className='p-2 border-2 border-gray-200 rounded outline-none'/>
                    <label className='font-medium'>Choose a Category</label>
                    <select 
                        onChange={(e)=> setCategory(e.target.value)}
                        className='p-2 capitalize border-2 border-gray-200 rounded outline-none cursor-pointer'
                    
                    >
                        {topics.map((topic) => (
                            <option key={topic.name} value={topic.name} className='p-2 text-gray-700 capitalize bg-white outline-none hover:bg-slate-300'>
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-6 mt-10">
                        <button className="p-2 font-medium border-2 border-gray-300 rounded outline-none w-28 lg:w-44" type='button' onClick={()=> {}}>
                            Discard
                        </button>
                        <button className="bg-[#F51997] text-white font-medium p-2 rounded w-28 lg:w-44 outline-none" type='button' onClick={handlePost}>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;