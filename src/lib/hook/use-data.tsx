import {useState, useEffect} from "preact/hooks";
import {pokemonService} from "../service/pokemon-service";

type HookReturn<DATA> = {data: DATA | null, error: string | null, loading: boolean }

const useData = <DATA, ARGS extends any[]>(
    request: (...args: ARGS) => Promise<DATA>
) => {
    return (...args: ARGS): HookReturn<DATA> => {
        const [data, setData] = useState<DATA | null>(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            setLoading(true);
            setError(null);
            request(...args)
                .then(data => {
                    setData(data)
                })
                .catch(e => {
                    console.error(e)
                    setError(e.toString)
                })
                .finally(() => {
                    setLoading(false)
                })
        }, [...args])

        return {
            data, loading, error
        }
    }
}

export const useSpecies = useData(pokemonService.getSpecies.bind(pokemonService));
export const useTranslatedDescription = useData(pokemonService.getTranslatedDescription.bind(pokemonService))
export const useCardImage = useData(pokemonService.getSpeciesCardImage.bind(pokemonService))