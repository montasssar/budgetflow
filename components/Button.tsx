import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
};

export default function Button({ variant = "solid", className, ...props }: Props) {
  const base = "cursor-pointer";
  const style =
    variant === "solid"
      ? {
          background: "var(--accent)",
          color: "#fff",
          border: "none",
        }
      : {
          background: "transparent",
          color: "var(--text)",
          border: "1px solid rgba(255,255,255,0.12)",
        };

  return (
    <button
      {...props}
      className={clsx(base, className)}
      style={{
        padding: "10px 14px",
        borderRadius: "10px",
        boxShadow: "var(--shadow)",
        ...style,
      }}
    />
  );
}
