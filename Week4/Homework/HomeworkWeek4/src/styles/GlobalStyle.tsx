// styles/GlobalStyle.tsx
import { Global, css } from "@emotion/react";

export default function GlobalStyle() {
  return (
    <Global
      styles={(theme) => css`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background-color: ${theme.colors.background};
          color: ${theme.colors.text};
          font-family: system-ui, sans-serif;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }
      `}
    />
  );
}
