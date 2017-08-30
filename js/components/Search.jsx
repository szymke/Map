import React from 'react';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            found: false,
            inputVal: '',
        };
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
    }

    handleInputSearch = (e) => {
        if (typeof this.props.searchChange === 'function' ){
            const targVal = e.target.value;
            const title = targVal.toLowerCase();
            console.log(title);
            this.setState({inputVal: title});
            const path = document.querySelector('path[title="' + title + '"]');
            if(path){
                const id = path.getAttribute('id');
                if(path != null){
                    path.classList.add('fill');
                    this.setState({found: true});
                };
                this.props.searchChange(path, title, id);
            }
        };
    }

    render(){

        return  <div className="search">
                    <form onSubmit={this.handleFormSubmit}>
                        <input type='text' onChange={this.handleInputSearch} placeholder="Search"/>
                    </form>
                </div>

    }
}

module.exports = Search;
