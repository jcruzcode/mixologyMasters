//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#cocktail').addEventListener('click', getDrink);

let drinkIndex = 0;

function getDrink() {
    const drink = document.querySelector('input').value;
    const formatName = drink.toLowerCase().split(" ").join("+");
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${formatName}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data); // Display returned object
            startCarousel( data );
        })
        .catch(err => {
            console.log(`error: ${err}`);
        }
        );
}

function nextDrink( data ) {
    drinkIndex++;
    let drinkCount = data.drinks.length;

    if ( drinkIndex >= drinkCount ) {
        drinkIndex = 0;
    }

    displayDrink( data, drinkIndex );
}

function displayDrink( data, index ) {
    const cocktails = data.drinks;

    document.querySelector('h2').innerText = `Cocktail - ${cocktails[index].strDrink}`;
    document.querySelector('#instructions').innerText = cocktails[index].strInstructions;
    document.querySelector('#drink').src = cocktails[index].strDrinkThumb;
    document.querySelector('#ingredients').innerHTML = "";

    let ingred;
    for (let i = 1; i < 16; i++) {
        if (cocktails[index][`strIngredient${i}`]) {
            if (cocktails[index][`strMeasure${i}`]) {
                ingred = cocktails[index][`strIngredient${i}`] + " - " + cocktails[index][`strMeasure${i}`];
            } else {
                ingred = cocktails[index][`strIngredient${i}`];
            }

            document.querySelector(`#ingredients`).insertAdjacentHTML('beforeend', `<li id="item${i}">${ingred}</li>`);
        }
    }
}

function startCarousel( data ) {
    displayDrink( data, drinkIndex );
    setInterval( () => {
        nextDrink( data );

    }, 5000);
}