import React from "react";
import { useFirestore } from "../../contexts/FirestoreContext";
import CreateOne from "../CreateOne";

function Dwa() {
	const { pageName, displayArrayDwa } = useFirestore();

	return (
		<div className="table-div">
			<h1>maw3ed dwa of {pageName}</h1>
			<table border={1}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Type</th>
						<th>Elkmiya</th>
						<th>Date start</th>
						<th>Date fin</th>
					</tr>
				</thead>
				<tbody>
					{Object.keys(displayArrayDwa).map((key) => (
						<DisplayComp key={key} obj={displayArrayDwa[key]} />
					))}
				</tbody>
			</table>
			<CreateOne type={"dwa"} />
		</div>
	);
}

const DisplayComp = ({ obj }) => {
	return (
		<tr>
			<td>{obj.dwaName}</td>
			<td>{obj.dwaType}</td>
			<td>{obj.dwaElkmiya}</td>
			<td>{obj.dwaDateStart}</td>
			<td>{obj.dwaDateFin}</td>
		</tr>
	);
};

export default Dwa;
