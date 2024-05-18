import React from "react";
import { useFirestore } from "../../contexts/FirestoreContext";
import CreateOne from "../CreateOne";

function Mousem() {
	const { pageName, displayArrayMousem } = useFirestore();
	return (
		<div className="table-div">
			<h1>maw3ed mousem of {pageName}</h1>
			<table border={1}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Num</th>
						<th>Count</th>
						<th>Start</th>
						<th>Fin</th>
						<th>Prix</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(displayArrayMousem).map((key) => (
						<DisplayComp key={key} obj={displayArrayMousem[key]} />
					))}
				</tbody>
			</table>
			<CreateOne type={"mousem"} />
		</div>
	);
}

const DisplayComp = ({ obj }) => {
	return (
		<tr>
			<td>{obj.mousemName}</td>
			<td>{obj.mousemNum}</td>
			<td>{obj.mousemCount}</td>
			<td>{obj.mousemStart}</td>
			<td>{obj.mousemFin}</td>
			<td>{obj.mousemPrix}</td>
		</tr>
	);
};

export default Mousem;
