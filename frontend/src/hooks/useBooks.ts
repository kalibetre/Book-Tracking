import { CategoryLevel } from "@/components/BookCategory";
import useSWR from "swr";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosFetcher = (url: string) => axios.get(url).then(res => res.data)
const booksUrl = `${API_URL}/books`;
const bookApi = axios.create({
    baseURL: API_URL,
})

export const useBooks = () => {
    const { data, error, isLoading, mutate } = useSWR(booksUrl, axiosFetcher);

    const addNewBook = async (title: string) => {
        await bookApi.post('/books', { title })
        mutate([...data, { id: data.length + 1, title, category: CategoryLevel.ToRead }])
    }

    return {
        books: data,
        isError: error,
        isLoading,
        addNewBook
    }
}
