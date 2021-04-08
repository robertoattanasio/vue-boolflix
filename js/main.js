var app = new Vue({
    el: '#boolflix',
    data: {
        inputSearch: '',
        movieList: [],
    },

    methods: {
        sendSearch: function(inputSearch) {
            if (inputSearch != '') {
                this.movieList = [];
                // CHIAMATA AXIOS FILM
                axios
                    .get('https://api.themoviedb.org/3/search/movie', {
                        params: {
                            api_key: '7fae8a8bc6eec8f4928cbdfba92b7045',
                            language: 'it-IT',
                            query: this.inputSearch
                        }
                    })
                    .then((movieSearchList => {
                        movieSearchList.data.results.forEach(movie => {
                            movie.vote_average = Math.ceil(movie.vote_average / 2);
                            movie.contentType = 'Film';
                            this.movieList.push(movie);
                        });
                    }))


                // CHIAMATA AXIOS SERIE TV
                axios
                    .get('https://api.themoviedb.org/3/search/tv', {
                        params: {
                            api_key: '7fae8a8bc6eec8f4928cbdfba92b7045',
                            language: 'it-IT',
                            query: this.inputSearch
                        }
                    })
                    .then((seriesSearchList => {
                        seriesSearchList.data.results.forEach(series => {
                            series.vote_average = Math.ceil(series.vote_average / 2);
                            series.title = series.name;
                            series.original_title = series.original_name;
                            delete series['name'];
                            delete series['original_name'];
                            series.contentType = 'Serie TV';

                            this.movieList.push(series);

                        });
                    }));

            } else {
                this.movieList = [];
            }
        },

        filterList: function(filterType) {
            if (filterType == 'Film') {
                this.movieList = this.movieList.filter(item => item.contentType == "Film");
            } else if (filterType == 'Serie TV') {
                this.movieList = this.movieList.filter(item => item.contentType == "Serie TV");

            };

        }
    }
});