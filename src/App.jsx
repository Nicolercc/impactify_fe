import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MaintenancePage from "./Components/MaintenancePage/MaintenancePage";
import "./App.css";

function App() {
	// Show maintenance page instead of trying to fetch from backend
	return <MaintenancePage />;
}

export default App;
