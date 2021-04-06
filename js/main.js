var app = new Vue({
    el: '#boolflix',
    data: {
        inputSearch: '',
        movieList: []
    },

    methods: {
        sendSearch: function(inputSearch) {
            if (inputSearch != '') {
                axios
                    .get('https://api.themoviedb.org/3/search/movie?api_key=7fae8a8bc6eec8f4928cbdfba92b7045&language=it-IT&query=' + inputSearch)
                    .then((movieSearchList => {
                        console.log(movieSearchList);
                        this.movieList = movieSearchList.data.results;
                    }))
            } else {
                this.movieList = [];
            }
        }
    }
});