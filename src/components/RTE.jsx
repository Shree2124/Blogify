import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";

export default function RTE({ name, control, label, defaultValue = "" }) {
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
          className="inline-block mb-1 pl-1"
          style={{
            fontSize: "0.9rem",
            fontWeight: 500,
            color: theme.palette.text.primary,
          }}
        >
          {label}
        </label>
      )}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="m8geuhkcf6mdlpy3248hms0c24q3boyotqoc0ethblxmhh81"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table code help wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: `
                body {
                  font-family: ${theme.typography.fontFamily}, sans-serif;
                  font-size: ${theme.typography.fontSize}px;
                  color: ${theme.palette.text.primary};
                }
              `,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
