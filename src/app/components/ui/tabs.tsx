"use client"

import * as React from "react"

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: string; onValueChange?: (value: string) => void; defaultValue?: string }
>(({ className, value, onValueChange, defaultValue, children, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || "")
  
  const currentValue = value !== undefined ? value : selectedValue
  
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue)
    }
    onValueChange?.(newValue)
  }
  
  return (
    <div 
      ref={ref} 
      className={`${className || ""}`} 
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value: currentValue,
            onChange: handleValueChange,
          })
        }
        return child
      })}
    </div>
  )
})
Tabs.displayName = "Tabs"

export { Tabs } 