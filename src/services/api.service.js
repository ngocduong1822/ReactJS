import axios from "./axios.customize";
const createUserApi = (fullName,email,password,phone) => {
    const URL_BACKEND ="/api/v1/user"
           const data = {
            fullName:fullName,
            email:email,
            password:password,
            phone:phone
           }
           return axios.post(URL_BACKEND,data)
}

const updateUserApi = (_id, fullName, phone) => {
    const URL_BACKEND = `/api/v1/user`
    const data = {
            _id:_id,
            fullName:fullName,
            phone:phone
           }
    return axios.put(URL_BACKEND, data);
};
const deleteUserApi = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`;
    return axios.delete(URL_BACKEND);
}   
const fetchAllUserApi = () => {
    const URL_BACKEND = "/api/v1/user";
    return axios.get(URL_BACKEND);
};
export { createUserApi, updateUserApi, fetchAllUserApi,deleteUserApi };