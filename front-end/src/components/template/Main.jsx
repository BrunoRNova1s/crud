import "./Main.css";
import React from "react";
import Header from "./Header";

/* <Header {...props} /> 
as propriedades definidas no Main 
são propagadas no header */
export default props => (
  <React.Fragment>
    <Header {...props} />
    <main className="content container-fluid">
      <div className="p-3 mt-3">
        {props.children}
      </div>
    </main>
  </React.Fragment>
);