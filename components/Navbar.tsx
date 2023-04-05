import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import {AiOutlineLogout} from 'react-icons/ai';
import {BiSearch} from 'react-icons/bi';
import {IoMdAdd} from 'react-icons/io';


import Logo from '../utils/tiktik-logo1.png';
import SmallLogo from '../utils/tiktik-logo2.png';
import { createOrGetUser } from '@/utils';
import useAuthStore from '@/store/authStore';



const Navbar = () => {

    const [searchValue, setSearchValue] = useState('');

    const {userProfile, addUser, removeUser}:any = useAuthStore();
    const width = window.innerWidth;
    const router = useRouter();

    const handleSearch = (e: { preventDefault: () => void })=> {
        e.preventDefault();
        
        if (searchValue) {
            router.push(`/search/${searchValue}`)
        }
        
    };

    return (
        <div className='flex items-center justify-between w-full px-4 py-2 border-b-2 border-gray-200'>
            <Link href="/">
                <div className={width < 560 ? 'w-[40px] h-[40px]' : 'w-[200px] h-[60px]'}>
                    <Image 
                    className='cursor-pointer'
                    src={width < 560 ? SmallLogo : Logo}
                    alt="ZooTube logo"
                    priority
                    />
                </div>
            </Link>
            <div className="relative hidden md:block">
                <form className='absolute bg-white md:static top-10 left-20' onSubmit={handleSearch}>
                    <input 
                        type="text" 
                        className="p-3 font-medium border-2 border-gray-100 bg-primary focus:outline-none focus:border-2 focus:border-gray-300 w-[260px] lg:w-[350px] rounded-full md:top-0" 
                        value={searchValue} 
                        placeholder={width > 1023 ? 'Search an accounts and videos' : 'Search...'}
                        onChange={(e)=>setSearchValue(e.target.value)}/>
                        <button
                            onClick={handleSearch}
                            className='absolute pl-4 text-2xl text-gray-400 border-l-2 border-gray-300 md:right-5 right-6 top-4'>
                            <BiSearch/>
                        </button>
                </form>
            </div>
            <div className="">
                {userProfile 
                ? ( <div className='flex items-center justify-center gap-5 md:gap-10'>
                        <Link href='/upload'>
                            <button className='flex items-center justify-center gap-2 px-2 text-lg font-semibold border-2 rounded-full md:px-4'>
                                <IoMdAdd className='text-xl'/> {` `}
                                <span className="hidden md:block">Upload</span>
                            </button>
                        </Link>
                        {userProfile.image && (
                            <Link href='/'>
                                <>
                                <Image
                                    width={40}
                                    height={40}
                                    className='rounded-full cursor-pointer'
                                    src={userProfile.image}
                                    alt='Profile avatar'
                                />
                                </>
                            </Link>
                        )}
                        <button
                            type='button'
                            className='px-2'
                            onClick={() => 
                                {googleLogout();
                                removeUser()}
                            }
                        >
                            <AiOutlineLogout color='red' fontSize={30}/>
                        </button>
                    </div>) 
                : ( <GoogleLogin
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={()=>console.log(Error)}
                    />)
                }
            </div>
        </div>
    );
};

export default Navbar;