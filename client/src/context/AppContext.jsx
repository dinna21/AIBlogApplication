import {createContext,useContext} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const AppContext = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
export const AppProvider = ({ children }) =>{
    const navigate = useNavigate();
    const [token,setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () =>
    {
        try {
            const {data} = await axios.get("/api/blog/all");
            if (data.success) {
                setBlogs(data.blogs);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(data.message);
        }
    }
    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem("token");
        if (token) {
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `${token}`;
        }

    }, []);
    
    const value =
    {
        axios,navigate,token,setToken,blogs,setBlogs,input,setInput
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext); 
}
