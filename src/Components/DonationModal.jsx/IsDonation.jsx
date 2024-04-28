import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";

function Is_donation({ isDonation, setIsDonation, handleStripeId, stripeId }) {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		if (!stripeId) {
			setIsDonation(false);
		}
	};

	const redirectToStripe = () => {
		navigate("/discover/create-event/donation");
		handleClose();
	};

	const handleChange = (event) => {
		setIsDonation(event.target.checked);
		setShow(event.target.checked);
	};

	// const handleStripeId = (event) => {
	//     setStripeId(event.target.value)

	// }

	return (
		<>
			<Form.Group className="mb-3">
				<Form.Label>Seeking donations?</Form.Label>
				<Form.Check
					type="checkbox"
					checked={isDonation}
					label="Yes, I am."
					onChange={handleChange}
					name="is_donation"
				/>
			</Form.Group>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Do you have a Stripe ID?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="strip_id">
							<Form.Label>Stripe Id</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter your Strip_Id"
								autoFocus
								onChange={handleStripeId}
							/>
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="number"
								placeholder="Amount your seeking"
								autoFocus
								onChange={handleStripeId}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
					<Button variant="info" onClick={redirectToStripe}>
						Create a Stripe ID
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Is_donation;
