import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import Country from './components/Country';
import CountryOne from './components/CountryOne';

const Filter = ({ show, handleShow }) => {
    return (
        <div>
            find countries: <input value={show} onChange={handleShow} />
        </div>
    )
}

const Countries = ({ countries, handleClick }) => {
    return (
        <div>
            {countries.map(country => <Country key={country.name} country={country} handleClick={handleClick} />)}
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      show: ''
    }
    console.log('constructor')
  }

  componentDidMount() {
      console.log('did mount')
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            console.log('promise fulfilled')
            this.setState({ countries: response.data })
        })
  }

  handleShow = (event) => {
      console.log(event.target.value)
      this.setState({ show: event.target.value })
  }

  handleClick = (name) => {
    console.log(name)
    this.setState({ show: name })
}

  render() {
    console.log('render')
    const countriesToShow =
        (this.state.show === '') ?
            [] :
            this.state.countries.filter(note => note.name.toLowerCase().includes(this.state.show.toLowerCase()))
    
    if (countriesToShow.length === 1) {
        return (
            <div>
              <Filter show={this.state.show} handleShow={this.handleShow} />
              <CountryOne key={countriesToShow[0].name} country={countriesToShow[0]} />
            </div>
        )
    } else if (countriesToShow.length > 10) {
        return (
            <div>
              <Filter show={this.state.show} handleShow={this.handleShow} />
              <div>
                  too many matches, specify another filter
              </div>
            </div>
        )
    }
    return (
      <div>
        <Filter show={this.state.show} handleShow={this.handleShow} />
        <Countries countries={countriesToShow} handleClick={this.handleClick} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));