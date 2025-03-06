"use client"

import React from "react"
import { Button, ButtonProps } from "@/components/ui/button"

export const AnimatedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${className}`}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Button>
    )
  }
)
AnimatedButton.displayName = "AnimatedButton"
