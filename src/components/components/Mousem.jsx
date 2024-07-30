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

function Mousem() {
	const { pageName, displayArrayMousem } = useFirestore();
	console.log(Object.keys(displayArrayMousem));
	return (
		<>
			<div className="table-div">
				<h1>maw3ed mousem of {pageName}</h1>
				<TableContainer>
					<Table border={2} variant="striped" colorScheme="rgb(182, 157, 230)">
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Num</Th>
								<Th>Count</Th>
								<Th>Start</Th>
								<Th>Fin</Th>
								<Th>Prix</Th>
							</Tr>
						</Thead>
						<Tbody>
							{Object.keys(displayArrayMousem).map((key) => (
								<DisplayComp key={key} obj={displayArrayMousem[key]} />
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</div>
			<CreateOne type={"mousem"} />
		</>
	);
}

const DisplayComp = ({ obj }) => {
	return (
		<Tr>
			<Td>{obj.mousemName}</Td>
			<Td>{obj.mousemNum}</Td>
			<Td>{obj.mousemCount}</Td>
			<Td>{obj.mousemStart}</Td>
			<Td>{obj.mousemFin}</Td>
			<Td>{obj.mousemPrix}</Td>
		</Tr>
	);
};

export default Mousem;
