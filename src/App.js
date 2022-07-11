import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

// string format function to dynamically replace the API query string search string
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
  function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
      var t = typeof arguments[0];
      var key;
      var args = ("string" === t || "number" === t) ?
        Array.prototype.slice.call(arguments)
        : arguments[0];

      for (key in args) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
      }
    }

    return str;
  };

const App = () => {
  const APP_ID = "39ce907a";
  const APP_KEY = "04142aa664d97d17d0789435e3393877";
  const exampleRequest =
    `https://api.edamam.com/search?q={0}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const dummyRecipes = localStorage.getItem('DummyRecipes');
    if (dummyRecipes === null)
      getRecipes('chicken');
    else {
      setRecipes(JSON.parse(dummyRecipes).hits);
    }
  }, []);

  const getRecipes = async (searchString) => {
    let newRequest = exampleRequest.formatUnicorn(searchString);
    const response = await fetch(newRequest);
    const data = await response.json();
    localStorage.setItem('DummyRecipes', JSON.stringify(data));
    setRecipes(data.hits);
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleSearchClick = (e) => {
    e.preventDefault();
    getRecipes(search);
    setSearch('');
  }

  return (
    <div className='App'>
      <form className='search-form'>
        <input
          type="text"
          className='search-bar'
          value={search}
          onChange={(e) => updateSearch(e)}></input>
        <button type='submit' className='search-button' onClick={(e) => handleSearchClick(e)}>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map((recipe, index) => (
          <Recipe
            key={index}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            imageUrl={recipe.recipe.image}
            imageAlt={recipe.recipe.label + ' Image'}
            ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  );
}

export default App;
