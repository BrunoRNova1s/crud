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
    const list = this.state.list.filter(u => u.id !== user.id);
    list.unshift(user);
    return list;
  }

  updateField(event) {
    //clonar o utilizador - clonar objeto, alterar -
    //depois utilizar o setState para definir um novo estado
    const user = { ...this.state.user };
    //valor que está dentro do campo input
    //[] - está a utilizar a notação string e não "."
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={e => this.updateField(e)}
                placeholder="Digite o e-mail..."
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content">
              <button className="btn btn-primary" 
                onClick={e => this.save(e)}
              >
                Guardar
              </button>

              <button
                className="btn btn-secondary ml-2"
                onClick={e => this.clear(e)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
      </Main>
    )
  }
}
