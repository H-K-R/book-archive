// event handaler and Load Data
const searchButton = () => {
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;
    //clear input field
    searchInput.value = '';
    //clear previous results
    document.getElementById('bookContainer').textContent = '';
    //clear previous total number of found results
    document.getElementById('total-count').textContent = '';

    //empty field validation
    const emptyField = document.getElementById('empty-field');
    emptyField.innerText = `No Book Found, Please Write Your Keyword`;
    if (searchText === '') {
        emptyField.style.display = 'block'
    } else {
        emptyField.style.display = 'none'
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displayBook(data.docs));

    }

}

// Display Book Results
const displayBook = books => {
    const filterBooks = books.filter(info => info.cover_i !== undefined && info.author_name !== undefined && info.first_publish_year !== undefined && info.publisher !== undefined);

    const totalFoundResults = document.getElementById('total-count')

    //results found or not validation
    if (filterBooks.length === 0) {
        totalFoundResults.innerText = `No Results Found`
    } else {
        totalFoundResults.innerText = `You Have Found ${filterBooks.length} Results `;
        const booksDiv = document.getElementById('bookContainer');
        filterBooks.slice(0, 20).forEach(filterBook => {

            const div = document.createElement('div')
            booksDiv.classList.add('col')
            div.innerHTML = `
           <div class="card h-50">
           <img style="height:300px;" src="https://covers.openlibrary.org/b/id/${filterBook.cover_i}-M.jpg" class="card-img-top" alt="...">
           <div class="card-body">
             <h3 class="card-title text-primary">${filterBook.title}</h3>
             <h5 class="card-title text-danger">By ${filterBook.author_name[0]}</h5>
             <h6 class="card-title">First Published:${filterBook.first_publish_year} </h6>
             <h6 class="card-title">Publisher:${filterBook.publisher[0]} </h6>
  
           </div>
         </div>
           
           `
            booksDiv.appendChild(div);

        })

    }

}