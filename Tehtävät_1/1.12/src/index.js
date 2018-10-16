import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Anecdote = ({ anecdote }) => {
    return (
        <div>{anecdote}</div>
    )
}

const Votes = ({ votes }) => {
    return (
        <div>has {votes} votes</div>
    )
}

const Header = ({ text }) => {
    return (
        <h3>{text}</h3>
    )
}

const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        selected: 0,
        pisteet: [0, 0, 0, 0, 0, 0],
        best: 0
      }
    }

    selectAnecdote = () => {
        const luku = Math.floor(Math.random() * 6)
        this.setState({
            selected: luku
        })
    }

    voteAnecdote = () => {
        const kopio = [...this.state.pisteet]
        kopio[this.state.selected] += 1
        this.setState({
            pisteet: kopio
        })
        this.bestAnecdote(kopio)
    }

    bestAnecdote = (kopio) => {
        for (var i = 0; i < 6; i++) {
            if (kopio[i] > kopio[this.state.best]) {
                this.setState({
                    best: i
                })
            }
        }
    }
  
    render() {
        return (
            <div>
                <div>
                    <Anecdote anecdote={this.props.anecdotes[this.state.selected]}/>
                    <Votes votes={this.state.pisteet[this.state.selected]}/>
                </div>
                <div>
                    <Button 
                        handleClick={this.voteAnecdote}
                        text="vote"
                    />
                    <Button 
                        handleClick={this.selectAnecdote}
                        text="next anecdote"
                    />
                </div>
                <div>
                    <Header text="anecdote with most votes:"/>
                </div>
                <div>
                    <Anecdote anecdote={this.props.anecdotes[this.state.best]}/>
                    <Votes votes={this.state.pisteet[this.state.best]}/>
                </div>
            </div>
        )
    }
}
  
const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
  
ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)

