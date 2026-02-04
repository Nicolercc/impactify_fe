import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import VoterTools from "./VoterTools.jsx";
import CivicInfo from "./CivicInfo";

const VoterModal = () => {
	const [userResponse, setUserResponse] = useState(null);
	const [show, setShow] = useState(true);

	const handleClose = () => setShow(false);

	const handleRegistered = () => {
		setUserResponse("yes");
		handleClose();
	};

	const handleNeedRegister = () => {
		setUserResponse("no");
		handleClose();
	};

	return (
		<>
			<Modal
				show={show}
				onHide={handleClose}
				size="lg"
				aria-labelledby="voter-modal-title"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="voter-modal-title">
						Make your next election easier
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className="mb-2">
						Are you already registered to vote at your current address?
					</p>
					<p className="text-muted mb-0">
						Choose an option below and we&apos;ll either take you to a trusted
						tool to register, or help you look up your representatives and
						polling details.
					</p>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-center gap-3">
					<Button
						variant="outline-primary"
						onClick={handleNeedRegister}
					>
						I need to register
					</Button>
					<Button
						variant="primary"
						onClick={handleRegistered}
					>
						I&apos;m already registered
					</Button>
				</Modal.Footer>
			</Modal>

			{userResponse === "yes" && <CivicInfo />}
			{userResponse === "no" && <VoterTools />}
		</>
	);
};

export default VoterModal;
