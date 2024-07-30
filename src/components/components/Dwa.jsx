import React from "react";
import { useFirestore } from "../../contexts/FirestoreContext";
import CreateOne from "../CreateOne";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
} from "@chakra-ui/react";

function Dwa() {
	const { pageName, displayArrayDwa } = useFirestore();

	return (
		<>
			<div className="table-div">
				<h1>maw3ed dwa of {pageName}</h1>
				<TableContainer>
					<Table className="tableStylech" border={2}>
						<Thead>
							<Tr borderColor={"red"}>
								<Th>Name</Th>
								<Th>Type</Th>
								<Th>Elkmiya</Th>
								<Th>Date start</Th>
								<Th>Date fin</Th>
							</Tr>
						</Thead>
						<Tbody>
							{Object.keys(displayArrayDwa).map((key) => (
								<DisplayComp key={key} obj={displayArrayDwa[key]} />
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</div>
			<CreateOne type={"dwa"} />
		</>
	);
}

const DisplayComp = ({ obj }) => {
	return (
		<Tr>
			<Td>{obj.dwaName}</Td>
			<Td>{obj.dwaType}</Td>
			<Td>{obj.dwaElkmiya}</Td>
			<Td>{obj.dwaDateStart}</Td>
			<Td>{obj.dwaDateFin}</Td>
		</Tr>
	);
};

export default Dwa;
