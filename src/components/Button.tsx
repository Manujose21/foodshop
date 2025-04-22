
interface Props {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    color?: string;
}

export const Button = (
    { 
        children, 
        type = "button", 
        className, 
        onClick, 
        disabled 
    } : Props) => {
    return (
        <>
            <button 
                type={type} 
                className={`bg-indigo-500 hover:bg-indigo-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg cursor-pointer ${className}`}
                onClick={ onClick }    
                disabled={disabled} 
            >
                {children}
            </button>
        </>
    )
}