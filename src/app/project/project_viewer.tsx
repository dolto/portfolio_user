'use client';
import { SyntheticEvent, useEffect } from "react";
import { ProjectCollection } from "./interface";
import "./project.css";
// import dynamic from "next/dynamic";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import Link from "next/link";

// const Viewer = dynamic(()=>import('@toast-ui/editor/dist/toastui-editor-viewer'),{
//     ssr: false
// });

interface Props {
    project: ProjectCollection | undefined
}
// const close_viewer = (e:Event) => {
//     const con = e.currentTarget as HTMLElement;
//     con.classList.remove('open');
// }
export default function ProjectViewer (props: Props){
    useEffect(() => {
        console.log("프로젝트 감지 시작")
        const containor = document.querySelector('.project_viewer_containor') as Element;
        if(props.project !== undefined){
            console.log("프로젝트 감지됨")
            containor.classList.add('open');
            const viewer_setter = new Viewer({
                el: document.querySelector('#project_viewer'),
                height: '600px',
                initialValue: props.project.contents
            });
            containor.scrollTop = 0;
            // containor.addEventListener('click', close_viewer);
        }
        else{
            console.log("프로젝트 감지못함")
            containor.classList.remove('open');
            // containor.removeEventListener('click',close_viewer);
        }
    });

    let search = location.search.split('&project')[0];
    return (
        <nav className={'project_viewer_containor'}>
            {props.project !== undefined?
                <Link className={'project_close'} href={`project${search}`}>
                    <i className="fa-solid fa-trash"></i>
                </Link>
                :
                null}
            <article id={'project_viewer'}></article>
        </nav>
    )
}