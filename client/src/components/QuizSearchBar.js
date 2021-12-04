import React, { useState, Link } from "react";
import { useHistory } from "react-router-dom";
import "../css/SearchBar.css";

function QuizSearchBar({ placeholder, data}) {
    let history = useHistory();

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.QuizTitle.toLowerCase().includes(searchWord.toLowerCase());
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

    const routeChangeQuiz = function(QuizID){
        sessionStorage.setItem('current quiz', QuizID);
        sessionStorage.setItem('previous quiz', QuizID);
        history.push({
            pathname:'/quiz/' + QuizID,
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
                            <a className="dataItem" onClick={routeChangeQuiz.bind(this, value.QuizID)}>
                                <p>{value.QuizTitle}</p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
    
}

export default QuizSearchBar;