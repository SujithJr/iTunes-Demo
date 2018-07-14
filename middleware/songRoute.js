import axios from 'axios';

export default function ({ params, store, route }) {

    return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
        .then((response) => {
            const array = response.data.results
            console.log(array);
            const urlArr = []
            for (let album in array) {
                const el = array[album]
                urlArr.push(el.artistViewUrl)
            }
            console.log(urlArr.slice(0, 1))
            store.commit('routeUrl', urlArr.slice(0, 1))
        });
}
