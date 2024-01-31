'use client';

import Link from "next/link"

interface Props{
    is_Blog: string|undefined
}
export default function ProjectBlog(prop: Props){
    console.log(location.search);
    const is_blog_string = RegExp("is_blog=(true|false)");
    let search_blog = prop.is_Blog === undefined?"?is_blog=true": location.search.replace(is_blog_string,"is_blog=true");
	let search_project = prop.is_Blog === undefined?"?is_blog=false": location.search.replace(is_blog_string,"is_blog=false");

    const blog = prop.is_Blog === undefined || prop.is_Blog === 'false';
    return(
        <article className="blog_and_project">
            <Link className={`link_blog${blog?'':' blog_checked'}`} href={`project${search_blog}`}>Blog</Link>
            <Link className={`link_project${blog?' blog_checked':''}`} href={`project${search_project}`}>Project</Link>
        </article>
    )
}