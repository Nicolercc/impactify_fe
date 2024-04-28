import { useEffect, useState } from "react";

const VoterTools = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const vitStyles = document.createElement("link");
		vitStyles.rel = "stylesheet";
		vitStyles.type = "text/css";
		vitStyles.href = "https://votinginfotool.org/css/compiled/vit.css";
		document.head.appendChild(vitStyles);

		const script = document.createElement("script");
		script.src = "https://votinginfotool.org/js/compiled/app.js";
		script.onload = () => {
			const config = {
				logo: { type: "default" },
				"official-only": true,
			};

			const loadVIT = () => {
				if (typeof vit !== "undefined" && document.getElementById("_vit")) {
					vit.core.init("_vit", config);
					setIsLoaded(true); // Set isLoaded to true when the script is loaded and the widget is initialized
				} else {
					setTimeout(loadVIT, 500);
				}
			};

			loadVIT();
		};

		document.body.appendChild(script);

		return () => {
			document.head.removeChild(vitStyles);
		};
	}, []);

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return <div id="vit-size-container" className="vit-size-container"></div>;
};

export default VoterTools;
