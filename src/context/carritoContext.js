import React, { createContext, useState } from "react"

export const MenuContext = createContext()

export const MenuProvider = ({ children }) => {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reloadFilter, setReloadFilter] = useState(true);
  const [ datosContx, setDatosContx ] = useState([]);

  return (
    <MenuContext.Provider value={{active,setActive, loading, setLoading, reloadFilter, setReloadFilter, datosContx, setDatosContx }}>
      {children}
    </MenuContext.Provider>
  );
};