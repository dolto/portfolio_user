'use client'
import "./banner.css"
import React, {useEffect, useState} from "react";
import {now} from "mongodb/src/utils";

enum Movement {
	LEFT,
	RIGHT
}

function Banner({children} : {children:React.ReactNode}){
	const childArray = React.Children.toArray(children);
	const childCount = childArray.length - 1;
	const [index, setIndex] = useState(0);
	useEffect(() => {
		let container = document.querySelector(".banner-container") as HTMLElement;
		container.style.transform = `translateX(-${index}00%)`;
		let viewPoint = document.querySelectorAll(".banner-view-point");
		viewPoint.forEach((v)=>{
			v.setAttribute('data-active', 'none');
		})
		viewPoint[index].setAttribute('data-active', 'active')
	});

	function bannerSlide(e:React.MouseEvent<HTMLElement>, length:number) {
		const target = e.target as HTMLElement;
		const currentTarget = e.currentTarget;
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
		<section className="banner-monitor"
				 onClick={e=>bannerSlide(e, childCount)}>
			<article className="banner-container" data-view={index}>
				{children}
			</article>

			<button className="banner-side banner-move-left" data-movement={Movement.LEFT}></button>
			<button className="banner-side banner-move-right" data-movement={Movement.RIGHT}></button>

			<div className="banner-bottom">
				{
					childArray.map((value, index)=>{
						return (
							<button key={index} className="banner-view-point" data-viewpoint={index} data-active={'none'}></button>
						)
					})
				}
			</div>
		</section>
	)
}

export default Banner