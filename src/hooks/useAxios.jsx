import axios from "axios";


const useAxios = () => {

    const fetchAxios = axios.create({
        baseURL: 'http://localhost:5000'
    })

  return fetchAxios;
}

export default useAxios