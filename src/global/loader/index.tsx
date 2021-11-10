import React from "react";
import "./loader.css";
import lak from "./img/lak.png";
import lash from "./img/lash.png";
import cut from "./img/cut.png";
import kosm from "./img/kosm.png";
const Loader = () => {
  return (
    <div className="container">
      <div className="item item-1">
        <img alt="loading" src={lak} width={"50"} height={"50"} />
      </div>
      <div className="item item-2">
        <img alt="loading" src={kosm} width={"50"} height={"50"} />
      </div>
      <div className="item item-3">
        <img alt="loading" src={lash} width={"50"} height={"50"} />
      </div>
      <div className="item item-4">
        <img alt="loading" src={cut} width={"50"} height={"50"} />
      </div>
    </div>
  );
};

export default Loader;
