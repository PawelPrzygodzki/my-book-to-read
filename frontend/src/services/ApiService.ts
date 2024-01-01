import axios, {AxiosResponse} from 'axios';
import {CreateUserTypes} from "./types/CreateUser.types";
import {LogInUserTypes} from "./types/LogInUser.types";
import {CreateListTypes} from "./types/CreateList.types";

export const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

const getAxiosInstance = () => {
    const http = axios.create({
        baseURL: BASE_API_URL,
    });

    http.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    return http;
};

class ApiService {
    private axiosInstance = getAxiosInstance();

    public auth = {
        register: async (payload: CreateUserTypes): Promise<AxiosResponse<{}>> => (
            this.axiosInstance.post('/v1/users', payload)
        ),
        logIn: async (payload: LogInUserTypes): Promise<AxiosResponse<{ accessToken: string }>> => (
            this.axiosInstance.post('/v1/auth/login', payload)
        ),
    };
    public books = {
        search: async (q: string): Promise<{ items: { key: string, title: string, authorName: string }[] }> => {
            const response = await this.axiosInstance.get(`/v1/books?q=${q}`)

            return response.data;
        },
    }

    public lists = {
        getAll: async (): Promise<AxiosResponse<{ items: { id: number, name: string }[] }>> => (
            this.axiosInstance.get('/v1/users/@me/lists',)
        ),
        getOne: async (id: number): Promise<AxiosResponse<{
            id: number,
            name: string,
            books: { title: string, authorName: string, id: number }[]
        }>> => (
            this.axiosInstance.get(`/v1/lists/${id}`)
        ),
        addBookToList: async (listId: number, bookKey: string): Promise<AxiosResponse<{
            id: number,
            name: string,
            books: { title: string, authorName: string, id: number }[]
        }>> => (
            this.axiosInstance.post(`/v1/lists/${listId}/books`, {key: bookKey})
        ),
        removeBookFromList: async (listId: number, bookId: number): Promise<AxiosResponse<void>> => (
            this.axiosInstance.delete(`/v1/lists/${listId}/books/${bookId}`)
        ),
        create: async (payload: CreateListTypes): Promise<AxiosResponse<{ id: number, name: string }>> => (
            this.axiosInstance.post('/v1/lists', payload)
        ),

        delete: async (id: number): Promise<AxiosResponse<void>> => (
            this.axiosInstance.delete(`/v1/lists/${id}`)
        ),
    };
}

const api = new ApiService()
export default api;
