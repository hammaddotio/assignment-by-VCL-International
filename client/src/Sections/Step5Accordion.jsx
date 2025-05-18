// components/Accordion.jsx 
import React, { useState } from 'react';
import { accordionData as items } from '../data/accordionData';
import AccordionItem from '../Components/AccordionItem';

const Accordion = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = (index) => {
        setOpenIndex(prevIndex => (prevIndex === index ? index : index));
    };

    return (
        <div className="w-full mx-auto bg-white shadow-md rounded-md overflow-hidden">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </div>
    );
};

export default Accordion;
