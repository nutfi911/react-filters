import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [allFilters, setAllFilters] = useState([""]);
    const [allState, setAllState] = useState(true);
    const [states, setStates] = useState({
        objects: [
            { id: 0, active: false },
            { id: 1, active: false },
            { id: 2, active: false },
            { id: 3, active: false },
            { id: 4, active: false },
        ],
    });

    const clickHandler = (id: number) => {
        const copy = [...states.objects];

        const sliced = [...allFilters];
        sliced.splice(allFilters.indexOf(id.toString()), 1);

        copy[id].active
            ? setAllFilters([...sliced])
            : setAllFilters([...allFilters, id.toString()]);

        copy[id].active ? (copy[id].active = false) : (copy[id].active = true);

        setStates({ ...states, objects: copy });

        setAllState(checkAll());
    };

    const checkAll = () => {
        let flag = 0;
        states.objects.forEach(({ id, active }, i) => {
            active && flag++;
        });
        return flag === 0 ? true : false;
    };

    const allClickHandler = () => {
        const copy = [...states.objects];

        states.objects.forEach(({ id }, i) => {
            copy[id].active = false;
        });

        setStates({ ...states, objects: copy });
        setAllState(true);
        setAllFilters([]);
    };

    return (
        <div className="App">
            <div className="App-header">Active filters: {[...allFilters]}</div>
            <header className="App-header">
                <div
                    key="122121"
                    className={`filter-container ${allState ? "active" : ""}`}
                    onClick={allClickHandler}
                >
                    All
                </div>
                {states.objects.map((filter) => {
                    return (
                        <div
                            key={filter.id}
                            className={`filter-container ${
                                filter.active ? "active" : ""
                            }`}
                            onClick={clickHandler.bind("id", filter.id)}
                        >
                            {filter.id}
                        </div>
                    );
                })}
            </header>
        </div>
    );
}

export default App;
