// src/components/Container.jsx
export default function Container({ children, className = "", maxWidth = "full" }) {
  const maxWidths = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    full: "w-full",
  };

  return (
    <div className={`${maxWidths[maxWidth]} mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}