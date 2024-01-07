

export default function Layout({children}:{children: React.ReactNode}){
    return(
      <form method={"get"}>
          {children}
      </form>
    );
}