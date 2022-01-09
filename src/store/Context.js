import { createContext, useState } from "react";
export const AppContext=createContext(null)
export const LogContext=createContext(null)

 export default function Context({children}){
    const [user, setuser] = useState(null)
    return(
        <LogContext.Provider value={{user,setuser}} >
           {children}
        </LogContext.Provider>
    )
}