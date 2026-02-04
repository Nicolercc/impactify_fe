import { useEffect, useState } from "react";

const VoterTools = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const vitStyles = document.createElement("link");
		vitStyles.rel = "stylesheet";
		vitStyles.type = "text/css";
		vitStyles.href = "https://votinginfotool.org/css/compiled/vit.css";
		document.head.appendChild(vitStyles);

		const script = document.createElement("script");
		script.src = "https://votinginfotool.org/js/compiled/app.js";
		script.async = true;
		script.onload = () => {
			const config = {
				logo: { type: "default" },
				"official-only": true,
			};

			const loadVIT = () => {
				// global vit is provided by the external script
				if (typeof vit !== "undefined" && document.getElementById("_vit")) {
					vit.core.init("_vit", config);
					setIsLoaded(true);
				} else {
					setTimeout(loadVIT, 500);
				}
			};

			loadVIT();
		};
		script.onerror = () => {
			setError("We couldn’t load the official registration tool right now.");
		};

		document.body.appendChild(script);

		return () => {
			document.head.removeChild(vitStyles);
			if (script.parentNode) {
				script.parentNode.removeChild(script);
			}
		};
	}, []);

	const Header = () => (
		<div className="voter-tools-header">
			<h2>Register to vote</h2>
			<p>
				Use a trusted tool to check your status, see deadlines, and get registered
				in your state.
			</p>
			<div className="voter-tools-actions">
				<a
					href="https://www.vote.org/register-to-vote/"
					target="_blank"
					rel="noopener noreferrer"
					className="voter-tools-cta"
				>
					Open secure registration
				</a>
			</div>
		</div>
	);

	if (error) {
		return (
			<section className="voter-tools-wrapper">
				<Header />
				<div className="voter-tools-error" role="alert">
					{error}
				</div>
			</section>
		);
	}

	if (!isLoaded) {
		return (
			<section className="voter-tools-wrapper">
				<Header />
				<div className="voter-tools-loading">Loading official voter tools…</div>
			</section>
		);
	}

	return (
		<section className="voter-tools-wrapper">
			<Header />
			<div id="vit-size-container" className="vit-size-container">
				<div id="_vit" />
			</div>
		</section>
	);
};

export default VoterTools;
