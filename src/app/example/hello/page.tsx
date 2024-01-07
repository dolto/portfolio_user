import Link from "next/link";
import { CSSProperties } from "react";

interface Props {
    params: any,
    searchParams: {
        message_style_json: string,
        back_style_json: string
    }
}
export default function Hello(props: Props){
    let message_style: CSSProperties
        = JSON.parse(props.searchParams.message_style_json);
    let back_style: CSSProperties
        = JSON.parse(props.searchParams.back_style_json);

    console.log(props);
    return (
      <section>
          <p style={message_style}>Hello NextJs!!</p>
          <Link href={"."} style={back_style}>back in example page</Link>
      </section>
    );
}