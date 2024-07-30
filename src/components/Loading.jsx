import { mergeStyles, styles } from "fhf-react";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Loading() {
	return (
		<div
			className="loading"
			style={mergeStyles(
				styles.centerContentFlex,
				styles.maxWHPers(100),
				styles.bg
			)}>
			<ThreeDots
				visible={true}
				height="80"
				width="80"
				color="rgb(182, 157, 230)"
				radius="9"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClass=""
			/>
		</div>
	);
}

export default Loading;
