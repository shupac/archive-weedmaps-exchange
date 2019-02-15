import { createGlobalStyle } from 'styled-components';
import { normalize, rem } from 'polished';
import theme from 'lib/styles/theme';

const GlobalStyle = createGlobalStyle`
    html {
      box-sizing: border-box;
    }
    
    #modal-node {
      height: auto;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }

    u {
      text-decoration: underline;
    }

    button, input {
      outline: none;
    }
    
    button {
      border: none;
      background-color: transparent;
      &:hover{
      cursor: pointer;
      }
    }

    body {
      margin: 0;
      font-family: ${theme.text.proximaNovaFont};
      background: #F1F4F7;
      overflow: hidden;

      &.modal-open {
        overflow: hidden;

        .page {
          pointer-events: none;
        }
      }
    }
    
    #nprogress {
      pointer-events: none;
    }
    
    #nprogress .bar {
      background: ${theme.colors.primary};
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: ${rem(4)};
    }
    
    #nprogress .peg {
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      opacity: 1;
      transform: rotate(3deg) translate(0, -${rem(4)});
    }
    
    .no-overflow {
      overflow: hidden;
    }

    .modal-overlay {
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      background-color: rgba(0, 0, 0, 0.4);
      transition: opacity 300ms ease-in-out;
      opacity: 0;
      z-index: 10;

      &.entered {
        opacity: 1;
      }

      &.exiting {
        opacity: 0;
      }

      &.exited {
        opacity: 0;
        visibility: hidden;
      }
    }

    #__next,
    html,
    body,
    body>div:first-child,
    body>div:first-child>div:first-child,
    body>div:first-child>div:first-child>div:first-child {
      height: 100%
    }

    #modal-node {
      height: auto;
    }

    ${normalize()}

    b, strong {
      font-weight: 600;
    }

    a {
      transition: color .2s ease-in-out;
    }

    input, textarea {
      color: ${theme.style.text.normal};
      font-size: ${rem(14)};

      &::placeholder {
        color: ${theme.style.icon.light};
      }
    }
  `;

export default GlobalStyle;
