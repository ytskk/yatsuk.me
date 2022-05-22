import { Link } from "@remix-run/react/components";

export interface Button {
  onClick?: (...args: any) => any;
  children?: React.ReactNode;
  to?: string;
  className?: string;
}

export default function Button({ onClick, to, className, children }: Button) {
  return (
    <Link
      onClick={onClick}
      className={["button text-brand-brand-primary", className].join(" ")}
      to={to ?? ""}
    >
      {children}
    </Link>
  );
}
