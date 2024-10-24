// https://pokeapi.co/api/v2/pokemon/${pokemonName}


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
  ol.innerHTML = pokemonNamesLIs.join(``);
  
  // replaceChildren ol to the main so when we go 
  // back to the main page, it will go back
  // to what it was
  // cant use the bunnies method because this is an API I guess
  main.replaceChildren(ol);
  
  
  // grab the LIs from the HTML page
  const pokemonLIs = document.querySelectorAll(`li`);
  
  // addEventListener when user clicks on the single LI/Pokemon
  pokemonLIs.forEach((singlePokemonLI) => {

    singlePokemonLI.addEventListener(`click`, async (event) => {

      //event.target.innerText is the string of the pokemon's name
      renderSinglePokemon(event.target.innerText);

    })

  })

}






const renderSinglePokemon = async (pokemonName) => {

   // make a call to the pokeAPI using the pokemon name
   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
   const pokemonDetails = await response.json();

   // rewrite main's innerHTML to string with the name and img
   main.innerHTML = `
   <h2>${pokemonDetails.name}</h2>
   <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name} picture" />
   <img src="${pokemonDetails.sprites.front_shiny}" alt="${pokemonDetails.name} shiny picture" />
   <br>
   <button>Back</button>
   `;


   // grab the button via querySelect
   const button = document.querySelector(`button`);

   // addEventListener to button
   button.addEventListener(`click`, () => {

    renderAllPokemon();

   })


};





renderAllPokemon();








