// Function to fetch data and create HTML cards
function fetchDataAndCreateCards() {
    const cardContainer = document.getElementById('card-container');
  
    // Show loading indicator
    cardContainer.innerHTML = '<p>Loading...</p>';
  
    fetch('https://makemytrip-backend-w2d2.onrender.com/cities')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the parsed JSON data
        cardContainer.innerHTML = ''; // Clear the loading indicator

        // Function to create a card element
        function createCard(city) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${city.image}" alt="${city.city}" class="card-image">
                <h2>${city.city.toUpperCase()}</h2>
                <p>${city.description.toUpperCase()}</p>
            `;
            cardContainer.appendChild(card);
        }

        // Display all cities if searchTerm is empty
        function displayAllCities() {
            data.forEach(city => {
                createCard(city);
            });
        }

        // Initially display all cities
        displayAllCities();

        // Add event listener for input in search field
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.trim().toUpperCase(); // Trim and convert to uppercase
            
            // Clear existing cards
            cardContainer.innerHTML = '';

            // If searchTerm is empty, display all cities
            if (searchTerm === '') {
                displayAllCities();
            } else {
                // Filter cities based on current search term
                const filteredCities = filterCities(data, searchTerm);

                // If no matching cities found, display "No items available"
                if (filteredCities.length === 0) {
                    const noItemsMessage = document.createElement('p');
                    noItemsMessage.textContent = 'Gareeb hai bhai tu!';
                    noItemsMessage.className = 'no-items-message';
                    cardContainer.appendChild(noItemsMessage);
                } else {
                    // Create cards for filtered cities
                    filteredCities.forEach(city => {
                        createCard(city);
                    });
                }
            }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        cardContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
      });
}

// Helper function to filter cities based on search term
function filterCities(cities, searchTerm) {
    return cities.filter(city => {
        const cityTitle = city.city.toUpperCase();
        const cityDescription = city.description.toUpperCase();
        return cityTitle.includes(searchTerm) || cityDescription.includes(searchTerm);
    });
}

// Call the function to fetch data and create cards initially
fetchDataAndCreateCards();
