import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import "./ProofHero.css";
import socialProof from "../../assets/proofhero.png";
import ImpactVid from "../../assets/ImpactVid.mp4";

const ProofHero = () => {
	const [showVideo, setShowVideo] = useState(false);
	const playerRef = useRef(null);

	const handleButtonClick = () => {
		setShowVideo(!showVideo);
	};

	return (
		<div className="">
			<div className="bg-light">
				<span className="m-3 ">
					<h4 className="display-6 d-flex justify-content-center m-4 ">
						How Impactify works
					</h4>

					<div style={{ paddingLeft: "15%", paddingRight: "15%" }}>
						<p
							className="d-flex justify-content-center fs-5 mb-4"
							style={{ paddingLeft: "5%", paddingRight: "5%" }}
						>
							Discover a world of meaningful engagement with Impactify. Here's
							how it works: Dive into a curated collection of news articles to
							stay informed about pressing issues. Then, take action by sharing,
							attending, creating, or donating directly through our platform.
							Impactify is your trusted resource for fin ding impactful ways to
							get involved and make a difference. Join us in shaping a better
							tomorrow, one step at a time.
						</p>
						<div className="bg-text mb-3 fs-6" style={{}}>
							<p>
								In 2023, we witnessed a significant shift in charitable
								contributions, totaling $319.04 billion, marking a notable
								decrease of 6.4% compared to 2021. However, the essence of
								generosity and volunteerism perseveres, as approximately 63
								million individuals continue to seek avenues for making a
								positive impact.
							</p>
							<p>
								Amidst this backdrop, our platform aims to cut through the
								clutter, connecting you with local causes and events that align
								with your desire for change. We simplify the journey from mere
								intention to tangible action, providing a centralized hub for
								both hands-on volunteering and impactful micro-donations.
								Together, these individual efforts culminate in supporting
								larger-scale initiatives.
							</p>
							<p>
								Let us unite to breathe new life into the spirit of community
								involvement and reignite the flame of altruism, even in the face
								of adversity.
							</p>
						</div>
					</div>

					<span
						className="d-flex justify-content-center "
						style={{}}
						onClick={() => setShowVideo(!showVideo)}
					>
						{showVideo ? (
							<div className="d-flex justify-content-center mt-4">
								<ReactPlayer
									ref={playerRef}
									url={ImpactVid}
									playing={showVideo}
									controls
									width="80%"
									height="100%"
								/>
							</div>
						) : (
							<img
								src={socialProof}
								alt="Social Proof"
								className="mt-3"
								style={{
									width: "80%",
									paddingLeft: "5% ",
									paddingRight: "5% ",
								}}
							/>
						)}
					</span>
				</span>
			</div>
		</div>
	);
};

export default ProofHero;
