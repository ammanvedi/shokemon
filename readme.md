# Shokemon

![](https://i.imgur.com/Aezuu6i.gif)

### Architechture
In general I have stateful container components and stateless presentation components.
This helps me to isolate the UI from the method of data fetching. Makes them easier to test (although i didnt XD)
and also means that the props can be very primitive which means its easier to reason about re renders.

There is a service, pokemonService, which holds all data fetching and formatting logic.
This is integrated with a set of hooks which can be seen in `lib/hook`. In turn these are using in the
container components.

Localstorage interaction is handled in a context, since I needed the information about
which pokemon were favorites in both the results list and favorites list to keep the button states in sync

I rely on the browser cache in most cases prevent duplicate requests since the
api returns adequate cache-control headers. Whenever i need the data again i just fetch it again through pokemonService

### Running the Code
`cd shokemon`

`npm install`

`npm run dev`

Then visit [http://localhost:3000](http://localhost:3000)

### Running the Tests

You need to make sure that the dev server is running first

`npm run dev`

and then in a separate terminal

`npm test`

### Building Production Code

`npm run build`

### TODO
1. Favorites was going to be a nice modal but i ran out of time
2. There are edge cases not covered in cypress which could be covered by unit tests
3. I have only reviewed accessibility with keyboard. Could use more testing
   1. Screen reader
   2. Lighthouse / AXE run
4. Needs a proper browser test in browserstack etc.
5. Would be nice to deploy it somewhere
6. With more time i may have added routing and code splitting on those routes
7. In reality the favorites should be "per user"
8. Shakespeare API is rate limited and its not very generous, the solution at the moment is to just use the non translated description
   1. Could we have any retry logic
   2. Could we pay and get a key
   3. Could we use a different service
   4. Could we present a better error message to the user
9. Need an actual loading icon
10. .env shouldnt be committed but im committing for ease, this should be set per environment.
11. The testing is really not exhaustive