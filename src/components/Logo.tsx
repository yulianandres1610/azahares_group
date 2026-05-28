import Image from "next/image";

/**
 * Logo Azahares Import & Export. Wide variant para nav/header.
 * En heros oscuros aplicamos un filtro para invertir a blanco sin
 * mantener un asset alternativo.
 */
export function Logo({
  variant = "horizontal",
  whiteOnDark = false,
  className = "",
  height = 48,
}: {
  variant?: "horizontal" | "square";
  whiteOnDark?: boolean;
  className?: string;
  height?: number;
}) {
  const src =
    variant === "square" ? "/logos/logo-square.png" : "/logos/logo-horizontal.png";
  // Horizontal logo aspect ratio ≈ 4.5:1 — calculamos el ancho desde el alto
  // para que el escalado sea predecible en cualquier hero / nav.
  const aspect = variant === "square" ? 1 : 4.5;
  return (
    <Image
      src={src}
      alt="Azahares Import & Export"
      width={Math.round(height * aspect)}
      height={height}
      priority
      className={className}
      style={
        whiteOnDark
          ? { filter: "brightness(0) invert(1)" }
          : undefined
      }
    />
  );
}
