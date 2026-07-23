import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(({ label, error, type = "text", icon: Icon, className = "", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        )}
        <input
          ref={ref}
          type={inputType}
          className={`input-field ${Icon ? "pl-10" : ""} ${isPassword ? "pr-10" : ""} ${
            error ? "border-alert-500 focus:border-alert-500 focus:ring-alert-100" : ""
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-alert-600">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
