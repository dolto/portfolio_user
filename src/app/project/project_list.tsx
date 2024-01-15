import {ContentMode, PostCollection, PostContent } from './interface';
import './project.css';

interface Props{
    data: PostCollection[],
    selectedLang: string[],
    selectedSkill: string[]
}
export default function Project_list (props: Props){
    const data = props.selectedSkill.length + props.selectedLang.length == 0 ?
        props.data : props.data.filter(db => {
        const langs = props.selectedLang;
        const skills = props.selectedSkill;
        let result = false;

        db.category.forEach(l => {
            if(langs.includes(l)){
                result = true;
                return false;
            }
        });
        if(!result){
            db.skill_id.forEach(s=>{
                if(skills.includes(s)){
                    result = true;
                    return false;
                }
            })
        }
        return result;
    })

    return(
        <article className={'project_list_containor'}>
            {data.map(pj => {
                const frontImg =
                    pj.contents.find(f => f.mode == ContentMode.img) as PostContent;
                return (<nav className={'project_element'} key={pj.id}>
                    <img className={'project_front_img'} src={frontImg.content}/>
                    <article className={'project_front_name'}>
                        {pj.name}
                    </article>
                </nav>);
            })}
        </article>
    );
}