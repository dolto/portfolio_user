import { CSSProperties } from "react";

const hello_style: CSSProperties = {
    fontSize: "3rem", // vscode에서는 자동완성 해주던데...
};

export default function Layout({children}:{children: React.ReactNode}){

    return (
      <form method={"Get"} style={hello_style}>
          <h1>Example Page</h1>
          {children}
      </form>
    );
}