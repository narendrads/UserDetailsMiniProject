import React, { createContext, useContext, useState } from 'react';

const FilteredUserDataContext = createContext();

export const FilteredUserDataProvider = ({ children }) => {
    const [filteredUserData, setFilteredUserData] = useState([]);
console.log("dtaaaaaa",filteredUserData);
    return (
        <FilteredUserDataContext.Provider value={{ filteredUserData, setFilteredUserData }}>
            {children}
        </FilteredUserDataContext.Provider>
    );
};

export const useFilteredUserData = () => useContext(FilteredUserDataContext);
