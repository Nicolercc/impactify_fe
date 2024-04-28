/* eslint-disable no-unused-vars */
import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

function FilterBtn({ userSelectedState }) {
  return (
    <DropdownButton id="" title="filter by">
      <Dropdown.Item href="#" onClick={() => userSelectedState("Nearby")}>
        Nearby
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => userSelectedState("Online")}>
        Online
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => userSelectedState("All Events")}>
        All Events
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => userSelectedState("News")}>
        News
      </Dropdown.Item>
      <Dropdown.Item href="#" onClick={() => userSelectedState("Donations")}>
        Donations
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default FilterBtn;
