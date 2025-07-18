import type { TextareaHTMLAttributes } from "react";

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            className={`w-full p-2 border rounded outline-none ${className}`}
            {...props}
        />
    )
}