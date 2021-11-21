import { Logo } from './logo'
import {SearchInput} from "./lib/container/search-input/search-input";
import {Search} from "./lib/container/search/search";
import {FavoritesModal} from "./lib/container/favorites-modal/favorites-modal";
import {FavoritesProvider} from "./lib/hook/favorite-context";

export function App() {
  return (
    <FavoritesProvider>
        <Search />
        <FavoritesModal />
    </FavoritesProvider>
  )
}
