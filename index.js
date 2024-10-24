// https://pokeapi.co/api/v2/pokemon/${pokemonName}
// DO NOT FORGET to reduce width of LIs in the css to prevent clicking on opposite side of the page


// grab the main element and make it global so it can be used in all functions
const main = document.querySelector(`main`);

// fetch the pokemon from the API, don't forget async/await
const getAllPokemon = async () => {

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`); // grabs the API
  const responseJSON = await response.json(); // converts API call into legible array/object format ( list/dictionary )
  const allPokemon = responseJSON.results; // responseJSON.results is the array of pokemon names and their details
  
  return allPokemon;

}





const renderAllPokemon = async () => {

  // await the getAllPokemon function so it can fully get all the Pokemon
  // before we start grabbing things from the page
  const allPokemon = await getAllPokemon();

  // create an LI for each pokemon name
  const pokemonNamesLIs = allPokemon.map((singlePokemon) => {
    return `<li>${singlePokemon.name}</li>`
  })

  // create the ol via createElement
  const ol = document.createElement(`ol`);
    
  // append the LI to the ol via innerHTML because the LIs have li tags
  ol.innerHTML = pokemonNamesLIs.join(``); // join(``) is used to get rid of all the commas separating the elemnts in the array
  
  // replaceChildren ol to the main so when we go back to the main page, it will go back to what it was
  // Cant use the bunnies method because this is an API I guess
  // Does replaceChildren replace ALL elements within main with the newly created ol??????
  main.replaceChildren(ol);
  
  
  // grab the LIs ( that was just appended via replaceChildren ) from the HTML page
  const pokemonLIs = document.querySelectorAll(`li`);
  
  // addEventListener when user clicks on the single LI/Pokemon
  pokemonLIs.forEach((singlePokemonLI) => {
    singlePokemonLI.addEventListener(`click`, async (event) => {   // may not have to be async to work
      //event.target.innerText is the string of the pokemon's name within the LI
      renderSinglePokemon(event.target.innerText);
    })

  })

}






const renderSinglePokemon = async (pokemonName) => {

   // make a call to the pokeAPI using the pokemon name that was passed in
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
   const pokemonDetails = await response.json();

   // rewrite main's innerHTML into a string with the name, img, and button to go back to main page
   main.innerHTML = `
   <h2>${pokemonDetails.name}</h2>
   <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name} picture" />
   <img src="${pokemonDetails.sprites.front_shiny}" alt="${pokemonDetails.name} shiny picture" />
   <br>
   <button>Back</button>
   `;
  
   // grab the button via querySelect
   const button = document.querySelector(`button`);

   // addEventListener to button so when clicked, it can render all the pokemon via renderAllPokemon function
   button.addEventListener(`click`, () => {
    renderAllPokemon();
   })


};



renderAllPokemon();








