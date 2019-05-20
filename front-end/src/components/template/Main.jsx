import "./Main.css";
import React from "react";
import Header from "./Header";

/* <Header {...props} /> 
as propriedades definidas no Main 
são propagadas no header */
export default props => (
  <React.Fragment>
    <Header {...props} />
    <main className="content">conteúdo</main>
  </React.Fragment>
);