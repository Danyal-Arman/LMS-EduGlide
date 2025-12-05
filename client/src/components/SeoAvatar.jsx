// components/SeoAvatar.jsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function SeoAvatar({ src, name, size = 32, fallbackText }) {
  const initials =
    fallbackText ||
    (name
      ? name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "U");

  const px = `${size}px`;
  const tailwindClass = size === 32 ? "h-8 w-8" : `h-[${px}] w-[${px}]`;

  return (
    <div style={{ width: size, height: size, display: "inline-block" }}>
      <Avatar>
        <AvatarImage
          src={src}
          alt={name ?? ""}
          width={size}
          height={size}
          className={`${tailwindClass} rounded-full object-cover`}
          loading="lazy"
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}
