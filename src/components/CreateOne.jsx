import React, { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { useFirestore } from "../contexts/FirestoreContext";
import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import { mergeStyles, styles } from "fhf-react";

const CreateOne = ({ type }) => {
	const { submitData } = useFirestore();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [errorMessage, setErrorMessage] = useState("");

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
			PRIX: "mousemPrix",
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
			setErrorMessage("All fields are required for Dwa.");

			return false;
		}
		const dateStart = new Date(data[DATE_START]);
		const dateFin = new Date(data[DATE_FIN]);
		if (dateStart > dateFin) {
			setErrorMessage("Start date must be before the end date for Dwa.");
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
			setErrorMessage("All fields are required for Mousem.");

			return false;
		}
		if (
			isNaN(data[NUM]) ||
			isNaN(data[COUNT]) ||
			isNaN(data[START]) ||
			isNaN(data[FIN]) ||
			isNaN(data[PRIX])
		) {
			setErrorMessage(
				"Num, Count, Start, Fin, and Prix must be valid numbers for Mousem."
			);
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
				<FormControl>
					<FormLabel>Name:</FormLabel>
					<Input type="text" name={NAME} />
				</FormControl>
				<FormControl>
					<FormLabel>Type:</FormLabel>
					<Input type="text" name={TYPE} />
				</FormControl>
				<FormControl>
					<FormLabel>Elkmiya:</FormLabel>
					<Input type="text" name={ELKMIYA} />
				</FormControl>
				<FormControl>
					<FormLabel>Date Start:</FormLabel>
					<Input type="date" name={DATE_START} />
				</FormControl>
				<FormControl>
					<FormLabel>Date Fin:</FormLabel>
					<Input type="date" name={DATE_FIN} />
				</FormControl>
				<Button color={"white"} bg={"rgb(182, 157, 230)"} mt={10} type="submit">
					Submit
				</Button>
			</form>
		);
	};

	const renderMousemForm = () => {
		const { NAME, NUM, COUNT, START, FIN, PRIX } = FIELD_NAMES.MOUSEM;
		return (
			<form onSubmit={(e) => handleSubmit(e, validateDataMousem)}>
				<FormControl>
					<FormLabel>Name:</FormLabel>
					<Input type="text" name={NAME} />
				</FormControl>
				<FormControl>
					<FormLabel>Num:</FormLabel>
					<Input type="text" name={NUM} />
				</FormControl>
				<FormControl>
					<FormLabel>Count:</FormLabel>
					<Input type="text" name={COUNT} />
				</FormControl>
				<FormControl>
					<FormLabel>Start:</FormLabel>
					<Input type="text" name={START} />
				</FormControl>
				<FormControl>
					<FormLabel>Fin:</FormLabel>
					<Input type="text" name={FIN} />
				</FormControl>
				<FormControl>
					<FormLabel>Prix:</FormLabel>
					<Input type="text" name={PRIX} />
				</FormControl>
				<Button color={"white"} bg={"rgb(182, 157, 230)"} mt={10} type="submit">
					Submit
				</Button>
			</form>
		);
	};

	return (
		<div
			className="form-group"
			style={mergeStyles(styles.dispFlex, { justifyContent: "center" })}>
			<Button color={"white"} bg={"rgb(182, 157, 230)"} onClick={onOpen}>
				Open Modal
			</Button>
			<Modal blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader
						color={"rgb(182, 157, 230)"}
						textTransform={"capitalize"}
						textAlign={"center"}>
						Add Row for {type}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<p style={{ color: "red" }}>{errorMessage && errorMessage}</p>
						{type === "dwa" ? renderDwaForm() : renderMousemForm()}
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
};

CreateOne.propTypes = {
	type: PropTypes.oneOf(["dwa", "mousem"]).isRequired,
};

export default CreateOne;
