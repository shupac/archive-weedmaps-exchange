import { injectGlobal } from 'styled-components';
import { normalize } from 'polished';
import theme from 'lib/styles/theme';

// Create a singleton export that injects styles once
export const injectGlobalStyles = () => {
  logger.info('Injecting Global Styles');
  // eslint-disable-next-line no-unused-expressions
  injectGlobal`
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

    body {
      margin: 0;
      font-family: ${theme.text.fontFamily};
      background: #F4F4F4;

      &.modal-open {
        overflow: hidden;

        .page {
          pointer-events: none;
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
        height: 4px;
        box-shadow: 0 1px 3px 0 ${theme.colors.shadow};
      }
    }
    
    .no-overflow {
      overflow: hidden;
    }

    .modal-overlay {
      overflow: scroll;
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
    
    a{
      transition: color .2s ease-in-out;
    }
  `;
  return true;
};

export default injectGlobalStyles();
