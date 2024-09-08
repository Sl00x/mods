import React from "react";

interface ButtonProps {
    title: string;
    onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
    return(
        <button
            onClick={props.onClick}
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-primary text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button">
            {props.title}
        </button>
    )
}