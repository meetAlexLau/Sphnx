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
            return value.UserName.toLowerCase().includes(searchWord.toLowerCase());
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

    const routeChangeProfile = function(UserID){
        history.push({
            pathname:'/profile/' + UserID,
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
                            <a className="dataItem" onClick={routeChangeProfile.bind(this, value.UserID)}>
                                <p>{value.UserName}</p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
    
}

export default PlatformSearchBar;