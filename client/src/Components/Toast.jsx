import toast from 'react-hot-toast'

const Toast = (message, icon, position='top-right') => toast(message, {
    icon: icon,
    style: {
        background: '#333',
        color: '#fff',
    },
    position: position,
    duration: 3000,
})

export default Toast