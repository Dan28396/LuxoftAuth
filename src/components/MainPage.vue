<template>
    <main>
        <h1>Server message: <span>{{message}}</span></h1>
        <button class="logout" @click="logout()">Logout</button>
    </main>
</template>

<script>
    import axios from 'axios'
    import router from "@/router";

    export default {
        name: "MainPage",
        data: function () {
            return {
                message: null
            }
        },
        methods: {
            get_project() {
                let session_url = 'http://77.234.202.167/api/project/1';
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'get',
                        url: session_url,
                        headers: {'Authorization': 'Bearer ' + localStorage.getItem('jwt')}
                    })
                        .then(resp => {
                            this.message = resp.data.response.title
                            resolve(resp)
                        })
                        .catch(err => {
                            localStorage.removeItem('jwt')
                            router.push('/auth')
                            reject(err)
                        })
                })
            },
            logout() {
                return new Promise((resolve) => {
                    localStorage.removeItem('jwt')
                    delete axios.defaults.headers.common['Authorization']
                    router.push('/auth')
                    resolve()
                })
            },
        },
        mounted() {
            this.get_project()
        }
    }
</script>

<style scoped>
    main {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #F8F8F8;
    }

    h1 {
        font-size: 48px;
    }

    span {
        font-style: italic;
    }

    .logout {
        position: absolute;
        bottom: 30px;
        right: 30px;
        font-family: "Open Sans";
        padding: 10px 30px;
        align-self: center;
        border: 1px solid #004180;
        font-size: 16px;
        border-radius: 2px;
        background: #004180;
        color: white;
        cursor: pointer;
    }
</style>