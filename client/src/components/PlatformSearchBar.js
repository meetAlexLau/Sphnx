import React, { useState, Link } from "react";
import { useHistory } from "react-router-dom";
import "../css/SearchBar.css";

function PlatformSearchBar({ placeholder, data}) {
    let history = useHistory();

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.PlatformName.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    const routeChangePlatform = function(PlatformID){
        sessionStorage.setItem('current platform', PlatformID);
        sessionStorage.setItem('previous platform', PlatformID);
        history.push({
            pathname:'/platform/' + PlatformID,
            state: {isLoggedIn:true}
            });
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                />
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <a className="dataItem" onClick={routeChangePlatform.bind(this, value.PlatformID)}>
                                <p>{value.PlatformName}</p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
    
}

export default PlatformSearchBar;