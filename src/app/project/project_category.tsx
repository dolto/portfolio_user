import Link from "next/link";
// import Image from 'next/image';
import "./project.css";
import { connectDB } from "../../../Util/MongoDB";
import { LangCollection, SkillCollection } from "./interface";

interface Prop{
    langs_slecets: string[],
    skills_slects: string[],
    is_Blog: boolean
}

export default async function Project_category(props: Prop){
    const client = await connectDB;
    const db = client.db('folio');
    const langsDB = await db.collection<LangCollection>('Lang').find().toArray();
    const skillDB = await db.collection<SkillCollection>('Skill').find().toArray();
    const langs_slecets : string[] = props.langs_slecets;
    const skills_slects : string[] = props.skills_slects;
    const langs = langs_slecets.length == 0 ? langsDB :
        langsDB.filter(
        db => langs_slecets.includes(db._id.toString())
    );
    const skills = skills_slects.length == 0 ? skillDB :
        skillDB.filter(
        db => skills_slects.includes(db._id.toString())
    );
    return(
      <article className={"project_category_selecter"}>
          <i className="fas fa-duotone fa-circle-arrow-left fa-3x"></i>
          <nav className={'project_langs'}>
              {langsDB.map(lang =>{
                  return( <Link href={`project?is_blog=${!props.is_Blog}&langs_slecets=${JSON.stringify(
                      langs_slecets.length == langsDB.length ?
                          [lang._id.toString()] : langs_slecets.includes(lang._id.toString()) ?
                              langs_slecets.filter(s => !(lang._id.toString() == s)) : langs_slecets.concat(lang._id.toString())
                  )}&skills_slects=${JSON.stringify(skills_slects)}`} key={lang._id.toString()}>
                      {langs_slecets.includes(lang._id.toString())?
                          <nav className={'project_category_icon project_icon_selected'}>
                            <img
                                loading={'lazy'}
                                className={'project_category_icon_img'}
                                src={lang.img}
                                alt={''}
                                width={300}
                                height={300}/>
                          </nav>:
                          <nav className={'project_category_icon'}>
                              <img
                                  loading={'lazy'}
                                  className={'project_category_icon_img'}
                                     src={lang.img}
                                     alt={''}
                                     width={300}
                                     height={300}/>
                          </nav>}
                  </Link>)})
              }
          </nav>
          <i className="fas fa-duotone fa-circle-arrow-right fa-3x"></i>
          <i className="fas fa-duotone fa-circle-arrow-left fa-3x"></i>
          <nav className={'project_skills'}>
              {skillDB.map(skill =>
                  <Link href={`project?is_blog=${!props.is_Blog}&langs_slecets=${JSON.stringify(langs_slecets)}&skills_slects=${JSON.stringify(
                      skills_slects.length == skillDB.length ?
                          [skill._id.toString()] : skills_slects.includes(skill._id.toString()) ? 
                              skills_slects.filter(s => !(skill._id.toString() == s)) : skills_slects.concat(skill._id.toString())
                  )}`} key={skill._id.toString()}>
                      {skills_slects.includes(skill._id.toString())?
                          <nav className={'project_category_icon project_icon_selected'}>
                              <img
                                  loading={'lazy'}
                                  className={'project_category_icon_img'}
                                  src={skill.img}
                                  alt={''}
                                  width={300}
                                  height={300}/>
                          </nav>:
                          <nav className={'project_category_icon'}>
                              <img
                                  loading={'lazy'}
                                  className={'project_category_icon_img'}
                                     src={skill.img}
                                     alt={''}
                                     width={300}
                                     height={300}/>
                          </nav>}
                  </Link>)}
          </nav>
          <i className="fas fa-duotone fa-circle-arrow-right fa-3x"></i>
      </article>
    );
}