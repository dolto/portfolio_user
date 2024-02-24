import './Inner.css'
import {connectDB} from "../../../../Util/MongoDB";
import {Banner, BannerList} from "@/component/Banner/Banner";
import Image from "next/image";
import {ObjectId, WithId} from "mongodb";
import Link from "next/link";
import {AboutMe, Award, Growth, Introduction} from "../../../../public/DBTypes";


export default async function Intro() {
	const client = await connectDB;
	const db = client.db('folio');
	const aboutMe = (await db.collection('AboutMe').find().toArray() as WithId<AboutMe>[])[0];
	const introduction = (await db.collection('Introduction').find({}, {sort:'no'}).toArray()  as WithId<Introduction>[])[0];
	const growth = (await db.collection('Growth').find().toArray() as WithId<Growth>[]);
	const award = (await db.collection('Award').find().toArray() as WithId<Award>[]);
	return (

		<section className="banner">
			<Banner width={'75%'} height={'30rem'}>
				<BannerList>
					<aside>
						<img src={aboutMe.img} alt={'none'}/>
						<div className={'tags'}> {
							aboutMe.tag.map((v)=>{
								return <mark key={v} className={'tag-items'}>{v}</mark>
							})}
						</div>
					</aside>

					<article className={'intro-info'}>
						<h1>Introduction</h1>
						<h2>{aboutMe.name}({aboutMe.eng_name})</h2>
						<p className={'intro-greet'}>{introduction.content}</p>
						<div className={'intro-details'}>
							<span>Email : <a href={`mailto:${aboutMe.email}`} >{aboutMe.email}</a></span>
							<Link href={'/resume'}>Resume</Link>
						</div>
					</article>
				</BannerList>
				<BannerList>
					<h2>Growth</h2>
					<ul className={'growth'}>
						<li><span>시작일</span><span>종료일</span><span>기관</span><span>상세</span><span>기타</span></li>
						{
							growth.map((v, index, array) => {
								return (
									<li key={v._id.toString()}>
										<span>{v.startDate.getFullYear()}-{v.startDate.getMonth()+1}</span>
										<span>{v.endDate.getFullYear()}-{v.endDate.getMonth()+1}</span>
										<span>{v.location}</span>
										<span>{v.details}</span>
										<span>{v.etc}</span>
									</li>
								)
							})
						}
					</ul>
					<h2>Award</h2>
					<ul className={'award'}>
						<li><span>시작일</span><span>제목</span><span>기관</span><span>수상</span></li>
						{
							award.map((v, i, a) => {
								return (
									<li key={v._id.toString()}>
										<span>{v.date.getFullYear()}-{v.date.getMonth()}-{v.date.getDate()}</span>
										<span>{v.title}</span>
										<span>{v.location}</span>
										<span>{v.rank}</span>
									</li>
								)
							})
						}
					</ul>
				</BannerList>
				<BannerList>
					<h2>Recent Project</h2>
				</BannerList>
			</Banner>
		</section>
	)
}