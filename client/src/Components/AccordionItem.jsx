
//components/AccordionItem.jsx 
const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div className="border-b border-gray-200">
        <button
            className="w-full text-left px-4 py-3 focus:outline-none flex justify-between items-center"
            onClick={onClick}
        >
            <span className="text-lg font-medium">{title}</span>
            <span
                className="ml-2 transform transition-transform duration-200"
                style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            >
                ▶
            </span>
        </button>
        {isOpen && (
            <div className="px-4 py-2 text-gray-700">
                {content}
            </div>
        )}
    </div>
);

export default AccordionItem;