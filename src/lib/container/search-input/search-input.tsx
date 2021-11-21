import Preact from "preact";
import {useState, useCallback} from 'preact/hooks'
import {SearchField} from "../../component/search-field/search-field";

export type SearchInputProps = {
    onSearchTermEntered: (term: string) => void
}

export const SearchInput: Preact.FunctionalComponent<SearchInputProps> = ({onSearchTermEntered}) => {
    const [term, setTerm] = useState<string>('')

    const onTextEntered = useCallback<Preact.JSX.GenericEventHandler<HTMLInputElement>>((e) => {

        if(e.target && e.target instanceof HTMLInputElement) {
            setTerm(e.target.value)
        }

    }, [])

    const handleSubmit = useCallback<Preact.JSX.EventHandler<Preact.JSX.TargetedEvent<HTMLFormElement, Event>>>((e) => {
        e.preventDefault();
        onSearchTermEntered(term);
    }, [term])

    return (
        <form onSubmit={handleSubmit}>
            <SearchField value={term} onChange={onTextEntered} />
        </form>

    )
}
