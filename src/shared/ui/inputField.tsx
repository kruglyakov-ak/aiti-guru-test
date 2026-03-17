import { useState } from "react";
import { Input } from "./input";
import { cn } from "@/shared/lib/css";
import { Eye, EyeOff, X } from "lucide-react";

type InputFieldProps = React.ComponentProps<"input"> & {
  leftIcon?: React.ReactNode;
  clearable?: boolean;
};

function InputField({
  className,
  type = "text",
  leftIcon,
  clearable,
  value,
  onChange,
  ...props
}: InputFieldProps) {
  const [internalValue, setInternalValue] = useState(value ?? "");
  const [showPassword, setShowPassword] = useState(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue("");
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div
      className={cn(
        "flex items-center px-4 py-3.5 rounded-[12px] border-[1.5px] border-[#EDEDED] bg-white",
        className,
      )}
    >
      {leftIcon && (
        <div className="w-6 h-6 mr-1.5 shrink-0 flex flex-col items-center justify-center gap-0.5">
          {leftIcon}
        </div>
      )}

      <Input
        {...props}
        type={inputType}
        value={currentValue}
        onChange={handleChange}
        className="flex-1 text-[#232323] font-medium leading-[150%] tracking-[-0.27px] outline-none bg-transparent placeholder:text-[#C9C9C9] border-2 h-6.75 text-[18px] md:text-[18px] border-none focus-visible:border-none focus-visible:ring-0"
      />

      {clearable && !!currentValue && !isPassword && (
        <button
          type="button"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground transition cursor-pointer ml-1.5"
        >
          <X size={27} color="#C9C9C9" />
        </button>
      )}

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="text-muted-foreground hover:text-foreground transition cursor-pointer ml-1.5"
        >
          {showPassword ? <EyeOff size={27} color="#C9C9C9" /> : <Eye size={27} color="#C9C9C9" />}
        </button>
      )}
    </div>
  );
}

export { InputField };
