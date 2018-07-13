import Vuex from 'vuex'
import axios from 'axios'
import globalAxios from 'axios'

const createStore = () => {
    return new Vuex.Store({
        state: {
            albums: [],
            idToken: null,
            userId: null,
            user: null,
            subList: null
        },
        mutations: {
            add (state, payload) {
                state.albums = payload;
            },
            authUser(state, userData) {
                state.idToken = userData.token
                state.userId = userData.userId
                state.user = userData.user
            },
            storeUser(state, user) {
                state.user = user
            },
            clearAuth (state) {
                state.idToken = null,
                state.userId = null
            },
            paidAlbum(state, payload) {
                state.subList = payload 
            }
        },
        actions: {
            setLogoutTime ({commit}, expireTime) {
                setTimeout(() => {
                    commit('clearAuth')
                }, expireTime * 1000)
                this.$router.replace('/signin')
            },
            signup({commit, dispatch}, formData) {
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAISZgYtlnMRsbcKJjcbUZ5MG91d1Z2gP4', {
                    email: formData.email,
                    password: formData.password,
                    returnSecureToken: true
                })
                .then((res) => {
                    console.log(res)
                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        user: res.data.email
                    })
                    const now = new Date()
                    const expiration = new Date(now.getTime() + res.data.expiresIn * 1000)
                    this.$warehouse.set('expiration', expiration)
                    this.$warehouse.set('token', res.data.idToken)
                    this.$warehouse.set('userId', res.data.localId)
                    this.$warehouse.set('user', res.data.email)
                    dispatch('storeUser', formData)
                    // dispatch('setLogoutTime', res.data.expiresIn)
                }).catch((error) => {
                    console.log(error)
                })
            },
            login({commit, dispatch, state}, authData) {
               axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAISZgYtlnMRsbcKJjcbUZ5MG91d1Z2gP4', {
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
                })
                .then((res) => {
                    console.log(res)
                    const now = new Date()
                    const expiration = new Date(now.getTime() + res.data.expiresIn * 1000)
                    this.$warehouse.set('expiration', expiration)
                    this.$warehouse.set('token', res.data.idToken)
                    this.$warehouse.set('userId', res.data.localId)
                    this.$warehouse.set('user', res.data.email)

                    commit('authUser', {
                        token: res.data.idToken,
                        userId: res.data.localId,
                        user: res.data.email
                    })
                    dispatch('storeUser', authData)
                    // dispatch('setLogoutTime', res.data.expiresIn)
                }).catch((error) => {
                    console.log(error)
                })
            },
            tryAutoLogin({commit}) {
                let token  = this.$warehouse.get('token')
                if (!token) {
                    return
                }
                let expiresDate = this.$warehouse.get('expiration')
                const now = new Date()
                if (now >= expiresDate) {
                    return
                }
                let userId = this.$warehouse.get('userId')
                let user = this.$warehouse.get('user')
                commit('authUser', {
                    token: token,
                    userId: userId,
                    user: user
                })
            },
            logout ({commit}) {
                commit('clearAuth')
                this.$warehouse.clearAll()
                this.$router.replace('/signin')
            },
            storeUser({commit, state}, userData) {
                if (!state.idToken) {
                    return
                }
                globalAxios.post('https://itunes-e4def.firebaseio.com/users.json' + '?auth=' + state.idToken, userData)
                    .then((res) => {
                        console.log(res)
                        commit('storeUser', userData.email)
                    }).catch((error) => {
                        console.log(error)
                    })
            },
            fetchUser({commit, state, getters}) {
                if (!getters.token) {
                    return
                }
                globalAxios.get('https://itunes-e4def.firebaseio.com/users.json')
                .then((res) => {
                    console.log(res)
                    const data = res.data
                    const users = []
                    for (let key in data) {
                        const user = data[key]
                        user.id = key
                        users.push(user)
                    }
                    console.log('Users Array: ' + users)
                    commit('storeUser', users[0].email)
                })
                .catch((error) => {
                    console.log(error)
                })
            },
            paidAlbum({commit, state}, payload) {
                const songData = payload
                if (!state.idToken) {
                    return
                }
                globalAxios.post('https://itunes-e4def.firebaseio.com/' + state.userId + '.json/?auth=' + state.idToken, songData)
                    .then((res) => {
                        console.log(res)
                        commit('paidAlbum', songData.artistName)
                    }).catch((error) => {
                        console.log(error)
                    })
            },
            subscribeList({commit, state, getters}, payload) {
                console.log(getters.token)
                if (!getters.token) {
                    return
                }
                globalAxios.get('https://itunes-e4def.firebaseio.com/' + state.userId + '.json/?auth=' + state.idToken)
                    .then((res) => {
                        const data = res.data
                        const albums = []
                        for (let key in data) {
                            const song = data[key]
                            song.id = key
                            albums.push(song)
                        }
                        // this.$warehouse.set('song', res)
                        // console.log(albums)
                        const uniqAlbum = [...new Set(albums.map(a => a.alb))]
                        console.log(uniqAlbum)
                        // commit('paidAlbum', uniqAlbum)
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        },
        getters: {
            user(state) {
                return state.user
            },
            token(state) {
                return state.idToken
            }
        }
    })
}

export default createStore
