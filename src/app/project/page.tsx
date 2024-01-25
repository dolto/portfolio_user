import { connectDB } from "../../../Util/MongoDB";
import {ProjectCollection } from "./interface";
import Project_category from "./project_category";
import Project_list from "./project_list";
import ProjectViewer from "./project_viewer";

interface Prop{
	searchParams: {
		langs_slecets: string,
		skills_slects: string,
		project_id: string | undefined
	}
}
async function Project(props: Prop) {
	const client = await connectDB;
	const db = client.db('folio');
	const project_data = await db.collection<ProjectCollection>('PostData').find().toArray();
	const select_project = project_data.find((pj)=>
		pj._id.toString() === props.searchParams.project_id
	)
	return (
		<section id={"project"}>
			<Project_category searchParams={{
				langs_slecets: props.searchParams.langs_slecets == undefined ?
					[]:JSON.parse(props.searchParams.langs_slecets) as string[],
				skills_slects: props.searchParams.skills_slects == undefined ?
					[]:JSON.parse(props.searchParams.skills_slects) as string[]
			}}></Project_category>
			<Project_list data={project_data}
						  selectedLang={props.searchParams.langs_slecets == undefined ?
							  [] : (JSON.parse(props.searchParams.langs_slecets) as string[])} //임시로 Id값을 불러오는 느낌으로
						  selectedSkill={props.searchParams.skills_slects == undefined ?
							  [] : (JSON.parse(props.searchParams.skills_slects) as string[])}></Project_list>
			<ProjectViewer project={select_project}></ProjectViewer>
		</section>
	)
}

export default Project;