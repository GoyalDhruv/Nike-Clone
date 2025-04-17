import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({
    variant = "light",
    color = "primary",
    size = "md",
    startIcon,
    endIcon,
    children,
}) => {
    const baseStyles =
        "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

    const sizeStyles = {
        sm: "text-sm",
        md: "text-md",
    };

    const variants = {
        light: {
            primary:
                "bg-[#ecf3ff] text-[#465fff]",
            success:
                "bg-[#ecfdf3] text-[#039855]",
            error:
                "bg-[#fef3f2] text-[#f04438]",
        },
        solid: {
            primary: "bg-[#465fff] text-white",
            success: "bg-[#039855] text-white",
            error: "bg-[#f04438] text-white",
        },
    };

    const sizeClass = sizeStyles[size];
    const colorStyles = variants[variant][color];


    return (
        <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
            {startIcon && <span className="mr-1">{startIcon}</span>}
            {children}
            {endIcon && <span className="ml-1">{endIcon}</span>}
        </span>
    );
};

Badge.propTypes = {
    variant: PropTypes.oneOf(["light", "solid"]),
    color: PropTypes.oneOf(["primary", "success", "error"]),
    size: PropTypes.oneOf(["sm", "md"]),
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    children: PropTypes.node,
};

export default Badge;
