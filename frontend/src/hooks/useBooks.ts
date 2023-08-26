import { CategoryLevel } from "@/components/BookCategory";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { BookItem } from "@/components/Book";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const axiosFetcher = (url: string) => axios.get(url).then(res => res.data)
const booksUrl = `${API_URL}/books`;
const bookApi = axios.create({
    baseURL: booksUrl,
})

export const useBooks = () => {
    const { data, error, isLoading  } = useSWR(booksUrl, axiosFetcher);

    const addNewBook = async (title: string, callback: (success: boolean) => void) => {
        try {
            mutate(booksUrl, [...data, { id: data.length + 1, title, category: CategoryLevel.ToRead }], false)
            await bookApi.post('/', { title })
            mutate(booksUrl)
            callback(true)
        } catch (error) {
            mutate(booksUrl, data)
            callback(false)
        }
    }

    const deleteBook = async (book: BookItem, callback: (success: boolean) => void) => {
        try {
            mutate(booksUrl, data.filter((b: BookItem) => b.id !== book.id), {
                rollbackOnError: true
            })
            await bookApi.delete(`/${book.id}`)
            mutate(booksUrl)
            callback(true)
        } catch (error) {
            mutate(booksUrl, data)
            callback(false)
        }
    }

    const updateBookCategory = async (book: BookItem, callback: (success: boolean) => void) => {
        try {
            mutate(booksUrl, [...data.filter((b: BookItem) => b.id !== book.id), book], false)
            await bookApi.put(`/${book.id}`, { category: book.category })
            mutate(booksUrl)
            callback(true)
        } catch (error) {
            mutate(booksUrl, data)
            callback(false)
        }
    }
    
    return {
        books: data || [],
        isError: error,
        isLoading,
        addNewBook,
        deleteBook,
        updateBookCategory
    }
}
