import type { SelectHTMLAttributes } from "react"

export const Select = ({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => {
    return (
        <select
            className={`w-full p-2 border rounded outline-none ${className}`}
            {...props}
        >
            {children}
        </select>
    )
}