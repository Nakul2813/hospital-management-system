import { Loader2 } from "lucide-react";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "inline-flex items-center justify-center gap-2 rounded-xl bg-alert-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-alert-700 active:scale-[0.98] disabled:opacity-50",
};

const sizes = {
  sm: "!px-3.5 !py-1.5 !text-xs",
  md: "",
  lg: "!px-6 !py-3 !text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}
