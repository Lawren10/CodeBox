import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="topNav">
        <div className="logoContainer">
          <h1 className="logoName">Code Box</h1>
          <i class="fa fa-code icon" aria-hidden="true"></i>
        </div>
      </div>
      <main className="outterWrapper ">
        <div className="pane top-pane left_Pane ">
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
            icon={
              <i
                class="fa fa-html5"
                aria-hidden="true"
                style={{ color: "red" }}
              ></i>
            }
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            icon={
              <i
                class="fa fa-css3"
                aria-hidden="true"
                style={{ color: "blue" }}
              ></i>
            }
          />
          <Editor
            language="javascript"
            displayName="JS"
            value={js}
            onChange={setJs}
            icon={
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "yellow",
                  lineHeight: 0,
                  padding: 0,
                  margin: 0,
                }}
              >
                JS
              </p>
            }
          />
        </div>
        <div className="pane Right_Pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>
      </main>
    </>
  );
}

export default App;
