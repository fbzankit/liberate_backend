import React from 'react';
import Auth from '../../../Auth/Auth';
import { useHistory } from 'react-router';

const SearchBar = () => {
  const history=  useHistory()
    return (
        <>
            {/*<div className="col-sm-6 col-md-5 col-lg-4 desktop-search">
                <div className="search-form">
                    {Auth.getAccessToken()&&history.location.pathname==="/home"?
                    <form action="#">
                        <div className="top-search-bar">
                            <input type="email" placeholder="Search..." />
                            <button className="btn-link"><i className="lb lb-search-icon"></i></button>
                        </div>
                    </form>:''}
                </div>
            </div>*/}
        </>
    );
}

export default SearchBar;