import React from 'react';
import './index.css';
import Person from './components/Person';
import personService from './services/persons';

const Input = ({ text, v, oC }) => {
    return (
        <div>
            {text} <input value={v} onChange={oC} />
        </div>
    )
}

const Button = ({ text }) => {
    return (
        <div>
            <button type="submit">{text}</button>
        </div>
    )
}

const Filter = ({ show, handleShow }) => {
    return (
        <Input text='rajaa näytettäviä:' v={show} oC={handleShow} />
    )
}

const NewPersonForm = ({ newName, newNumber, addPerson, handleNameChange, handleNumberChange, text }) => {
    return (
        <form onSubmit={addPerson}>
            <Input text='nimi:' v={newName} oC={handleNameChange} />
            <Input text='numero:' v={newNumber} oC={handleNumberChange} />
            <Button text={text} />
        </form>
    )
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="error">
            {message}
        </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      show: '',
      newName: 'uusi henkilö...',
      newNumber: 'uusi numero...',
      notice: null
    }
    console.log('constructor')
  }

  componentDidMount() {
      console.log('did mount')
      personService
        .getAll()
        .then(persons => {
            console.log('promise fulfilled')
            this.setState({persons})
        })
  }

  addPerson = (event) => {
      event.preventDefault()

      const compare = this.state.persons.map(person => person.name)

      if (compare.includes(this.state.newName)) {
            if (window.confirm(this.state.newName+' on jo luettelossa. Korvataanko vanha numero uudella?')) {
                const personUpdate = this.state.persons.find(p => p.name === this.state.newName)
                const changedPerson = { ...personUpdate, number: this.state.newNumber }

                personService
                    .update(personUpdate.id, changedPerson)
                    .then(updatePerson => {
                        this.setState({
                            persons: this.state.persons.map(person => person.id !== personUpdate.id ? person : updatePerson),
                            newName: '',
                            newNumber: '',
                            notice: `henkilön `+updatePerson.name+` numero vaihdettiin`
                        })
                        setTimeout(() => {
                            this.setState({notice: null})
                        }, 2000)
                    })
                    .catch(error => {
                        console.log(error)
                        const nameObject = {
                            name: this.state.newName,
                            number: this.state.newNumber
                        }
                        const personsOther = this.state.persons.filter(person => person.name !== this.state.newName)
                        personService
                            .create(nameObject)
                            .then(newPerson => {
                                this.setState({
                                    persons: personsOther.concat(newPerson),
                                    newName: '',
                                    newNumber: '',
                                    notice: `lisättiin uudelleen `+newPerson.name
                                }) 
                            setTimeout(() => {
                                this.setState({notice: null})
                            }, 2000)
                        })
                    })
            } else {
                this.setState({
                    newName: '',
                    newNumber: ''
                })
            }
      } else {
        const nameObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
  
        personService
            .create(nameObject)
            .then(newPerson => {
                this.setState({
                    persons: this.state.persons.concat(newPerson),
                    newName: '',
                    newNumber: '',
                    notice: `lisättiin `+newPerson.name
                }) 
                setTimeout(() => {
                    this.setState({notice: null})
                }, 2000)
            })   
      }
  }

  deletePersonOf = (id) => {
    const find = this.state.persons.filter(p => p.id === id)
    const name = find[0].name
    
    return () => {
        if (window.confirm('Poistetaanko '+name+'?')) {
        console.log('poistetaan')
        personService
            .del(id)
            .then(deletedPerson => {
                const newPersons = this.state.persons.filter(p => p.id !== id)
                this.setState({
                    persons: newPersons,
                    notice: `poistettiin `+name
                })
                setTimeout(() => {
                    this.setState({notice: null})
                }, 2000) 
            })
        } else {
            console.log('ei poistettu') 
        }
    }
  }

  handleShow = (event) => {
      console.log(event.target.value)
      this.setState({ show: event.target.value })
  }

  handleNameChange = (event) => {
      console.log(event.target.value)
      this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
      console.log(event.target.value)
      this.setState({ newNumber: event.target.value })
  }

  render() {
    console.log('render')
    const personsToShow =
        (this.state.show === '') ?
            this.state.persons :
            this.state.persons.filter(note => note.name.toLowerCase().includes(this.state.show.toLowerCase()))

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notice}/>
        <Filter show={this.state.show} handleShow={this.handleShow} />
        <h3>Lisää uusi/muuta henkilön numeroa</h3>
        <NewPersonForm 
            newName={this.state.newName}
            newNumber={this.state.newNumber}
            addPerson={this.addPerson}
            handleNameChange={this.handleNameChange}
            handleNumberChange={this.handleNumberChange}
            text="lisää"   
        />
        <h3>Numerot</h3>
        <table>
            <tbody>
                {personsToShow.map(person =>
                    <Person
                        key={person.name}
                        person={person}
                        deletePerson={this.deletePersonOf(person.id)}
                    />
                )}
            </tbody>
        </table>
    </div>
    )
  }
}
    
export default App