import React, {Component} from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'user',
    title: 'Utilizadores',
    subtitle: 'Registo de Utilizadores, Incluir, Listar, Alterar e Excluir'
}

export default class UserCrud extends Component {
    render() {
        return (
            <Main {...headerProps}>
                Registo de Utilizador
            </Main>
        )
    }   
}