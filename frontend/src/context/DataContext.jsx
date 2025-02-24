import React, { createContext, useState } from 'react'

export const dataContext = createContext();

function DataContext({ children }) {
    const [data, setData] = useState();
    const [currentUserData, setCurrentUserData] = useState();
  return (
    <dataContext.Provider value={{data, setData, currentUserData, setCurrentUserData}}>
        {
            children
        }
    </dataContext.Provider>
  )
}

export default DataContext