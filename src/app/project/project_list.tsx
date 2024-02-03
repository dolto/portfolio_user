import {LangCollection, ProjectCollection, SkillCollection} from './interface';
// import Image from 'next/image';
import './project.css';
import { connectDB } from '../../../Util/MongoDB';
import Link from 'next/link';

interface Props{
    data: ProjectCollection[],
    selectedLang: string[],
    selectedSkill: string[],
    is_Blog: boolean
}
export default async function Project_list(props: Props) {
    const data = props.selectedSkill.length + props.selectedLang.length == 0 ?
        props.data : props.data.filter(db => {
            const langs = props.selectedLang;
            const skills = props.selectedSkill;
            let result = false;

            db.lang_id.forEach(l => {
                if (langs.includes(l)) {
                    result = true;
                    return false;
                }
            });
            if (!result) {
                db.skill_id.forEach(s => {
                    if (skills.includes(s)) {
                        result = true;
                        return false;
                    }
                })
            }
            return result;
        })

    const client = await connectDB;
    const db = client.db('folio');
    const langs_data = await db.collection<LangCollection>('Lang').find().toArray();
    const skill_data = await db.collection<SkillCollection>('Skill').find().toArray();
    return (
        <article className={'project_list_container'}>
            {data.map(pj => {
                const frontImg = pj.thumbnail;
                return (<Link className={'project_element'}
                              key={pj._id.toString()}
                              href={`project?is_blog=${!props.is_Blog}&langs_slecets=${
                                  JSON.stringify(props.selectedLang)}&skills_slects=${JSON.stringify(props.selectedSkill)
                              }&project_id=${pj._id.toString()}`}>
                    <img loading="lazy"
                        alt={'사진이 없습니다.'}
                           className={'project_front_img'}
                           src={frontImg}
                           width={720}
                           height={720}/>
                    <article className={'project_front_text'}>
                        <nav className={'project_title'}>
                            {pj.name}
                        </nav>
                        <hr className={'project_element_hr'}/>
                        <nav className={'project_category'}>
                            {pj.lang_id.map(c =>
                                <span key={c}>{' | ' + (langs_data.find(l => l._id.toString() === c) as LangCollection).name+' | '}</span> //이건 id에서 이름을 구하는 식으로 바꿔야함
                            )}<br/>{pj.skill_id.map(c =>
                            <span key={c}>{' | ' + (skill_data.find(s => s._id.toString() === c) as SkillCollection).name+' | '}</span> //이건 id에서 이름을 구하는 식으로 바꿔야함
                        )}
                        </nav>
                    </article>
                </Link>);
            })}
        </article>
    );
}