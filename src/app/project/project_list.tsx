import {ContentMode, PostCollection, PostContent } from './interface';
import Image from 'next/image';
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
        <article className={'project_list_container'}>
            {data.map(pj => {
                const frontImg =
                    pj.contents.find(f => f.mode == ContentMode.img) as PostContent;
                return (<nav className={'project_element'} key={pj.id}>
                    <Image alt={'사진이 없습니다.'}
                           className={'project_front_img'}
                           src={frontImg.content}
                           width={720}
                           height={720}/>
                    <article className={'project_front_text'}>
                        <nav className={'project_title'}>
                            {pj.name}
                        </nav>
                        <hr className={'project_element_hr'}/>
                        <nav className={'project_category'}>
                            {pj.category.map(c =>
                                <span>{' | '+c.replace('Id',' | ')}</span> //이건 id에서 이름을 구하는 식으로 바꿔야함
                            )}<br/>{pj.skill_id.map(c =>
                            <span>{' | '+c.replace('Id',' | ')}</span> //이건 id에서 이름을 구하는 식으로 바꿔야함
                        )}
                        </nav>
                    </article>
                </nav>);
            })}
        </article>
    );
}