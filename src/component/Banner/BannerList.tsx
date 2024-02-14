type InnerProps = {
	value:any,
	index:number
}

export default function BannerList(props:InnerProps) {
	return (
		<figure className={"banner-items"} data-key={props.index}>
			{props.value}
		</figure>
	)
}