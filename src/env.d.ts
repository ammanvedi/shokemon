interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {
    readonly VITE_API_POKEMON: string
    readonly VITE_API_POKEMON_IMAGES: string
    readonly VITE_API_SHAKESPEARE: string
    readonly VITE_POKEMON_LANGUAGE_PREFERENCE: string
    readonly VITE_POKEMON_VERSION_PREFERENCE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}