import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import '../../styles/tools/Search.scss'

const Search = (props) => {
    const {list, itemProperty, itemLink, placeholderText} = props;
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value !== "") {
            const result = list.filter(p =>
                p[itemProperty].toLowerCase().includes(search.toLowerCase())
            ) 
            setSearchResults(result);
        } else {
            setSearchResults([])
        }
    };

    const handleLeave = () => {
        setSearch("")
        setSearchResults([])
    }

    return (
        <div className="Search">
            <input className="Search__input" type="text" name="search" value={search} onChange={handleChange} autoComplete="off" placeholder={placeholderText}/>

            {searchResults.length !== 0 ?
            <div className="Search__results" onMouseLeave={handleLeave}>
                <h6 className="Search__header">
                    <i className="fas fa-search"></i>
                    Search Results
                </h6>

                {searchResults.map(item => (
                    <Link className="Search__link" to={`${itemLink}${item.id}`}>
                    <i className="fas fa-search"></i>
                    {item[itemProperty]}
                    </Link>
                ))}

            </div>
            : null }
        </div>
    );
}

export default Search;