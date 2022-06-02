import { filterMedias, getMedia } from "Api/Endpoints"
import { useQuery } from "react-query"


export const useMedia = (id) => {
    const reactQuery = useQuery(`media/${id}`, () => getMedia(id), {
        select: (data) => data[0],
        staleTime: 60000,
    })

    return {
        ...reactQuery,
        item: reactQuery.data,
        loading: reactQuery.isLoading,
    }
}

export const useMedias = (currentPage, itemsPerPage, initialFilters) => {
    const [filters, setFilters] = useState(initialFilters)
    const reactQuery = useQuery([`medias/${currentPage}/${itemsPerPage}`, initialFilters], () => filterMedias(currentPage, itemsPerPage, filters), {
        select: (data) => data[0],
        refetchOnWindowFocus: false,
        staleTime: 60000,
    })

    useEffect(() => {
        if (initialFilters && !isEqual(filters, initialFilters))
            setFilters(initialFilters)
    }, [initialFilters])

    return {
        ...reactQuery,
        items: reactQuery.data,
        loading: reactQuery.isLoading,
        search,
    }
}