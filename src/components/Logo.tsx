import Image from "next/image";

/**
 * Logo Azahares. Por default usa el horizontal (apto para nav/header).
 * En heros oscuros aplicamos un filtro para forzarlo a blanco sin
 * tener un asset alternativo.
 */
export function Logo({
  variant = "horizontal",
  whiteOnDark = false,
  className = "",
}: {
  variant?: "horizontal" | "square";
  whiteOnDark?: boolean;
  className?: string;
}) {
  const src =
    variant === "square" ? "/logos/logo-square.png" : "/logos/logo-horizontal.png";
  const aspect = variant === "square" ? 1 : 4.5;
  const baseHeight = variant === "square" ? 44 : 36;
  return (
    <Image
      src={src}
      alt="Azahares Group"
      width={baseHeight * aspect}
      height={baseHeight}
      priority
      className={className}
      style={
        whiteOnDark
          ? {
              filter: "brightness(0) invert(1)",
            }
          : undefined
      }
    />
  );
}
