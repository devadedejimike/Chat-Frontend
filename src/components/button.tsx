import type { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost',
    isLoading?: boolean,
    icon?: LucideIcon
}

const Button = ({
    children,
    variant = 'primary',
    isLoading,
    icon: Icon,
    className = '',
    ...props
}: ButtonProps) => {
    const BaseStyles = 'group flex items-center justify-center gap-2 px-6 py-3 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed';
    
    const VariantStyles = {
        primary: 'bg-brand-accent text-white hover:opacity-90 hover:shadow-xl hover:shadow-brand-accent/20',
        outline: 'border border-brand-border text-slate-300 hover:bg-brand-card hover:text-white',
        ghost: 'text-slate-400 hover:bg-brand-card hover:text-white'
    };

    return (
        <button
            className={`${BaseStyles} ${VariantStyles[variant]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
                <>
                    {children}
                    {Icon && <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </>
            )}
        </button>
    );
};

export default Button;