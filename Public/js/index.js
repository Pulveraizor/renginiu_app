
let eventsList = fetch('/api/events')
.then(response => response.json())
.then(items => {
    for (let item of items) {
        let card = document.createElement('div');
        card.classList.add('card', 'mb-1');
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        let title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = item.name;
        let description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = item.description;
        let date = document.createElement('p');
        date.classList.add('card-text');
        date.textContent = 'Event Date: ' + item.date;
        let type = document.createElement('p');
        type.classList.add('card-text');
        type.textContent = 'Event Type: ' + item.type;
        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(date);
        cardBody.appendChild(type);
        card.appendChild(cardBody);
        document.querySelector('#events_list').appendChild(card);
    }
})
.catch(error => {
    console.error('Error fetching events:', error);
    // Handle errors if any
});