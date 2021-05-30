const apiService = {
  API_KEY: '9331698-e17fc555dd577ca52fdf34a8b',
  BASE_URL: 'https://pixabay.com/api/',
  searchQuery: '',
  pageNumber: 1,
  itemsPerPage: 12,

  fetchImages() {
    return fetch(`${this.BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.itemsPerPage}&key=${this.API_KEY}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("Can't fetch data");
      })
      .then(({hits}) => {
        this.incrementPageNumber();
        return hits;
      });
  },

  resetPageNumber() {
    this.pageNumber = 1;
  },

  incrementPageNumber() {
    this.pageNumber += 1;
  },
};

export default apiService;