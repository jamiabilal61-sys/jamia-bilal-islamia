type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        inline-flex
        items-center
        justify-center
        px-6
        py-3
        rounded-xl
        bg-blue-700
        text-white
        font-semibold
        transition-all
        duration-300
        hover:bg-blue-800
        hover:scale-105
        active:scale-95
        shadow-lg
      "
    >
      {children}
    </button>
  );
}