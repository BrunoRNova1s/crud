import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const headerProps = {
  icon: "user",
  title: "Utilizadores",
  subtitle: "Registo de Utilizadores, Incluir, Listar, Alterar e Excluir"
};

const baseUrl = "http://localhost:3001/users";
const initialState = {
  user: { name: "", email: "" },
  list: []
};

//Utilizar o setState para alterar o estado dos objetos
//!!0 - false
//!!1 - true

//axios[method] - é uma função, logo precisa de parametros

//unshift - coloca um determinado elemento na primeira posição do array

export default class UserCrud extends Component {
  state = { ...initialState };

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    //se o id for verdadeiro put senao post
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then(resp => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  getUpdatedList(user) {
      //como filter cria uma nova lista, não é preciso clonar a do state
      const list = this.state.list.filter(u => u.id !== user.id)
      list.unshift(user)
      return list
  }

  render() {
    return <Main {...headerProps}>Registo de Utilizador</Main>;
  }
}
