This project is a front-end piece of a full-stack application. The application allows the user to login/register/logout. Once the user has registered or logged in they can see a list of pokemons.
In the app there are ways to see, filter or interact with the list of pokemons.

#To run:
- npm i
- fill in .env follwing .env.example
- npm run start

Features
1. Searching:
   - Search by name (text input)
   - Filter by pokemon type (dropdown)
   - Set the number of pokemons in the list to view (20,50,100) (dropdown)
   - Show only selected pokemons (checkbox)
   - Show only the user's collection (calls protected APIs) (checkbox)

2. List functionalities
   - Indicate loading
   - Incicate empty list
   - List Pokemons
  
3. List Item functionalities
   - Item is bordered if the user has the pokemon in his pokedex
   - Item is hightlighted if the user hovers over or selected the pokemon in the list
   - Item can be selected/deselected then filtered
   - Item can be inspected => Navigates to Pokemon detail page
  
4. Pokemon Details page
   - Image of the pokemon and a few details
   - Border image if the pokemon is in users pokedex
   - Action button to catch or release a pokemon (calls protected APIs)

##Tools:
React, TypeScript, Redux RTK

##Purpose of the project:

The purpose of the project is to learn how to structure React applications and Redux's RTK including back-end services. The application handles auth state and pokemon list state in a React Context API with useReducer hook as a data layer over the search and list components, making it easy to scale with additional functionalities and manage.
