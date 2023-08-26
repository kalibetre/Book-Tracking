import { CategoryLevel } from "@/components/BookCategory";
import useSWR from "swr";

import axios from "axios";
import { BookItem } from "@/components/Book";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosFetcher = (url: string) => axios.get(url).then(res => res.data)
const booksUrl = `${API_URL}/books`;
const bookApi = axios.create({
    baseURL: booksUrl,
})

export const useBooks = () => {
    const { data, error, isLoading, mutate } = useSWR(booksUrl, axiosFetcher);

    const addNewBook = async (title: string) => {
        await bookApi.post('/', { title })
        mutate([...data, { id: data.length + 1, title, category: CategoryLevel.ToRead }])
    }

    const deleteBook = async (book: BookItem) => {
        await bookApi.delete(`/${book.id}`)
        mutate(data.filter((b: BookItem) => b.id !== book.id))
    }

    const updateBookCategory = async (book: BookItem) => {
        await bookApi.put(`/${book.id}`, { category: book.category })
        mutate([...data.filter((b: BookItem) => b.id !== book.id), book])
    }
    
    return {
        books: data,
        isError: error,
        isLoading,
        addNewBook,
        deleteBook,
        updateBookCategory
    }
}
