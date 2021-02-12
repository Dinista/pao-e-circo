import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./styles.css";

const Landing: React.FC = () => {
  return (
    <>
      <Header />

      <div>teste</div>
      <button>
        <Link to="/signup"> clica ae</Link>
      </button>
    </>
  );
};

export default Landing;
