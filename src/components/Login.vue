<template>
    <div>
        <img src="@/assets/logo.png">
        <h4>Login</h4>
        <form>
            <label for="email">E-mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required autofocus>
            </div>
            <div>
                <label for="password">Password</label>
                <div>
                    <input id="password" type="password" v-model="password" required>
                </div>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">Login</button>
            </div>
        </form>
        <div>
            <h4>Don't have an account?</h4>
            <button type="submit" v-on:click="goToRegister">Register</button>
        </div>
    </div>    
</template>

<script>
    export default {
        data() {
            return {
                email : "",
                password : ""
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('http://localhost:3000/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        let is_admin = response.data.user.is_admin
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)
                        if (localStorage.getItem('jwt') != null) {
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null) {
                                this.$router.push(this.$route.params.nextUrl)
                            }
                            else {
                                if (is_admin==2) {
                                    this.$router.push('superadmin')
                                }
                                if (is_admin==1) {
                                    this.$router.push('admin')
                                }
                                else {
                                    this.$router.push('dashboard')
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                }
            },
            goToRegister(e) {
                this.$router.push('/register')
            }
        }
    }
</script>

<style scoped>
img {
  max-width: 25%;
  max-height: 25%;
  width: auto;
  height: auto;
}

body {
  background-image: url("https://knightnews.com/wp-content/uploads/2017/10/14712758_10157511833500527_1554147307089290995_o-1.jpg");
}
</style>