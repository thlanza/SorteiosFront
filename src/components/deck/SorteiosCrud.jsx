import React, { Component } from 'react';
import Main from '../template/Main'
import axios from 'axios'


const headerProps = {
    icon: 'book',
    title: 'Sorteios',
    subtitle: 'Cadastro de sorteios: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'https://backend-sorteios.herokuapp.com/sorteios'
const initialState = {
    sorteios: { produto: '', detalhamento: '', usuario: '', localidade: '', regras: '', data: '' },
    list: []
}


export default class SorteiosCrud extends Component {

    state = {...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
            console.log("list", this.state.list)
        })
       
    }

    clear() {
        this.setState({ sorteios: initialState.sorteios })
    }


    getUpdatedList(sorteios) {
        const list = this.state.list.filter(d => d.id !== sorteios.id)
        if(sorteios) list.unshift(sorteios)
        return list
    }

    updateField(event) {
        const sorteio = { ...this.state.sorteio }
        sorteio[event.target.name] = event.target.value
        this.setState({ sorteio })
    }

    load(sorteios) {
        this.setState({ sorteios })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto</th>
                        <th>Detalhamento</th>
                        <th>Usuário</th>
                        <th>Localidade</th>
                        <th>Regras</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>        
        )
    }

    renderRows() {
       
        return this.state.list.map(sorteio => {
            return (
                <tr key={sorteio.id}>
                    <td>{sorteio.id}</td>
                    <td>{sorteio.produto}</td>
                    <td>{sorteio.detalhamento}</td>
                    <td>{sorteio.usuário}</td>
                    <td>{sorteio.localidade}</td>
                    <td>{sorteio.regras}</td>
                    <td>{sorteio.data_sorteio}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderTable()}
            </Main>
        )
    }
}



