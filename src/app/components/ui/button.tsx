import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      default: "bg-slate-900 text-slate-50 shadow hover:bg-slate-800",
      outline: "border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50 hover:text-slate-900",
      ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }
    
    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8"
    }
    
    const variantClass = variants[variant]
    const sizeClass = sizes[size]
    
    return (
      <button
        className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button } 