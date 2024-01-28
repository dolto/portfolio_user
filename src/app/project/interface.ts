import { ObjectId } from "mongodb"

interface ProjectCollection {
    _id: ObjectId,
    lang_id: string[],
    skill_id: string[],
    name:string,
    contents:string,
    thumbnail: string
}
interface LangCollection{
    _id: ObjectId,
    name: string,
    img: string
}
interface SkillCollection extends LangCollection{
    description: string,
    level: number
}
export type {ProjectCollection, LangCollection, SkillCollection }
