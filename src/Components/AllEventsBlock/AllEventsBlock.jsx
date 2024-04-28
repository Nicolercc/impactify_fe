import React from "react";
import MainContent from "../MainContent";
import Categories from "../CategoriesSection/CategoriesSection";

function AllEventsBlock({backendEvents}) {
	// console.log("these are all events block", backendEvents)
	return (
		<div className="mt-5">
			<Categories />
			<MainContent backendEvents={backendEvents}/>
		</div>
	);
}

export default AllEventsBlock;
