import { createContext, useState } from "react";
export   const Viewcontext=createContext(null)

function ViewDetails({children}){
    const [detail, setdetail] = useState()
    return(
        <Viewcontext.Provider value={{detail ,setdetail}} >
            {children}
        </Viewcontext.Provider>
    )

}
export default ViewDetails