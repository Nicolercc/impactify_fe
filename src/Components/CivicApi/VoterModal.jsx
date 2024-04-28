import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import VoterTools from "./VoterTools.jsx";
import CivicInfo from "./CivicInfo";

const VoterModal = () => {
	const [userResponse, setUserResponse] = useState(null);
	const [show, setShow] = useState(true);
	const handleClose = () => setShow(false);

	const handleYes = () => {
		setUserResponse("yes");
		handleClose();
	};
	const handleNo = () => {
		setUserResponse("no");
		handleClose();
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton className="">
					<Modal.Title id="contained-modal-title-vcenter "></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4 className="d-flex justify-content-center ">
						Let's get you ready for voting season
					</h4>
					<p>
						Every vote shapes our future, so we wanna know: Are you registered
						to vote? Whether you need to register or are seeking to learn and
						connect with local officials, we've got the resources to help you
						make an impact.
					</p>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center ">
					<Button variant="secondary mx-2 " onClick={handleNo}>
						Register me
					</Button>
					<Button variant="secondary mx-2" onClick={handleYes}>
						I am registered
					</Button>
				</Modal.Footer>
			</Modal>
			{userResponse === "yes" && <CivicInfo />}
			{userResponse === "no" && <VoterTools />}
		</>
	);
};

export default VoterModal;
