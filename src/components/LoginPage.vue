<template>
    <main>
        <div class="auth__wrap">
            <div class="logo__block">
                <img class="logo__img" src="../../public/logo.svg">
            </div>
            <div class="form__block">
                <h1 class="form__title">Sign in</h1>
                <div class="form__main">
                    <span class="form__span">
                        <label for="email">Email</label>
                        <input id="email" placeholder="ivanov@luxoft.com" v-model="email" type="email">
                    </span>
                    <span class="form__span">
                        <label for="password">Password</label>
                        <input id="password" placeholder="*********" v-model="password" type="password">
                    </span>

                </div>
                <button class="form__submit-button" @click="auth(email, password)">Login</button>
            </div>
        </div>
    </main>
</template>

<script>
    import router from "@/router";
    import axios from 'axios'

    export default {
        name: "LoginPage",
        data: function () {
            return {
                email: null,
                password: null
            }
        },
        methods:{
            auth(email, password) {
                let session_url = 'http://77.234.202.167/api/signin';
                return new Promise((resolve, reject) => {
                    axios({
                        method: 'post',
                        url: session_url,
                        auth: {
                            username: email,
                            password: password
                        }
                    })
                        .then(resp => {
                            const token = resp.data.result.token
                            localStorage.setItem('jwt', token)
                            axios.defaults.headers.common['Authorization'] = token
                            router.push('/')
                            resolve(resp)
                        })
                        .catch(err => {
                            localStorage.removeItem('jwt')
                            reject(err)
                        })
                })
            }
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

    .auth__wrap {
        background: white;
        width: 53vw;
        height: 35vw;
        border-radius: 10px;
        box-shadow: 0px 30px 40px rgba(0, 0, 0, 0.1);
        display: flex;
        max-width: 750px;
        max-height: 500px;
        min-width: 600px;
        min-height: 400px;
    }

    .logo__block {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #004180;
        border-radius: 10px 0 0 10px;
    }

    .logo__img {
        width: 50%;
    }


    .form__block {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .form__title {
        font-weight: 700;
        color: #004180;
    }

    .form__main {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .form__span {
        display: flex;
        flex-direction: column;
        width: 80%;
    }

    label {
        font-size: 13px;
        font-family: "Open Sans";
        color: #919191;
        text-align: left;
        margin-bottom: 5px;
    }

    input {
        font-family: "Open Sans";
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #D4D6D7;
        box-sizing: border-box;
        border-radius: 2px;
        margin-bottom: 20px;
        padding: 10px 20px;
    }

    input:focus {
        outline: none;
        border: 1px solid #004180;
    }

    .form__submit-button {
        font-family: "Open Sans";
        padding: 7px 20px;
        align-self: center;
        border: 1px solid #004180;
        font-size: 14px;
        border-radius: 2px;
        background: #004180;
        color: white;
        cursor: pointer;
    }

</style>