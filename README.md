# Requirements

- Node.js
- Node Package Manager

## Tools used:

- React.js
- Cascading Style Sheets (CSS)
- Axios

## Start

- npm i
- npm run start


## Features

- Login
- Register (auto logs the user into the app) ! In this case no JWT is issued by the services (yet) !
- List all pokemons
- Inspect a pokemon
- Catch a pokemon

## Tests

Had no time for test coverage the test found in App.test.tsx is just an example written by me.


## Arcitecture review and differences from requirements:

Did not use Redux or similar state management tool as the scope of the project does not justify bringing in complex global state managers. It might also consume more time to set up properly.

The applciation uses ReactContext instead with the use of "useReducer" hook to manage state with dispatched actions on events.

The application is wrapped into 2 contexts; AuthContext & PokemonContext. One of each containing the auth state & user and the other the list of pokemons and the user's pokemons. These two contexts are handled through dispatched actions from the application.


## Note

Please note that the application is not finished and requires more work.
The application hasn't been tested, refactored or prepared in any flavor for production yet.
Some APIs are still directed to localhost instead of using .env to get the correct URLs.

