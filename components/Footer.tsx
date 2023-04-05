import React from 'react';
import { footerList } from '@/utils/constants';
import { FooterList } from '@/types';


const List = ({items, mt}: FooterList) => (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item) => (
        <p className="text-sm text-gray-400 cursor-pointer hover:underline" key={item}>{item}</p>
    ))}
</div>
)

const Footer = () => {
    return (
        <div className='hidden mt-6 xl:block'>
            <List items={footerList} mt={false}/>
            <p className="mt-5 text-sm text-gray-400">2023 © Yana Burdakova</p>
        </div>
    );
};

export default Footer;