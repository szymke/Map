import React from 'react';
import ReactSVG from 'react-svg';
import ReactAutocomplete from 'react-autocomplete';
import Info from './Info.jsx';
import Search from './Search.jsx';

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: null,
            id: null,
            countries: null,
            value: '',
            selected: '',
        };
    }

    handleMapClick = (e) =>{
        if(e.target === document.querySelector('svg')){
            return null;
        };
        this.setState({
            title: e.target.getAttribute('title'),
            id: e.target.id,
        });
    }

    componentDidUpdate(){
        if(this.state.id != null){
            let path = document.getElementById(this.state.id);
            if(path){
                path.classList.add('fill');
            }
        }
    }

    handleInputSearch = (e) => {
        const title = e.target.value;
        this.setState({value: title})
        const path = document.querySelector('path[title="' + title.toLowerCase() + '"]');
        if(path){
            const id = path.getAttribute('id');
            console.log(id);
            this.setState({
                id: id,
                title: title.toLowerCase(),
            });
            if(path != null){
                path.classList.add('fill');
            };
        }
    }

    handleOnSelect = (value) => {
        const path = document.querySelector('path[title="' + value.toLowerCase() + '"]');
        if(path){
            const id = path.getAttribute('id');
            this.setState({
                id: id,
                title: value,
                value: value,
            });
            if(path != null){
                path.classList.add('fill');
            };
        }
    }

    editPaths(paths){
        paths.forEach((path) => {
            path.setAttribute("id", path.id.toLowerCase());
            path.setAttribute("title", path.getAttribute('title').toLowerCase());
        });

        if(this.state.countries === null) {
            const pathsArr = [].slice.call(paths); // convert to array (paths is nodeList)
            const ctrs = pathsArr.map(country => {
                return {id: country.id, label: this.camel(country.getAttribute('title'))}
            });
            this.setState({countries: ctrs});
        }
    }

    camel(str){
        let words = str.split(' ');
        const wordsUpper = words.map((elem, index) => {
            return elem.charAt(0).toUpperCase() + elem.slice(1);
        });
        return wordsUpper.join(' ');
    }

    render(){
        //<Search searchChange={this.handleInputChange}/>
        //onChange={e => this.setState({ value: e.target.value })}
        //onSelect={value => this.setState({ value: value, title: value})}
        const autoComplete = (this.state.countries != null) ?
        <ReactAutocomplete
                    items={this.state.countries}
                    shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    getItemValue={item => item.label}
                    inputProps={{placeholder: 'Search'}}
                    renderItem={(item, highlighted) =>
                      <div
                        key={item.id}
                        style={{
                            backgroundColor: highlighted ? '#161C2E' : 'transparent',
                            color: highlighted ? '#EF6C35' : '#161C2E',
                            padding: '5px',
                        }}>
                        {item.label}
                      </div>
                    }
                    value={this.state.value}
                    onChange={this.handleInputSearch}
                    onSelect={value => {this.handleOnSelect(value)}}
                    /> : null;


        return  <div className='container'>
                    <div className="row" onClick={this.handleMapClick}>
                        <ReactSVG
                            path="../images/worldHigh.svg"
                            callback={svg => {
                                        let paths = document.querySelectorAll('path');
                                        let g = document.querySelector('g');
                                        this.editPaths(paths);
                                    }
                            }
                            className="map"
                            style={{width: '1009px', height: '665px', background: '#161C2E',}}
                        />
                        {autoComplete}
                    </div>
                    <div className="row">
                        <Info id={this.state.id} title={this.state.title}/>
                    </div>
                </div>
    }

}

module.exports = Map;
