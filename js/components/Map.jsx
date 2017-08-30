import React from 'react';
import ReactSVG from 'react-svg';
import Info from './Info.jsx';
import Search from './Search.jsx';

class Map extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: null,
            id: null,
        };
    }

    handleInputChange = (path, title, newId) =>{
        this.setState({
            title: title,
            id: newId,
        });
    }

    handleMapClick = (e) =>{
        if(e.target === document.querySelector('svg')){
            return null;
        }
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

    renamePathsIdTitle(paths){
        paths.forEach( (path) => {
            path.setAttribute("id", path.id.toLowerCase());
            path.setAttribute("title", path.getAttribute('title').toLowerCase());
            path.classList.add('tip');
        });
    }

    tooltipOn = (event) => {
        if(event.target.tagName === 'path'){
            const text = document.createElement('text');
            text.classList.add('tooltipText');
            event.target.appendChild(text);
            event.target.lastElementChild.innerHTML = 'Bardzo ciekawy tooltip';
            // console.log(event.target);
            // console.log(event.target.lastElementChild);
        };
    }

    tooltipOff = (event) => {
        if(event.target.lastElementChild.tagName === "text"){
            event.target.removeChild(this.lastElementChild);
        };
    }

    render(){
        return  <div className='container'>
                    <div className="row" onMouseOver={this.tooltipOn} onMouseOut={this.tooltipOff} onClick = {this.handleMapClick}>
                        <Search searchChange={this.handleInputChange}/>
                        <ReactSVG
                            path="../images/worldHigh.svg"
                            callback={svg => {
                                let paths = document.querySelectorAll('path');
                                this.renamePathsIdTitle(paths);
                            }}
                            className="map"e
                            style={{width: '1009px', height: '665px', background: '#161C2E',}}
                        />
                    </div>
                    <div className="row">
                        <Info id={this.state.id} title={this.state.title}/>
                    </div>
                </div>
    }

}

module.exports = Map;
