import { createContext, useContext, useEffect, useState } from "react";


const myThemeContext = createContext();

const ThemeProvider = ({ children }) => { 

const [theme, setTheme] = useState(localStorage.getItem("theme")|| "light") //retrieves last savad theme from browser local storage

const myThemeToggle=()=>{
  const currentTheme = theme === "light"? "dark": "light"
  setTheme(currentTheme)
  console.log(theme)
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





//useTheme avoid repetitive import of useContext in everycomponent



// What is <ThemeContext.Provider>?
// In React Context API, a provider is used to share state (data) globally across components.
// <ThemeContext.Provider> makes the theme and mytoggleTheme available to all child components in the app.

// What is {children}?
// children is a special React prop that represents the components inside a provider.
// It allows nested components to access the context.

// if {children} is missing, the provider won't render anything



// Why useTheme()?
// 👉 useTheme() is a custom React Hook that makes it easier to access the theme context.

// 📌 What it does?
// Uses useContext(ThemeContext) to access the context data.
// Returns the theme and toggleTheme values from the ThemeContext.Provider.
// Allows any component to use the theme without importing ThemeContext directly.