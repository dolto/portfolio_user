import {ObjectId} from "mongodb";

type AboutMe={
	_id:ObjectId;
	img:string;
	name:string;
	eng_name:string;
	phone:string;
	email:string;
	link: { [key: string]: string };
	tag:string[];
	_class:string;
}
type Introduction = {
	_id:ObjectId;
	no:number;
	field:string;
	content:string;
	_class:string;
}
type Growth = {
	_id:ObjectId;
	startDate:Date;
	endDate:Date;
	location:string;
	details:string;
	etc:string;
	_class:string;
}
type Award = {
	_id:ObjectId;
	date:Date;
	title:string;
	location:string;
	rank:string;
	_class:string;
}

export type {AboutMe, Growth, Introduction, Award}