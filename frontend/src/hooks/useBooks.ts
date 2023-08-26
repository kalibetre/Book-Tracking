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

    const addNewBook = async (title: string, errCallback: (msg: string) => void) => {
        try {
            mutate(booksUrl, [...data, { id: data.length + 1, title, category: CategoryLevel.ToRead }], false)
            await bookApi.post('/', { title })
            mutate(booksUrl)
        } catch (error) {
            mutate(booksUrl, data)
            errCallback("Faild to add the new book. Please try again!")
        }
    }

    const deleteBook = async (book: BookItem, errCallback: (msg: string) => void) => {
        try {
            mutate(booksUrl, data.filter((b: BookItem) => b.id !== book.id), {
                rollbackOnError: true
            })
            await bookApi.delete(`/${book.id}`)
            mutate(booksUrl)
        } catch (error) {
            mutate(booksUrl, data)
            errCallback("Faild to delete the book. Please try again!")
        }
    }

    const updateBookCategory = async (book: BookItem, errCallback: (msg: string) => void) => {
        try {
            mutate(booksUrl, [...data.filter((b: BookItem) => b.id !== book.id), book], false)
            await bookApi.put(`/${book.id}`, { category: book.category })
            mutate(booksUrl)
        } catch (error) {
            mutate(booksUrl, data)
            errCallback("Faild to update the book. Please try again!")
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
