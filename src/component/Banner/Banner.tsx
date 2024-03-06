'use client'
import "./banner.css"
import React, {useEffect, useState} from "react";

enum Movement {
	LEFT,
	RIGHT
}
type BannerProps ={
	width:string;
	height:string;
	children:React.ReactNode;
}

function Banner({width, height, children} : BannerProps){
	const childArray = React.Children.toArray(children);
	const childCount = childArray.length - 1;
	const [index, setIndex] = useState(0);
	useEffect(() => {
		let container = document.querySelector(".banner-container") as HTMLElement;

		let viewPoint = document.querySelectorAll(".banner-view-point");
		viewPoint.forEach((v)=>{
			v.setAttribute('data-active', 'none');
		})
		viewPoint[index].setAttribute('data-active', 'active')
		container.style.transform = `translateX(-${index}00%)`;
	});

	function bannerSlide(e:React.MouseEvent<HTMLElement>, length:number) {
		const target = e.target as HTMLElement;
		const currentTarget = e.currentTarget;
		const container = currentTarget.querySelector(".banner-container") as HTMLElement;
		let direction = parseInt(target.getAttribute('data-movement') as string);

		if(target.hasAttribute('data-movement')){
			if (direction == Movement.LEFT) {
				if(index == 0){setIndex(length);}
				else {setIndex(index-1);}
			} else if(direction == Movement.RIGHT){
				if(index == length){setIndex(0);}
				else {setIndex(index+1);}
			}
		} else if(target.hasAttribute('data-viewpoint')){
			let idx = parseInt(target.getAttribute('data-viewpoint') as string)
			setIndex(idx);
		}


	}

	return (
		<div className="banner-monitor" style={{width:width, height:height}}
				 onClick={e=>bannerSlide(e, childCount)}>
			<section className="banner-container" data-view={index}>
				{children}
			</section>

			<aside>
				<button className="banner-side banner-move-left" data-movement={Movement.LEFT}></button>
				<button className="banner-side banner-move-right" data-movement={Movement.RIGHT}></button>
			</aside>

			<nav className="banner-bottom">
				{
					childArray.map((value, index)=>{
						return (
							<button key={index} className="banner-view-point" data-viewpoint={index} data-active={'none'}></button>
						)
					})
				}
			</nav>
		</div>
	)
}

type InnerProps = {
	children:React.ReactNode;
}
function BannerList({children}:InnerProps) {
	useEffect(() => {
		const item = document.querySelector('.banner-items') as HTMLElement;
		const container = item.parentElement as HTMLElement;
	}, []);

	return (
		<article className={"banner-items"}
				onClick={(e)=>{
					const parent = e.currentTarget.parentElement as HTMLElement;
					// console.log(e.movementX)
				}}
				onMouseDown={e => {

				}}
				onMouseMove={e=>{
					// console.log(e.movementX)
				}}
				onMouseUp={e=>{

				}}
		>
			{children}
		</article>
	)
}


export {Banner, BannerList};
