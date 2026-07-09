import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit" | "reset";
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--secondary)] hover:opacity-90 text-white",

    secondary:
      "bg-[var(--primary)] hover:opacity-90 text-white",

    outline:
      "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
  };

  return (
    <button
      type={type}
      className={`
        ${variants[variant]}
        px-6
        py-3
        rounded-xl
        font-semibold
        transition-all
        duration-300
      `}
    >
      {children}
    </button>
  );
}