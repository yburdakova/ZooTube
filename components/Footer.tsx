import React from 'react';
import { footerList1, footerList2, footerList3 } from '@/utils/constants';
import { FooterList } from '@/types';


const List = ({items, mt}: FooterList) => (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item) => (
        <p className="text-gray-400 text-sm hover:underline cursor-pointer" key={item}>{item}</p>
    ))}
</div>
)

const Footer = () => {
    return (
        <div className='mt-6 hidden xl:block'>
            <List items={footerList1} mt={false}/>
            <List items={footerList2} mt/>
            <List items={footerList3} mt/>
            <p className="text-gray-400 text-sm mt-5">2023 © TipTop</p>
        </div>
    );
};

export default Footer;