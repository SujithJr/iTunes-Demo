import axios from 'axios';

export default function( {params, route, store} ) {
    const root = route.params.id
    store.dispatch('routing', root)
}
