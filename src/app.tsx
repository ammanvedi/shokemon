import {Search} from "./lib/container/search/search";
import {FavoritesModal} from "./lib/container/favorites-modal/favorites-modal";
import {FavoritesProvider} from "./lib/context/favorite-context";

export function App() {
  return (
    <FavoritesProvider>
        <Search />
        <FavoritesModal />
    </FavoritesProvider>
  )
}
