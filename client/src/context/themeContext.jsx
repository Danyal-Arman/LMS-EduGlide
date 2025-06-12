import { createContext, useContext, useEffect, useState } from "react";


const myThemeContext = createContext();

const ThemeProvider = ({ children }) => { 

const [theme, setTheme] = useState(localStorage.getItem("theme")|| "light") //retrieves last savad theme from browser local storage

const myThemeToggle=()=>{
  const currentTheme = theme === "light"? "dark": "light"
  setTheme(currentTheme)
  localStorage.setItem("theme", currentTheme) // setItem saves the data in localstorage (here data is theme)
}

useEffect(() => {
   document.documentElement.classList.toggle("dark",theme === "dark")

}, [theme])


  
return(
  <myThemeContext.Provider value={{theme, myThemeToggle}}>
    {children}
    </myThemeContext.Provider>
);
}


export default ThemeProvider;

export function useTheme(){ 
  return useContext(myThemeContext);  
}




