import React, { useEffect, useState } from "react";

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [alcoholicBase, SetAlcoholicBase] = useState("apricot");
  function handleChange(event) {
    SetAlcoholicBase(event.target.value);
  }

  useEffect(() => {
    fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
        `${alcoholicBase}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDrinks(data.drinks);
      });
  }, [alcoholicBase]);
  //   console.log("Raw", drinks);

  const getStrIngredientNum = (drink) => {
    let hasIngre = true;
    let ingredient = [];
    for (let i = 1; (hasIngre = true); i++) {
      if (!drink["strIngredient" + `${i}`]) {
        hasIngre = false;
        break;
      }
      ingredient.push(drink["strIngredient" + `${i}`]);
    }
    return ingredient.map((item) => {
      return <div>{item}</div>;
    });
  };

  const getStrMessure = (drink) => {
    let hasMeasure = true;
    let measure = [];
    for (let m = 1; (hasMeasure = true); m++) {
      if (!drink["strMeasure" + `${m}`]) {
        hasMeasure = false;
        break;
      }
      measure.push(drink["strMeasure" + `${m}`]);
    }
    return measure.map((item) => {
      return <div>{item}</div>;
    });
  };

  const drinkList = (drink) => {
    // console.log("strDrink", drink.strDrink);
    return (
      <div className='card-stucture'>
        <h2>{drink.strDrink}</h2>
        <div className='img-ingredient-section'>
          <div>
            <img className='cocktail-img' src={drink.strDrinkThumb}></img>
          </div>
          <div className='ingredients-box'>
            <h3>Ingredients</h3>
            <div className='ingre'>
              <div> {getStrMessure(drink)}</div>
              <div> {getStrIngredientNum(drink)}</div>
            </div>
          </div>
        </div>
        <br></br>
        <h3> Instructions</h3>
        <div>{drink.strInstructions}</div>
      </div>
    );
  };

  return (
    <div>
      <div className='main-header'>
        <div className='title'>Pick Your Poison</div>
        <label htmlFor='alcoholicBase' className='Inst'>
          Pick a base 🍹
        </label>
        <br />
        <select
          id='alcoholicBase'
          value={alcoholicBase}
          onChange={handleChange}
          name='alcoholicBase'
          className='alcoholicBase'
        >
          {/* <option value=''>-- choose --</option> */}
          <option value='amaretto'>Amaretto</option>
          <option value='apricot'>Apricot brandy</option>
          <option value='beer'>Beer</option>
          <option value='brandy'>Brandy</option>
          <option value='bourbon'>Bourbon</option>
          <option value='champagne'>Champagne</option>
          <option value='gin '>Gin </option>
          <option value='jack'>Jack Daniels</option>
          <option value='kahlua'>Kahlua</option>
          <option value='margarita'>Margarita</option>
          <option value='rum'>Rum</option>
          <option value='scotch'>Scotch</option>
          <option value='tequila'>Tequila</option>
          <option value='vodka'>Vodka</option>
          <option value='vermouth'>Vermouth</option>
          <option value='whiskey'>Whisky</option>
          <option value='wine'>Wine</option>
          <option value='red'>Red drinks</option>
          <option value='orange'>Orange drinks</option>
          <option value='yellow'>Yellow drinks</option>
          <option value='green'>Green drinks</option>
          <option value='blue'>Blue drinks</option>
          <option value='black'>Black drinks</option>
        </select>
        <br />
        <br />
      </div>
      <div className='card-background'>
        {drinks && drinks.map((drink) => drinkList(drink))}
      </div>
    </div>
  );
}
export default Drinks;
