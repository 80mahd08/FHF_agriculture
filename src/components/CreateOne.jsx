import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useFirestore } from "../contexts/FirestoreContext";

const CreateOne = ({ type }) => {
	const { submitData } = useFirestore();

	const FIELD_NAMES = {
		DWA: {
			NAME: "dwaName",
			TYPE: "dwaType",
			ELKMIYA: "dwaElkmiya",
			DATE_START: "dwaDateStart",
			DATE_FIN: "dwaDateFin",
		},
		MOUSEM: {
			NAME: "mousemName",
			NUM: "mousemNum",
			COUNT: "mousemCount",
			START: "mousemStart",
			FIN: "mousemFin",
			PRIX: "mouemFin",
		},
	};

	const validateDataDwa = (data) => {
		const { NAME, TYPE, ELKMIYA, DATE_START, DATE_FIN } = FIELD_NAMES.DWA;
		if (
			!data[NAME] ||
			!data[TYPE] ||
			!data[ELKMIYA] ||
			!data[DATE_START] ||
			!data[DATE_FIN]
		) {
			Swal.fire({
				icon: "error",
				title: "Missing Fields",
				text: "All fields are required for Dwa.",
			});
			return false;
		}
		const dateStart = new Date(data[DATE_START]);
		const dateFin = new Date(data[DATE_FIN]);
		if (dateStart > dateFin) {
			Swal.fire({
				icon: "error",
				title: "Invalid Dates",
				text: "Start date must be before the end date for Dwa.",
			});
			return false;
		}
		return true;
	};

	const validateDataMousem = (data) => {
		const { NAME, NUM, COUNT, START, FIN, PRIX } = FIELD_NAMES.MOUSEM;
		if (
			!data[NAME] ||
			!data[NUM] ||
			!data[COUNT] ||
			!data[START] ||
			!data[FIN] ||
			!data[PRIX]
		) {
			Swal.fire({
				icon: "error",
				title: "Missing Fields",
				text: "All fields are required for Mousem.",
			});
			return false;
		}
		if (
			isNaN(data[NUM]) ||
			isNaN(data[COUNT]) ||
			isNaN(data[START]) ||
			isNaN(data[FIN]) ||
			isNaN(data[PRIX])
		) {
			Swal.fire({
				icon: "error",
				title: "Invalid Numbers",
				text: "Num, Count, Start, Fin, and Prix must be valid numbers for Mousem.",
			});
			return false;
		}
		return true;
	};

	const handleSubmit = (e, validateFn) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());
		if (validateFn(data)) {
			submitData(type, data);
			Swal.fire({
				icon: "success",
				title: "Success",
				text: "Data submitted successfully!",
			});
		}
	};

	const renderDwaForm = () => {
		const { NAME, TYPE, ELKMIYA, DATE_START, DATE_FIN } = FIELD_NAMES.DWA;
		return (
			<form onSubmit={(e) => handleSubmit(e, validateDataDwa)}>
				<table>
					<tbody>
						<tr>
							<td>Name:</td>
							<td>
								<input type="text" name={NAME} />
							</td>
						</tr>
						<tr>
							<td>Type:</td>
							<td>
								<input type="text" name={TYPE} />
							</td>
						</tr>
						<tr>
							<td>Elkmiya:</td>
							<td>
								<input type="text" name={ELKMIYA} />
							</td>
						</tr>
						<tr>
							<td>Date Start:</td>
							<td>
								<input type="date" name={DATE_START} />
							</td>
						</tr>
						<tr>
							<td>Date Fin:</td>
							<td>
								<input type="date" name={DATE_FIN} />
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<input type="submit" value="Submit" />
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		);
	};

	const renderMousemForm = () => {
		const { NAME, NUM, COUNT, START, FIN, PRIX } = FIELD_NAMES.MOUSEM;
		return (
			<form onSubmit={(e) => handleSubmit(e, validateDataMousem)}>
				<table>
					<tbody>
						<tr>
							<td>Name:</td>
							<td>
								<input type="text" name={NAME} />
							</td>
						</tr>
						<tr>
							<td>Num:</td>
							<td>
								<input type="text" name={NUM} />
							</td>
						</tr>
						<tr>
							<td>Count:</td>
							<td>
								<input type="text" name={COUNT} />
							</td>
						</tr>
						<tr>
							<td>Start:</td>
							<td>
								<input type="text" name={START} />
							</td>
						</tr>
						<tr>
							<td>Fin:</td>
							<td>
								<input type="text" name={FIN} />
							</td>
						</tr>
						<tr>
							<td>Prix:</td>
							<td>
								<input type="text" name={PRIX} />
							</td>
						</tr>
						<tr>
							<td></td>
							<td>
								<input type="submit" value="Submit" />
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		);
	};

	return (
		<div className="form-group">
			{type === "dwa" ? renderDwaForm() : renderMousemForm()}
		</div>
	);
};

CreateOne.propTypes = {
	type: PropTypes.oneOf(["dwa", "mousem"]).isRequired,
};

export default CreateOne;
