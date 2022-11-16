"use strict";

(function (){

// function renderCoffee(coffee) {
//     var html = '<tr class="coffee">';
//     html += '<td>' + coffee.id + '</td>';
//     html += '<td>' + coffee.name + '</td>';
//     html += '<td>' + coffee.roast + '</td>';
//     html += '</tr>';
//
//     return html;
// }

    function renderCoffee(coffee) {
        var html = '<div class="coffee">';
        html += '<span id="coffeeName">' + coffee.name + '   ' + '</span>';
        html += '<span id="coffeeRoast">' + coffee.roast + '</span>';
        return html;
    }



    function renderCoffees(coffees) {
        var html = '';
        for(var i = 0; i <= coffees.length -1; i++) {
            html += renderCoffee(coffees[i]);
        }
        return html;
    }

    function updateCoffees(e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
        var selectedRoast = roastSelection.value;
        var filteredCoffees = [];

        if (selectedRoast === 'all'){
            tbody.innerHTML = renderCoffees(coffees);
        } else {
            coffees.forEach(function(coffee) {
                // console.log(selectedRoast);
                if (coffee.roast === selectedRoast) {
                    filteredCoffees.push(coffee);
                }
                // console.log(selectedRoast);
            });
            tbody.innerHTML = renderCoffees(filteredCoffees);
        }}



// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
    var coffees = [
        {id: 1, name: 'Light City', roast: 'light'},
        {id: 2, name: 'Half City', roast: 'light'},
        {id: 3, name: 'Cinnamon', roast: 'light'},
        {id: 4, name: 'City', roast: 'medium'},
        {id: 5, name: 'American', roast: 'medium'},
        {id: 6, name: 'Breakfast', roast: 'medium'},
        {id: 7, name: 'High', roast: 'dark'},
        {id: 8, name: 'Continental', roast: 'dark'},
        {id: 9, name: 'New Orleans', roast: 'dark'},
        {id: 10, name: 'European', roast: 'dark'},
        {id: 11, name: 'Espresso', roast: 'dark'},
        {id: 12, name: 'Viennese', roast: 'dark'},
        {id: 13, name: 'Italian', roast: 'dark'},
        {id: 14, name: 'French', roast: 'dark'},
    ];

    var tbody = document.querySelector('#coffees');
    var submitButton = document.querySelector('#submit');
    var roastSelection = document.querySelector('#roast-selection');

    roastSelection.addEventListener('change', updateCoffees);

    tbody.innerHTML = renderCoffees(coffees);

    submitButton.addEventListener('click', updateCoffees);


//  Search Bar Code
    const searchInput = document.querySelector("[data-search]")



    searchInput.addEventListener("input", searchInput => {
        // let resultList = document.querySelector("#result");
        // resultList.innerHTML = "";
        var searchResults = [];
        searchResults.innerHTML = "";
        const value = searchInput.target.value.toLowerCase()
        coffees.forEach(coffee => {
            if (coffee.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || coffee.roast.toLowerCase().indexOf(value.toLowerCase()) !== -1){
                // resultList.innerHTML += `<li class="list-group-item">${coffee.name} ${coffee.roast}</li>`;
                // tbody.innerHTML = renderCoffees(coffee.name);
                searchResults.push(coffee);
            }
        });
        tbody.innerHTML = renderCoffees(searchResults);
    })


    var coffeeForm = document.querySelector('#add-Coffee');

    let userCoffeeAdd = [];
    coffeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let coffeeAdd = {
            id: Date.now(),
            name: document.getElementById('coffee-name').value,
            roast: document.getElementById('coffee-roast').value
        };
        userCoffeeAdd.push(coffeeAdd);
        coffees.push(coffeeAdd);
        tbody.innerHTML = renderCoffees(coffees);
        // cleared form
        document.querySelector('#add-Coffee').reset();
        //saved to localStorage
        localStorage.setItem('AddedCoffee', JSON.stringify(userCoffeeAdd) );
    });

})();
