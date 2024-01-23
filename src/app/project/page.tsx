import {ContentMode, PostCollection } from "./interface";
import Project_category from "./project_category";
import Project_list from "./project_list";

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
const project_data: PostCollection[] = [
	{
		id:'0',
		category: ['JavaId','KotlinId'],
		skill_id: ['SpringId'],
		contents: [
			{
				mode:ContentMode.img,
				content:'https://raw.githubusercontent.com/dolto/IBA_Cocktail_recipe_API/main/Cocktail/Alejandro.webp'
			}
		],
		name: '스프링으로 시작한 포트폴리오 사이트'
	},
	{
		id:'1',
		category: ['RustId'],
		skill_id: ['BevyId'],
		contents: [
			{
				mode:ContentMode.img,
				content:'https://raw.githubusercontent.com/dolto/IBA_Cocktail_recipe_API/main/Cocktail/Alejandro.webp'
			}
		],
		name: '러스트로 시작하는 게임개발'
	},
	{
		id:'2',
		category: ['JavaId','KotlinId'],
		skill_id: ['Spring BootId'],
		contents: [
			{
				mode:ContentMode.img,
				content:'https://raw.githubusercontent.com/dolto/IBA_Cocktail_recipe_API/main/Cocktail/Alejandro.webp'
			}
		],
		name: '스프링부트로 시작한 포트폴리오 사이트'
	},
	{
		id:'3',
		category: ['KotlinId'],
		skill_id: ['SpringId'],
		contents: [
			{
				mode:ContentMode.img,
				content:'https://raw.githubusercontent.com/dolto/IBA_Cocktail_recipe_API/main/Cocktail/Alejandro.webp'
			}
		],
		name: '스프링부트로 시작한 코틀린 포트폴리오 사이트'
	}
]

interface Prop{
	searchParams: {
		langs_slecets: string,
		skills_slects: string
	}
}
function Project(props: Prop) {
	console.log(process.env.MongoDB_URI)

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