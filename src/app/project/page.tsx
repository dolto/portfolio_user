import Project_category from "./project_category";

const langs = [
    'Java',
    'Kotlin',
    'Rust',
]
const skills = [
	'Spring',
    'Spring Boot',
    'Bevy',
]
interface Prop{
	searchParams: {
		langs_slecets: string,
		skills_slects: string
	}
}
function Project(props: Prop) {
	console.log(props)
	return (
		<section>
			<Project_category searchParams={{
				langs_slecets: props.searchParams.langs_slecets == undefined ?
					[]:JSON.parse(props.searchParams.langs_slecets),
				skills_slects: props.searchParams.skills_slects == undefined ?
					[]:JSON.parse(props.searchParams.skills_slects)
			}}></Project_category>
		</section>
	)
}

export default Project;