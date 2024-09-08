import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    onTextChange?: (value: string) => void;

}

export const Textarea = (props: InputProps) => {
    return(
        <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            {props.label}
            </label>
            <div className="mt-2">
            <textarea
            onChange={(e) => props.onChange?.(e) || props.onTextChange?.(e.target.value)}
                {...props}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
            </div>
        </div>
    )
}