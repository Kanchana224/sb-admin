import axios from "axios"
const API_URL ="https://6597a32d668d248edf2318e6.mockapi.io/api/v1/"
const AxiosService=axios.create({

    baseURL:API_URL,
    headers:{
        "Content-Type":"application/json"
    }
})

export default AxiosService