import React from 'react';
import { SearchResults } from './';
import './style.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.inputValue = React.createRef();
        this.state = { searchValue: '' };
        this.cache = {};

        this.state = {
            results: [],
            totalCount: 0,
            amountPerPage: 50,
            fetching: false,
        };
    }

    setResults = (data) => {
        setTimeout( () => {
            this.setState({
                results: data.items,
                totalCount: data.total_count > 1000 ? 1000 :  data.total_count,
                fetching: false
            });
        }, 2500);
    }

    fetchUsersByValue = (page) => {
        const { searchValue, amountPerPage } = this.state;
        if(this.state.searchValue.length < 3) return;

        if(this.cache[page] !== undefined) {
            this.setResults(this.cache[page]);
            return;
        } 

        this.setState({ fetching: true }, async () => {
            const url = `https://api.github.com/search/users?q=${searchValue}&sort=desc&per_page=${amountPerPage}&page=${page}`;

            const data = await fetch(url).then((data) => {
                return data.json();
            });

            this.cache[page] = data;
            this.setResults(data);
        })
    }

    submitInput = async (ev) => {
        ev.preventDefault();
        if(this.state.searchValue.length < 3) return;
        this.cache = {};
        this.fetchUsersByValue(1);
    }

    onInputChange = async (ev) => {
        ev.preventDefault();
        this.setState({ searchValue: ev.target.value });
    }

    render() {
        const { totalCount, amountPerPage, results, fetching } = this.state;

        return (
            <div className={'container'}>
                <div className={fetching ? 'container-loader':'container-loader-off'}>
                    <span className={'container-loader-content'}>Getting Data</span>
                </div>
                
                <div className={'search-container'}>
                    <h2>Search for Users</h2>

                    <form onSubmit={this.submitInput} className={'search-form'}>
                        <input onChange={this.onInputChange} placeholder={'Please enter username'} className={'search-form-input'} ref={this.inputValue} />
                        <button className='search-form-button'> Search </button>
                    </form>
                </div>

                <div className={'search-result-container-count'}>
                    <span className={'search-result-count'}>
                        {`Displaying ${this.state.totalCount} Users Found`}
                    </span>
                </div>

                <SearchResults
                    setCurrentPage={this.fetchUsersByValue}
                    pageCount={Math.ceil(totalCount / amountPerPage)}
                    results={results}
                    amountPerPage={amountPerPage}
                 />
            </div>   
        );
    }
}

export default Search;