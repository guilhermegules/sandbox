export default function Button({
  children,
  disabled = false,
  loading = false,
  className = "",
  ...remainingProps
}) {
  const background =
    disabled || loading ? "opacity-50 bg-secondary" : "bg-warning";
  return (
    <button
      className={`font-bold py-2 px-4 rounded ${background} ${className} uppercase`}
      disabled={disabled || loading}
      {...remainingProps}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
