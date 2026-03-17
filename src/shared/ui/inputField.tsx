import { useState } from "react"
import { Input } from "./input"
import { cn } from "@/shared/lib/css"
import { Eye, EyeOff, X } from "lucide-react"

type InputFieldProps = React.ComponentProps<"input"> & {
  leftIcon?: React.ReactNode
  clearable?: boolean
}

function InputField({
  className,
  type = "text",
  leftIcon,
  clearable,
  value,
  onChange,
  ...props
}: InputFieldProps) {
  const [internalValue, setInternalValue] = useState(value ?? "")
  const [showPassword, setShowPassword] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isPassword = type === "password"
  const inputType = isPassword ? (showPassword ? "text" : "password") : type

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
    onChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) setInternalValue("")
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-[#EDEDED] bg-white px-4 py-3 focus-within:border-ring transition",
        className
      )}
    >
      {leftIcon && (
        <div className="text-muted-foreground shrink-0">
          {leftIcon}
        </div>
      )}

      <Input
        {...props}
        type={inputType}
        value={currentValue}
        onChange={handleChange}
        className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0"
      />

      {clearable && !!currentValue && !isPassword && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground transition"
        >
          <X size={16} />
        </button>
      )}

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="text-muted-foreground hover:text-foreground transition"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  )
}

export { InputField }