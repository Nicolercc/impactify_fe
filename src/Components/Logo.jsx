import React from "react";
import hand from "../assets/hand.png";
import "./Logo.css";

const Logo = () => {
	return (
		<div className="impactify-parent">
			<div className="impactify">
				<img
					className="hand-icon"
					loading="lazy"
					alt=""
					src={hand}
					style={{ marginRight: "-20px", left: "-35px" }}
				/>
				<span className="impactify-txt">
					<span>Imp</span>
					<span className="act">act</span>
					<span>ify</span>
				</span>
			</div>
		</div>
	);
};

export default Logo;
