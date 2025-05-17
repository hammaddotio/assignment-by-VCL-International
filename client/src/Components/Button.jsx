const Button = ({ label = 'Button', onClick = () => { }, color = 'blue', type = 'button' }) => (
    <button
        type={type}
        onClick={onClick}
        className={`bg-${color}-500 text-white px-4 py-2 rounded hover:bg-${color}-600 transition duration-300 ease-in-out`}>
        {label}
    </button>
);

export default Button;