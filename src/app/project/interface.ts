enum ContentMode{
    str,img,link
}
interface PostContent{
    mode:ContentMode,
    content:string
}
interface PostCollection {
    id:string,
    category: string[],
    skill_id: string[],
    name:string,
    contents:PostContent[]
}
export {ContentMode}
export type {PostContent, PostCollection }
