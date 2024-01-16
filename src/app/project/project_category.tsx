import Link from "next/link";
import Image from 'next/image';
import "./project.css";

interface Prop{
    searchParams: {
        langs_slecets: string[],
        skills_slects: string[]
    }
}

export default async function Project_category(props: Prop){
    const langsDB: [string, string][] = [
        ['Java', ''],
        ['Kotlin', ''],
        ['Rust', ''],
    ]; //MongoDB에서 DB가져올 것 일단은 임시
    const skillsDB: [string, string][] = [
        ['Spring', ''],
        ['Spring Boot', ''],
        ['Bevy', ''],
    ]; //MongoDB에서 DB가져올 것 일단은 임시
    const langs_slecets : string[] = props.searchParams.langs_slecets;
    const skills_slects : string[] = props.searchParams.skills_slects;
    const langs: [string,string][] = langs_slecets.length == 0 ? langsDB :
        langsDB.filter(
        db => langs_slecets.includes(db[0])
    );
    const skills: [string,string][] = skills_slects.length == 0 ? skillsDB :
        skillsDB.filter(
        db => skills_slects.includes(db[0])
    );
    console.log(props)
    return(
      <article className={"project_category_selecter"}>
          <i className="fas fa-duotone fa-circle-arrow-left fa-3x"></i>
          <nav className={'project_langs'}>
              {langsDB.map(lang =>{
                  console.log(langs_slecets.includes(lang[0]));
                  console.log(lang[0]);
                  return( <Link href={`project?langs_slecets=${JSON.stringify(
                      langs_slecets.length == langsDB.length ?
                          [lang[0]] : langs_slecets.includes(lang[0]) ?
                              langs_slecets.filter(s => !(lang[0] == s)) : langs_slecets.concat(lang[0])
                  )}&skills_slects=${JSON.stringify(skills_slects)}`} key={lang[0]}>
                      {langs_slecets.includes(lang[0])?
                          <nav className={'project_category_icon project_icon_selected'}>
                            <Image
                                className={'project_category_icon_img'}
                                src={lang[1]}
                                alt={''}
                                width={300}
                                height={300}/>
                          </nav>:
                          <nav className={'project_category_icon'}>
                              <Image className={'project_category_icon_img'}
                                     src={lang[1]}
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
              {skillsDB.map(skill =>
                  <Link href={`project?langs_slecets=${JSON.stringify(langs_slecets)}&skills_slects=${JSON.stringify(
                      skills_slects.length == skillsDB.length ?
                          [skill[0]] : skills_slects.includes(skill[0]) ? 
                              skills_slects.filter(s => !(skill[0] == s)) : skills_slects.concat(skill[0])
                  )}`} key={skill[0]}>
                      {skills_slects.includes(skill[0])?
                          <nav className={'project_category_icon project_icon_selected'}>
                              <Image
                                  className={'project_category_icon_img'}
                                  src={skill[1]}
                                  alt={''}
                                  width={300}
                                  height={300}/>
                          </nav>:
                          <nav className={'project_category_icon'}>
                              <Image className={'project_category_icon_img'}
                                     src={skill[1]}
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