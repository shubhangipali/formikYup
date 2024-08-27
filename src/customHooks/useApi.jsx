import axios from "axios";
import { API_URL } from "../constant/constant";
import { useEffect, useState } from "react";

const useApi = () => {
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //fetch data from api
        const fetchData = async () => {
            try {
                const response1 = await axios.get(API_URL);
                const productCategory = response1.data.products;
                setData(productCategory);
                const catergoryAll = new Set(productCategory.map(data => data.category));
                setCategory([...catergoryAll]);
    
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();

    }, []);

    return { data, category, loading, error };
};

export default useApi;