import {useState, useCallback} from "preact/hooks";
import {SearchInput, SearchInputProps} from "../search-input/search-input";
import {Pokemon} from "../pokemon/pokemon";
import {NoResults} from "../../component/no-results/no-results";
import {Page} from "../../component/page/page";

export const Search = () => {
    const [name, setName] = useState<string | null>(null)

    const handleTermEntered = useCallback<SearchInputProps['onSearchTermEntered']>(term => {
        setName(term)
    }, [])

    return (
        <Page>
            <SearchInput onSearchTermEntered={handleTermEntered} />
            {name && (
                <>
                    <h2>Results</h2>
                    <Pokemon name={name} errorFallback={<NoResults />} />
                </>

            )}
        </Page>
    )
}