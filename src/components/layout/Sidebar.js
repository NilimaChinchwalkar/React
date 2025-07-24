import React from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link className="active" to="/">
        <FontAwesomeIcon icon={faTachometerAlt} className="me-2" /> Dashboard
      </Link>
      <Link to="/recipe">
        <FontAwesomeIcon icon={faUtensils} className="me-2" />
        Recipe
      </Link>
      <Link to="/contact">Contact</Link>
      <Link to="/about">About</Link>
    </div>
  );
};

export default Sidebar;
