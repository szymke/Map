import React from 'react';

class Info extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            dataAPI: null,
            loaded: false,
            id: this.props.id,
        };
    }

    render(){
        if(this.state.loaded === false || this.props.title === null || this.props.id === null){
            return null;
        }

        let languages = [];
        for (var i = 0; i < this.state.dataAPI.languages.length; i++) {
            languages.push(this.state.dataAPI.languages[i].name);
        };

        let currencies = [];
        for (var i = 0; i < this.state.dataAPI.currencies.length; i++) {
            const currency = `${this.state.dataAPI.currencies[i].name} (${this.state.dataAPI.currencies[i].symbol})`
            currencies.push(currency);
        };
        let regionalBlocs = [];
        for (var i = 0; i < this.state.dataAPI.regionalBlocs.length; i++) {
            const bloc = this.state.dataAPI.regionalBlocs[i].name;
            regionalBlocs.push(bloc);
        };

        return  <table className='info slideInUp animated'>
                    <thead>
                        <tr>
                            <th colSpan={6}>{this.state.dataAPI.name}</th>
                            <th colSpan={2}><img className='flag' src={this.state.dataAPI.flag} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Capital</td>
                            <td>Official languages</td>
                            <td>Alpha code</td>
                            <td>Population</td>
                            <td>Currency</td>
                            <td>Region</td>
                            <td>Regional blocs</td>
                            <td>Timezones</td>
                        </tr>
                        <tr>
                            <td>{this.state.dataAPI.capital}</td>
                            <td>{languages.join(', ')}</td>
                            <td>{this.state.dataAPI.alpha2Code}</td>
                            <td>{this.state.dataAPI.population}</td>
                            <td>{currencies.join(', ')}</td>
                            <td>{this.state.dataAPI.region}</td>
                            <td>{regionalBlocs.join(', ')}</td>
                            <td>{this.state.dataAPI.timezones.join(', ')}</td>
                        </tr>
                    </tbody>
                </table>

    }

    componentDidUpdate(){
        if(this.state.id != this.props.id && this.props.id){
            fetch('https://restcountries.eu/rest/v2/alpha/' + this.props.id.toLowerCase())
                .then(r	=> r.json())
                .then(data => {
                    this.setState({
                        dataAPI: data,
                        loaded: true,
                        id: this.props.id
                    })
                });
        }
    }
}

module.exports = Info;
