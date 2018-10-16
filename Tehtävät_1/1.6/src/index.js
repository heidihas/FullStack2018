import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Otsikko = ({ text }) => {
    return (
        <div>
            <h3>{text}</h3>
        </div>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ nimi, arvo}) => {
    if (nimi === 'positiivisia') {
        return (
            <tr>
                <td>{nimi}</td>
                <td>{arvo} %</td>
            </tr>      
        )
    }
    return (
        <tr>
            <td>{nimi}</td>
            <td>{arvo}</td>
        </tr>
    )
}

const Statistics = ({ tiedot }) => {
    return (
        <div>
            <table>
                <tbody>
                    <Statistic nimi={tiedot[0].nimi} arvo={tiedot[0].arvo} />
                    <Statistic nimi={tiedot[1].nimi} arvo={tiedot[1].arvo} />
                    <Statistic nimi={tiedot[2].nimi} arvo={tiedot[2].arvo} />
                    <Statistic nimi={tiedot[3].nimi} arvo={tiedot[3].arvo} />
                    <Statistic nimi={tiedot[4].nimi} arvo={tiedot[4].arvo} />
                </tbody>
            </table>
        </div>
    )
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            summa: 0,
            maara: 0
        }
    }

    klik = (arvio, arvo) => {
        const lista = {
            0: this.state.hyva,
            1: this.state.neutraali,
            2: this.state.huono
        }
        lista[arvio] = lista[arvio] + 1

        return () => {
            this.setState({
                hyva: lista[0],
                neutraali: lista[1],
                huono: lista[2],
                summa: this.state.summa + arvo,
                maara: this.state.maara + 1
            })
        }
    }

    render() {
        const eka = 'anna palautetta'
        const toka = 'statistiikka'
        const tiedot = [
            {
                nimi: 'hyvä',
                arvo: this.state.hyva
            },
            {
                nimi: 'neutraali',
                arvo: this.state.neutraali
            },
            {
                nimi: 'huono',
                arvo: this.state.huono
            },
            {
                nimi: 'keskiarvo',
                arvo: Math.round(this.state.summa / this.state.maara * 10) / 10
            },
            {
                nimi: 'positiivisia',
                arvo: Math.round(this.state.hyva / this.state.maara * 1000) / 10
            }
        ]
        const historia = () => {
            if (this.state.maara === 0) {
                return (
                    <div>
                        <em>ei yhtään palautetta annettu</em>
                    </div>
                )
            }
            return (
                <Statistics tiedot={tiedot} /> 
            )
        }

        return (
            <div>
                <div>
                    <Otsikko text={eka} />
                    <Button 
                        handleClick={this.klik(0, 1)}
                        text="hyvä"
                    />
                    <Button 
                        handleClick={this.klik(1, 0)}
                        text="neutraali"
                    />
                    <Button 
                        handleClick={this.klik(2, -1)}
                        text="huono"
                    />
                </div>
                <div>
                    <Otsikko text={toka} />
                    {historia()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

