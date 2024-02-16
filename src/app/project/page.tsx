import Link from "next/link";
import { connectDB } from "../../../Util/MongoDB";
import {ProjectCollection } from "./interface";
import Project_category from "./project_category";
import Project_list from "./project_list";
import ProjectViewer from "./project_viewer";
import ProjectBlog from "./project_blog";

interface Prop{
	searchParams: {
		langs_slecets: string,
		skills_slects: string,
		project_id: string | undefined,
		is_blog: string | undefined
	}
}
async function Project(props: Prop) {
	const client = await connectDB;
	const db = client.db('folio');
	let post_data = props.searchParams.is_blog === undefined
		|| props.searchParams.is_blog === 'false'? 
		await db.collection<ProjectCollection>('PostData')
		.find().toArray() :
		await db.collection<ProjectCollection>('BlogData')
		.find().toArray();
	post_data.map(post => {
		post._id = post._id.toString();
		return post;
	})
	
	const select_project = post_data.find((pj)=>
		pj._id === props.searchParams.project_id
	)

	return (
		<section id={"project"}>
			<Project_category 
				langs_slecets= {props.searchParams.langs_slecets == undefined ?
					[]:JSON.parse(props.searchParams.langs_slecets) as string[]}
				skills_slects= {props.searchParams.skills_slects == undefined ?
					[]:JSON.parse(props.searchParams.skills_slects) as string[]}
					is_Blog={props.searchParams.is_blog === undefined|| props.searchParams.is_blog === 'false'}
			></Project_category>
			<ProjectBlog is_Blog={props.searchParams.is_blog}></ProjectBlog>
			<Project_list data={post_data}
						  selectedLang={props.searchParams.langs_slecets == undefined ?
							  [] : (JSON.parse(props.searchParams.langs_slecets) as string[])} //임시로 Id값을 불러오는 느낌으로
						  selectedSkill={props.searchParams.skills_slects == undefined ?
							  [] : (JSON.parse(props.searchParams.skills_slects) as string[])}
							is_Blog={props.searchParams.is_blog === undefined|| props.searchParams.is_blog === 'false'}></Project_list>
			<ProjectViewer project={select_project}></ProjectViewer>
		</section>
	)
}
export default Project;