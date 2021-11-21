import {useState, useCallback} from "preact/hooks";
import {SearchInput, SearchInputProps} from "../search-input/search-input";
import {Pokemon} from "../pokemon/pokemon";
import {NoResults} from "../../component/no-results/no-results";

export const Search = () => {
    const [name, setName] = useState<string | null>(null)

    const handleTermEntered = useCallback<SearchInputProps['onSearchTermEntered']>(term => {
        setName(term)
    }, [])

    return (
        <>
            <SearchInput onSearchTermEntered={handleTermEntered} />
            {name && (
                <Pokemon name={name} errorFallback={<NoResults />} />
            )}
        </>
    )
}