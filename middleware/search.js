import axios from 'axios';

export default function( {params, store, route} ) {

    return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
        .then((response) => {
            // console.log(response.data.results);
            store.commit('add', response.data.results)
            const root = route.params.id
            store.dispatch('routing', root)
            store.dispatch('payment')
        });
}
