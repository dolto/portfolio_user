import Link from "next/link";
import { CSSProperties } from "react";

const link_style: CSSProperties = {
    fontSize: "1rem", // vscode에서는 자동완성 해주던데...
    color:"blue",
    marginLeft:"2rem",
};
const hello_style: CSSProperties = {
    fontSize: "3rem", // vscode에서는 자동완성 해주던데...
    color:"red",
    marginLeft:"2rem",
    display:"block"
};

export default function Example(){
    let hello_json = JSON.stringify(hello_style);
    let link_json = JSON.stringify(link_style);
    return(
      <section style={link_style}>
        <Link href={"/"}>
            - root page
        </Link>
          <br/>
        <Link href={
            `example/hello?message_style_json=${hello_json}&back_style_json=${link_json}`
        }>
          - hello page
        </Link>
          <br/>
        <Link href={"example/input"}>
          - input page
        </Link>
      </section>
    );
}

// const Example = (): JSX.Element => {
//     return(
//       <section style={hello_style}>
//           HelloWord!!
//       </section>
//     );
// };
//
// export default Example(); 
// NextJs의 경우 인스턴스 형태의 내보내기는 컴포넌트로 활용하지 않음... 따라서 이런 형태는 지원되지 않음