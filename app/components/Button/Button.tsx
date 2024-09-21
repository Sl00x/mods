import { RiLoader5Line } from "@remixicon/react";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

type color = "dark" | "primary" | "secondary" | "light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  color: color;
  loading?: boolean;
  icon?: any;
  onClick?: () => void;
}

const variant = (color: color) => {
  switch (color) {
    case "dark":
      return "bg-dark";
    case "primary":
      return "bg-primary";
    case "secondary":
      return "bg-secondary";
    case "light":
      return "bg-light text-dark";
    default:
      return "bg-primary";
  }
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={() => !props.loading && props.onClick?.()}
      className={clsx([
        !props.loading ? variant(props.color) : "bg-dark text-light",
        "flex space-x-2 items-center align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none",
      ])}
    >
      {props.loading ? (
        <RiLoader5Line className="animate-spin" size={16} />
      ) : (
        <span>{props.title}</span>
      )}
      {props.icon && <props.icon size={16} />}
    </button>
  );
};
