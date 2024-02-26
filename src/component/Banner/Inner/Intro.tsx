import './Inner.css'
import {connectDB} from "../../../../Util/MongoDB";
import {Banner, BannerList} from "@/component/Banner/Banner";
import Image from "next/image";
import {ObjectId, WithId} from "mongodb";
import Link from "next/link";
import {AboutMe, Award, Growth, Introduction, Lang, PostData, Skill} from "../../../../public/DBTypes";

export default async function Intro() {
	const client = await connectDB;
	const db = client.db('folio');
	const aboutMe = (await db.collection('AboutMe').find().toArray() as WithId<AboutMe>[])[0];
	const introduction = (await db.collection('Introduction').find({}, {sort:'no'}).toArray()  as WithId<Introduction>[])[0];
	const growth = (await db.collection('Growth').find().sort({'startDate':-1}).toArray() as WithId<Growth>[]);
	const award = (await db.collection('Award').find().sort({'date':-1}).toArray() as WithId<Award>[]);
	const recentPjt = (
		await db.collection('PostData')
			.findOne({}, {sort: {'write_day': -1}}) as WithId<PostData>
	);
	const skillId = recentPjt.skill_id?.map(value => { return new ObjectId(value);})
	const langId = recentPjt.lang_id?.map(value => { return new ObjectId(value);})
	const recentSkill= (
		await db.collection('Skill').find({_id: {$in:skillId}}).toArray() as WithId<Skill>[]
	);
	const recentLang = (
		await db.collection('Lang').find({_id:{$in:langId}}).toArray() as WithId<Lang>[]
	)

	return (
		<section className="banner">
			<Banner width={'75%'} height={'30rem'}>
				<BannerList>
					<aside>
						<Image src={aboutMe.img} alt={'none'} layout="fill"  objectFit={'cover'}/>
						<div className={'tags'}> {
							aboutMe.tag?.map((v)=>{
								return <mark key={v} className={'tag-items'}>{v}</mark>
							})}
						</div>
					</aside>
					<article className={'intro-info'}>
						<h1>Introduction</h1>
						<h2>{aboutMe.name}({aboutMe.eng_name})</h2>
						<p className={'intro-greet'}>{introduction.content}</p>
						<div className={'intro-details'}>
							<span>Email : <a href={`mailto:${aboutMe.email}`}>{aboutMe.email}</a></span>
							<Link className={'intro-link'} href={'/resume'}>Resume</Link>
						</div>
					</article>
				</BannerList>
				<BannerList>
					<h2>History</h2>
					<ul className={'growth'}>
						<li><span>시작일</span><span>종료일</span><span>기관</span><span>상세</span><span>기타</span></li>
						{
							growth.map((v, index, array) => {
								return (
									<li key={v._id.toString()}>
										{
											v.startDate != null ?
												<span>{v.startDate?.getFullYear()}-{v.startDate?.getMonth() + 1}</span>:
												<span></span>
										}
										{
											v.endDate != null ?
												<span>{v.endDate?.getFullYear()}-{v.endDate?.getMonth() + 1}</span>:
												<span>진행중</span>
										}
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
										<span>{v.date?.getFullYear()}-{v.date?.getMonth()}-{v.date?.getDate()}</span>
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
					<figure className={'recent'}>
						<aside>
							<div>
								<Image src={recentPjt.thumbnail} alt={'준비중'} layout={'fill'} objectFit={'cover'}></Image>
							</div>
							<h3>
								{recentPjt.name}
							</h3>
						</aside>
						<figcaption className={'recent-details'}>
							<h3>{recentPjt.name}</h3>
							<section>
								<h4>Languages</h4>
								<div className={'recent-icons recent-langs'}>{
									recentLang?.map((v) => {
										return (
											<span key={v._id.toString()} className={'recent-item'}>
											<Image src={v.img} alt={v.name} layout={'fill'} objectFit={'cover'}></Image>
										</span>
										)
									})}
								</div>
							</section>
							<section>
								<h4>Skills</h4>
								<div className={'recent-icons recent-skills'}> {
									recentSkill?.map((v) => {
										return (
											<span key={v._id.toString()} className={'recent-item'}>
											<Image src={v.img} alt={v.name} layout={'fill'} objectFit={'cover'}
												   title={v.name}></Image>
										</span>
										)
									})}
								</div>
							</section>
							<section className={'recent-etc'}>
								<Link className={'intro-link'} href={`/?project_id=${recentPjt._id.toString()}`}>Preview</Link>
							</section>
						</figcaption>
					</figure>
				</BannerList>
			</Banner>
		</section>
	)
}