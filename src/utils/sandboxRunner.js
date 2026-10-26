/**
 * sandboxRunner.js
 * Combines HTML, CSS, and JS into an isolated, self-reporting iframe document.
 * Captures console.log, console.error, console.warn, and unhandled runtime errors
 * and forwards them to the parent window via postMessage.
 */

export function buildSandboxSrcDoc({ html = '', css = '', js = '' }) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: #0f172a;
        color: #f8fafc;
        min-height: 100vh;
      }
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      (function() {
        const sendLog = (type, args) => {
          try {
            window.parent.postMessage({
              source: 'codeverse-sandbox',
              type: type,
              payload: args.map(a => {
                if (typeof a === 'object' && a !== null) {
                  try {
                    return JSON.stringify(a);
                  } catch (e) {
                    return Object.prototype.toString.call(a);
                  }
                }
                return String(a);
              }).join(' ')
            }, '*');
          } catch (e) {
            // ignore message delivery failure
          }
        };

        const origLog = console.log;
        const origError = console.error;
        const origWarn = console.warn;
        const origInfo = console.info;

        console.log = (...args) => {
          origLog.apply(console, args);
          sendLog('log', args);
        };
        console.error = (...args) => {
          origError.apply(console, args);
          sendLog('error', args);
        };
        console.warn = (...args) => {
          origWarn.apply(console, args);
          sendLog('warn', args);
        };
        console.info = (...args) => {
          origInfo.apply(console, args);
          sendLog('info', args);
        };

        window.onerror = (msg, url, line, col, error) => {
          const detail = msg + (line ? ' (Line ' + line + ')' : '');
          sendLog('error', [detail]);
          return false;
        };

        // Notify parent that iframe rendered
        window.addEventListener('load', () => {
          window.parent.postMessage({
            source: 'codeverse-sandbox',
            type: 'loaded'
          }, '*');
        });
      })();

      try {
        ${js}
      } catch (err) {
        console.error(err.message || String(err));
      }
    </script>
  </body>
</html>`;
}
