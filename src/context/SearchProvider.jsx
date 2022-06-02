import { createContext, useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

export const SearchContext = createContext();

const SearchProvider = ({ children }) => {

    const {data, setData} =  useFirestore()

    const searchCity = city => {
        console.log(data)
        const dataCity = data.filter(item => item.city === city)
        console.log(data)
        setData(dataCity)
    }

    return (
        <SearchContext.Provider value = {{searchCity}}>
            {children}
        </SearchContext.Provider>
    );

}

export default SearchProvider;