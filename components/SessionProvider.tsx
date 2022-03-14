import {createContext} from "react";
import useUser from "@hooks/useUser";

export const SessionContext = createContext(undefined)

export const SessionProvider = ({children}) => {
    const {user, isLoading, isError} = useUser()
    return <SessionContext.Provider value={user}>
        {children}
    </SessionContext.Provider>
}