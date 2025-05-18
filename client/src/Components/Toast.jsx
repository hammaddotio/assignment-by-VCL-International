import toast from 'react-hot-toast';

const Toast = (message, icon, position = 'top-right') => {
    const toastId = toast.custom((t) => (
        <div
            style={{
                background: '#333',
                color: '#fff',
                padding: window.innerWidth < 640 ? '12px 16px' : '14px 20px',
                fontSize: window.innerWidth < 640 ? '14px' : '16px',
                maxWidth: window.innerWidth < 640 ? '90%' : '400px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                position: 'relative',
            }}
        >
            {icon && <span>{icon}</span>}
            <span>{message}</span>
            <button
                onClick={() => toast.dismiss(t.id)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    padding: '4px',
                    marginLeft: 'auto',
                    opacity: '0.8',
                    transition: 'opacity 0.2s',
                    fontSize: '18px',
                    lineHeight: '1',
                }}
                aria-label="Close toast"
            >
                &times;
            </button>
        </div>
    ), {
        position: window.innerWidth < 640 ? 'top-center' : position,
        duration: 3000,
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    });

    return toastId;
};

export default Toast;