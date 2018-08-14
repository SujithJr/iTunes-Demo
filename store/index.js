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
            subList: null,
            paid: null,
            routing: null,
            routeUrl: null
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
            },
            payment(state, payload) {
                state.paid = payload
            },
            routing(state, payload) {
                state.routing = payload
            },
            routeUrl(state, payload) {
                state.routeUrl = payload
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
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=API_KEY', {
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
                    this.$router.replace('/playlist')
                }).catch((error) => {
                    console.log(error)
                })
            },
            login({commit, dispatch, state}, authData) {
               axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=API_KEY', {
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
                    this.$router.replace('/playlist')
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
                    const listArr = []
                    for (let key in data) {
                        const dataOne = data[key].artistName
                        listArr.push(dataOne)
                    }
                    const result = listArr.filter((value, index, array) => {
                        return array.indexOf(value) == index
                    })
                    const songArr = []
                    for (let item in result) {
                        const listItem = result[item]
                        songArr.push({
                            artistName: listItem
                        })
                    }
                    commit('paidAlbum', songArr)
                }).catch((error) => {
                    console.log(error)
                })
            },
            payment({commit, getters, state}) {
                const lists = getters.songList
                const listArr = []
                for (let key in lists) {
                    const data = lists[key].artistName
                    listArr.push(data)
                }
                const result = listArr.filter((value, index, array) => {
                    return array.indexOf(value) == index
                })
                const songArr = []
                for (let item in result) {
                    const listItem = result[item]
                    songArr.push(listItem)
                }
                const para = state.routing
                console.log(songArr, para)
                var found =  songArr.find((value) => {
                    return value === para
                })
                console.log(found)
                if (found === para) {
                    commit('payment', true)
                } else {
                    commit('payment', false)
                }
            },
            payModeTrigger({commit}, payload) {
                commit('payment', payload)
            },
            routing({commit}, payload) {
                commit('routing', payload)
            },
            routeUrl({commit}, payload) {
                commit('routeUrl', payload)
            }
        },
        getters: {
            user(state) {
                return state.user
            },
            token(state) {
                return state.idToken
            },
            songList(state) {
                return state.subList
            },
            userId(state) {
                return state.userId
            },
            payMode(state) {
                return state.paid
            },
            routing(state) {
                return state.routing
            },
            routeUrl(state) {
                return state.routeUrl
            }
        }
    })
}

export default createStore
