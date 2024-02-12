# Requirements

- Node.js
- Node Package Manager

## Tools used:

- React.js
- Cascading Style Sheets (CSS)
- Axios

## Start

- set .env based on env.example
- npm i
- npm run start


## Features

- Login
- Register
- List all pokemons
- Broswe your own collection
- Inspect a pokemon
- Catch a pokemon

## Arcitecture review and differences from requirements:

Did not use Redux or similar state management tool as the scope of the project does not justify bringing in complex global state managers. It might also consume more time to set up properly.

The applciation uses ReactContext instead with the use of "useReducer" hook to manage state with dispatched actions on events.

The application is wrapped into 2 contexts; AuthContext & PokemonContext. One of each containing the auth state & user and the other the list of pokemons and the user's pokemons. These two contexts are handled through dispatched actions from the application.


## Note

Please note that the application is not finished and requires more work.
This application was developed over 14 hours so far insetad of 8

