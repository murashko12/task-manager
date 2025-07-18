import type { InputHTMLAttributes } from "react"

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className={`w-full p-2 border rounded outline-none ${className}`}
            {...props}
        />
    )
}