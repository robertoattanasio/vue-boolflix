var app = new Vue({
    el: '#boolflix',
    data: {
        inputSearch: '',
    },
    methods: {
        sendSearch: function(inputSearch) {
            axios
                .get('https://api.themoviedb.org/3/search/movie?api_key=7fae8a8bc6eec8f4928cbdfba92b7045&language=it-IT&query=' + inputSearch)
                .then((movie => {
                    console.log(movie);
                }))
        }
    }
});