import {createContext,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppProvider = ({ children }) =>{
    const navigate = useNavigate();
    const [token,setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const value = {
        axios,navigate,token,setToken,blogs,setBlogs,input,setInput
    }
    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext); 
}
