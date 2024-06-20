document.addEventListener('DOMContentLoaded', function() {
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

        // Function to display all cities
        function displayAllCities() {
          cardContainer.innerHTML = '';
          data.forEach(createCard);
        }

        // Initially display all cities
        displayAllCities();

        // Add event listener for input in search field
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.trim().toUpperCase(); // Trim and convert to uppercase
            console.log(searchTerm);
            // If searchTerm is empty, display all cities
            if (searchTerm === '') {
              displayAllCities();
            } else {
              // Filter cities based on current search term
              const filteredCities = filterCities(data, searchTerm);

              // If no matching cities found, display "No items available"
              if (filteredCities.length === 0) {
                const noItemsMessage = document.createElement('p');
                noItemsMessage.textContent = 'City not found!';
                noItemsMessage.className = 'no-items-message';
                cardContainer.innerHTML = ''; // Clear existing cards
                cardContainer.appendChild(noItemsMessage);
              } else {
                // Create cards for filtered cities
                cardContainer.innerHTML = ''; // Clear existing cards
                filteredCities.forEach(createCard);
              }
            }
          });
        } else {
          console.error('Search input element not found');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        cardContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
      });
  }

  // Helper function to filter cities based on search term
  function filterCities(cities, searchTerm) {
    return cities.filter(city =>
      city.city.toUpperCase().includes(searchTerm) ||
      city.description.toUpperCase().includes(searchTerm)
    );
  }

  // Call the function to fetch data and create cards initially
  fetchDataAndCreateCards();
});
