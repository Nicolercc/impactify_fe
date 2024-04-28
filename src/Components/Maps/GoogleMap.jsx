import React, { useEffect, useState } from "react";
import Directions from "./Directions";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import "./GoogleMap.css";

const GoogleMap = ({ location, lat, lng, travelMode }) => {
	const latitude = Number(lat);
	const longitude = Number(lng);

	const GoogleKey = import.meta.env.VITE_X_GOOGLE_API_KEY;
	const position = { lat: latitude, lng: longitude };

	return (
		<div
			style={{
				height: "60vh",
				width: "120%",
				maxWidth: "1200px",
				margin: "auto",
			}}
		>
			<APIProvider apiKey={GoogleKey}>
				<Map
					center={position}
					zoom={12}
					mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
				>
					<Directions
						destination={location}
						desLat={latitude}
						desLng={longitude}
						travelMode={travelMode}
					/>
				</Map>
			</APIProvider>
		</div>
	);
};

export default GoogleMap;
