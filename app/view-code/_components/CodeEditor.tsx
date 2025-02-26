import React from "react";
import { sandpackDark } from "@codesandbox/sandpack-themes";
import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import Constants from "@/data/Constants";
export default function CodeEditor({ codeResp, isReady }: any) {
  return (
    <div>
      {isReady ? (
        <Sandpack
          theme={sandpackDark}
          template="react"
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showLineNumbers: true,
            showTabs: true,
            editorHeight: 550,
          }}
          files={{
            "/App.js": `${codeResp}`,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={sandpackDark}
          files={{
            "/App.js": {
              code: `${codeResp}`,
              active: true,
            },
          }}
          customSetup={{
            dependencies: {
              ...Constants.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{ height: "70vh" }} />
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}
