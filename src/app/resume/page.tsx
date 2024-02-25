import {connectDB} from "../../../Util/MongoDB";
import {WithId} from "mongodb";
import {AboutMe, Award, Growth, Introduction} from "../../../public/DBTypes";
import Image from "next/image";
import './resume.css'
import Link from "next/link";


async function Resume() {
	const client = await connectDB;
	const db = client.db('folio');
	const aboutMe = (await db.collection('AboutMe').find().toArray() as WithId<AboutMe>[])[0];
	const growth = (await db.collection('Growth').find().sort({'startDate': -1}).toArray() as WithId<Growth>[]);
	const award = (await db.collection('Award').find().sort({'date': -1}).toArray() as WithId<Award>[]);
	const introduction = (await db.collection('Introduction').find({}, {sort:'no'}).toArray()  as WithId<Introduction>[]);

	return (
		<main className={'resume'}>
			<details className={'resume-aboutMe'} open>
				<summary>About Me <div className={'resume-toggle'}><span></span><span></span></div></summary>
				<section>
					<aside>
						<Image src={aboutMe.img} alt={'ㅎㅇ'} layout="fill" objectFit={'cover'}></Image>
					</aside>
					<article className={'resume-aboutMe-info'}>
						<h1>{aboutMe.name}({aboutMe.eng_name})</h1>
						<section className={'resume-aboutMe-link'}>
							<span>Email</span>
							<span><a href={`mailto:${aboutMe.email}`}>{aboutMe.email}</a></span>
							{
								Object.entries(aboutMe.link).map((v, i)=>{
								return(
									<>
										<span>{v[0]}</span>
										<span><a href={v[1]}>{v[1]}</a></span>
									</>
								)
							})}
						</section>
						<p>{introduction.shift()?.content}</p>
					</article>
				</section>
			</details>
			<details className={'resume-growth'} open>
				<summary>History
					<div className={'resume-toggle'}><span></span><span></span></div>
				</summary>
				<section>
					<header>
						<span>시작일</span><span>종료일</span><span>기관</span><span>상세</span><span>기타</span>
					</header>
					<ul>{growth.map((v, index, array) => {
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
						)})}
					</ul>
				</section>
			</details>
			<details className={'resume-award'} open>
				<summary>Award
					<div className={'resume-toggle'}><span></span><span></span></div>
				</summary>
				<section>
					<header>
						<span>시작일</span><span>제목</span><span>기관</span><span>수상</span>
					</header>
					<ul>{award.map((v, i, a) => {
						return (
							<li key={v._id.toString()}>
								{
									v.date != null ?
										<span>{v.date?.getFullYear()}-{v.date?.getMonth()}-{v.date?.getDate()}</span> :
										<span></span>
								}
								<span>{v.title}</span>
								<span>{v.location}</span>
								<span>{v.rank}</span>
							</li>
						)})}
					</ul>
				</section>
			</details>
			<details className={'resume-introduction'} open>
				<summary>Introduction
					<div className={'resume-toggle'}><span></span><span></span></div>
				</summary>
				<section>
					{
						introduction.map((v, i) => {
							let a:JSX.Element=<blockquote></blockquote>;
							v.content.split('\r\n').map((value)=>{
								let b = <p>{value}</p>
							})
							return(
								<details key={v._id.toString()} open>
									<summary>{i+1}. {v.field}</summary>
									<blockquote>
										{v.content.split('\r\n').map((value, index)=>{
											return <p key={index}>{value}</p>
										})}
									</blockquote>
								</details>
							)
						})
					}
				</section>
			</details>
		</main>
	)
}

export default Resume;