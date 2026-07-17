interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  let bg = "";
  let text = "";

  switch (status) {
    case "منظور":
      bg = "bg-green-100 text-green-700";
      break;

    case "مسترد":
      bg = "bg-red-100 text-red-700";
      break;

    default:
      bg = "bg-yellow-100 text-yellow-700";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-bold ${bg}`}
    >
      {status}
    </span>
  );
}