import { useEffect, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";

export default function useSearchParams() {
    const history = useHistory();
    const { pathname, search } = useLocation();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    const filtersAndPageObj = useMemo(() => {
        return {
            filters: queryParamsToFilterObject(searchParams.get('filters')),
            page: Number(searchParams.get('page')) || null,
        }
    }, [searchParams]);

    const setSearchParams = (params) => {
        const newParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // value.forEach(item => newParams.append(key, item))
                    newParams.append(key, value)
                }
                else {
                    newParams.append(key, value)
                }
            })
        }
        const newParamsStr = newParams.toString()
        if (searchParams.toString() !== newParamsStr)
            history.push({ search: newParamsStr })
    }
    const appenSearchParams = (key, value, redirectTo) => {
        console.log("comparação", searchParams.get(key)?.toString())
        console.log("comparação", value)
        console.log("comparação", searchParams.get(key) == value)
        if ((searchParams.has(key) && searchParams.get(key).toString() == value)) return
        const newParams = new URLSearchParams(search)
        if (value) {
            newParams.set(key, value)
        } else
            newParams.delete(key)
        const newParamsStr = newParams.toString()

        if (searchParams.toString() !== newParamsStr) {
            if (!searchParams.has('page') && newParams.get('page') === '1')
                history.replace({ pathname: redirectTo || pathname, search: newParamsStr })
            else
                history.push({ pathname: redirectTo || pathname, search: newParamsStr })
        }
    }

    const setFilters = (filters, redirectTo) => {
        appenSearchParams('filters', filterObjectToQueryParams(filters), redirectTo)
    }

    return {
        ...filtersAndPageObj,
        searchParams,
        setSearchParams,
        appenSearchParams,
        setFilters
    }
}

export function filterObjectToQueryParams(filters) {
    if (!filters) return
    const parserFilters = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            const reduce = value.reduce((acc, item) => {
                return [...acc, `${item.itemLabel}:${item.value}`]
            }, [])
            parserFilters.append(key, reduce.join(';'))
        }
        else {
            parserFilters.append(key, `${value.itemLabel}:${value.value}`)
        }
    })
    console.log("parserFilters", parserFilters.toString())
    return parserFilters.toString()
}

export function queryParamsToFilterObject(searchParams) {
    if (searchParams) {
        const filtersSearchParams = new URLSearchParams(searchParams)
        const filterObject = {}
        filtersSearchParams.forEach((string, key) => {
            filterObject[key] = filtersSearchParams.get(key).split(';').map(item => {
                const [itemLabel, value] = item.split(':')
                return { itemLabel: itemLabel, value: value?.includes(',') ? value.split(',') : (Number(value) || value) }
            })
        })
        return filterObject
    }
    return null
}