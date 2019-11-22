import React, { Component } from 'react';
import paginate from 'paginate-array';
import './sorteios.css'
import 'bootstrap/dist/css/bootstrap.css';
import Main2 from '../template/Main2';

class SorteiosCrud1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sorteios: [],
      size: 5,
      page: 1,
      currPage: null
    }

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`https://backend-sorteios.herokuapp.com/sorteios`)
      .then(response => response.json())
      .then(sorteios => {
        const { page, size } = this.state;

        const currPage = paginate(sorteios, page, size);

        this.setState({
          ...this.state,
          sorteios,
          currPage
        });
      });
  }

  previousPage() {
    const { currPage, page, size, sorteios } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(sorteios, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, sorteios } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(sorteios, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  handleChange(e) {
    const { value } = e.target;
    const { sorteios, page } = this.state;

    const newSize = +value;
    const newPage = 1;
    const newCurrPage = paginate(sorteios, newPage, newSize);

    this.setState({
      ...this.state,
      size: newSize,
      page: newPage,
      currPage: newCurrPage
    });
  }

  render() {
    const { page, size, currPage } = this.state;

    return (
      <div className="background">
        <Main2 icon="book" title="Sorteios"
subtitle="Os melhores sorteios do Instagram!" ></Main2>
        {currPage &&
          <table className="table mt-4 timecard">
          <thead>
              <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Detalhamento</th>
                  <th>Usuário</th>
                  <th>Localidade</th>
                  <th>Regras</th>
                  <th>Data</th>
                  <th>Link</th>
              </tr>
          </thead>
            <tbody>
            {currPage.data.map(sorteio => <tr key={sorteio.id}>
                    <td>{sorteio.id}</td>
                    <td>{sorteio.produto}</td>
                    <td>{sorteio.detalhamento}</td>
                    <td>{sorteio.usuário}</td>
                    <td>{sorteio.localidade}</td>
                    <td>{sorteio.regras}</td>
                    <td>{sorteio.data_sorteio}</td>
                    <td><a href={`${sorteio.link}`}>Link</a></td>
                </tr>)}
          </tbody>
          </table>
        }
        <button className="btn-default" onClick={this.previousPage}>Página Anterior</button>
        <button className="btn-info" onClick={this.nextPage}>Próxima Página</button>
      </div>
    )
  }
}






export default SorteiosCrud1;