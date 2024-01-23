import { connectDB } from "../../../Util/MongoDB";
import { PostCollection } from "./interface";
import Project_category from "./project_category";
import Project_list from "./project_list";

interface Prop{
	searchParams: {
		langs_slecets: string,
		skills_slects: string
	}
}
async function Project(props: Prop) {
	const client = await connectDB;
	const db = client.db('folio');
	const project_data = await db.collection<PostCollection>('PostData').find().toArray();
	console.log(project_data);
	return (
		<section>
			<Project_category searchParams={{
				langs_slecets: props.searchParams.langs_slecets == undefined ?
					[]:JSON.parse(props.searchParams.langs_slecets),
				skills_slects: props.searchParams.skills_slects == undefined ?
					[]:JSON.parse(props.searchParams.skills_slects)
			}}></Project_category>
			<Project_list data={project_data}
			  selectedLang={props.searchParams.langs_slecets == undefined ?
				[]:(JSON.parse(props.searchParams.langs_slecets) as string[]).map(s=>s+'Id')} //임시로 Id값을 불러오는 느낌으로
			selectedSkill={props.searchParams.skills_slects == undefined ?
				[]:(JSON.parse(props.searchParams.skills_slects) as string[]).map(s=>s+'Id')}></Project_list>
		</section>
	)
}

export default Project;