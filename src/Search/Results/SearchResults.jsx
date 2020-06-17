import React from 'react';
import ReactPaginate from 'react-paginate';

import './style.css';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        const {
            setCurrentPage = 0,
            pageCount = 0,
            results = [],
            amountPerPage = 0,s
        } = props;
    }

    onPageClick = data => {
        const { setCurrentPage, amountPerPage } = this.props;
        let selected = data.selected + 1;
        this.props.setCurrentPage(selected);
    };

    constructResults = () => {
        const { results, amountPerPage } = this.props;
        if(results === undefined || results.length === 0) return;

        return results.map((item, index) => {
            return (
                <li key={`search-result-${index}`} className={'results-list-item'}>
                    <img alt={'user avatar'} className={'results-list-item-image'} src={item.avatar_url} />
                    <span className={'results-list-item-content'}> {`Username: ${item.login}`} </span>
                    <span className={'results-list-item-content'}> {`Score: ${item.score}`} </span>
                    <span className={'results-list-item-content'}> {`Type: ${item.type}`} </span>

                    <a className={'results-list-item-content'} href={`${item.html_url}`} rel="noopener noreferrer" target={'_blank'}>{'PROFILE'}</a>
                    <a className={'results-list-item-content'} href={`https://api.github.com/users/${item.login}`} rel="noopener noreferrer" target={'_blank'}>{'API PROFILE'}</a>
                </li>
            )
        })
    }

    render() {
        const constructedList = this.constructResults() || null;
       
        return ( 
            <div>
                <ul className={'results-list'} >
                    { constructedList }   
                </ul>

                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'pagination-break'}
                    pageCount={this.props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.onPageClick}
                    containerClassName={'pagination'}
                    activeClassName={'pagination-active'}
            />
        </div>
        )
    }
}

export default SearchResults;