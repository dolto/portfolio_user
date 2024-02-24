import React from "react";
import Intro from "@/component/Banner/Inner/Intro";
import Project from "@/component/project/project";

export default async function Home(props: any) {


    return (
        <main>
            <Intro/>

            <Project searchParams={props.searchParams}/>
        </main>
    )
}
