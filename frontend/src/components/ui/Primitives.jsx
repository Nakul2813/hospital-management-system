export function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={`card ${hover ? "transition-all hover:shadow-glow hover:-translate-y-0.5" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

const badgeColors = {
  success: "bg-vital-100 text-vital-800",
  info: "bg-clinical-100 text-clinical-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-alert-100 text-alert-700",
  neutral: "bg-ink-100 text-ink-600",
};

export function Badge({ children, tone = "neutral", className = "" }) {
  return <span className={`badge ${badgeColors[tone]} ${className}`}>{children}</span>;
}

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-lg bg-ink-100 ${className}`} />;
}

export function StatCard({ label, value, icon: Icon, trend, tone = "clinical" }) {
  const toneClasses = {
    clinical: "bg-clinical-50 text-clinical-600",
    vital: "bg-vital-50 text-vital-600",
    alert: "bg-alert-50 text-alert-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <Card className="animate-fadeUp">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold text-ink-900 font-display">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-semibold ${trend.startsWith("+") ? "text-vital-600" : "text-alert-600"}`}>
              {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClasses[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </Card>
  );
}
