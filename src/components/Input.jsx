import React, { useId } from "react";
import { useTheme } from "@mui/material/styles";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  const theme = useTheme();

  return (
    <div
      className="w-full"
      style={{
        marginBottom: theme.spacing(2),
      }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "inline-block",
            marginBottom: theme.spacing(1),
            paddingLeft: theme.spacing(1),
            color: theme.palette.text.primary,
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`w-full px-3 py-2 rounded-lg outline-none duration-200 focus:ring-2 focus:ring-${theme.palette.primary.main} border ${
          theme.palette.mode === "light"
            ? "bg-white text-black border-gray-300"
            : "bg-gray-800 text-gray-100 border-gray-600"
        } ${className}`}
        style={{
          transition: "background-color 0.2s ease, border-color 0.2s ease",
        }}
        {...props}
      />
    </div>
  );
});

export default Input;
