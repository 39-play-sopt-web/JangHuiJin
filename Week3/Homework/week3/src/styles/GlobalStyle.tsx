import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`
  :root {
    --brand-mint: ${({ theme }) => theme.color.mint};
    --brand-line: ${({ theme }) => theme.color.line};
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.color.background};
    color: ${({ theme }) => theme.color.text};
    font-family: sans-serif;
  }
`
export default GlobalStyle