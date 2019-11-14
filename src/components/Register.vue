<template>
    <div>
        <img src="@/assets/registration.png">
        <h4>Register</h4>
        <form>
            <label for="name">Name</label>
            <div>
                <input id="name" type="text" v-model="name" required autofocus>
            </div>

            <label for="email" >E-Mail Address</label>
            <div>
                <input id="email" type="email" v-model="email" required>
            </div>

            <label for="password">Password</label>
            <div>
                <input id="password" type="password" v-model="password" required>
            </div>

            <label for="password-confirm">Confirm Password</label>
            <div>
                <input id="password-confirm" type="password" v-model="password_confirmation" required>
            </div>

            <label for="password-confirm">What is this account's type?</label>
            <div>
                <select v-model="is_admin">
                    <option value=2>Super-Admin</option>
                    <option value=1>Admin</option>
                    <option value=0>User</option>
                </select>
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Register
                </button>
            </div>
        </form>
        <div>
            <h4>Already have an account?</h4>
            <button type="submit" v-on:click="goToLogin">Go to login</button>
        </div>
    </div>
</template>

<script>
    export default {
        props : ["nextUrl"],
        data(){
            return {
                name : "",
                email : "",
                password : "",
                password_confirmation : "",
                is_admin : null
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                    let url = "http://localhost:3000/register"
                    if(this.is_admin == 1) url = "http://localhost:3000/register-admin"
                    else if(this.is_admin == 2) url = "http://localhost:3000/register-super-admin"
                    this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
                    })
                    .then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)
                        if (localStorage.getItem('jwt') != null){
                            this.$emit('loggedIn')
                            if(this.$route.params.nextUrl != null){
                                this.$router.go(this.$route.params.nextUrl)
                            }
                            else{
                                this.$router.go('/')
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
                } 
                else {
                    this.password = ""
                    this.passwordConfirm = ""

                    return alert("Passwords do not match or no input.")
                }
            },
            goToLogin(e) {
            this.$router.push('/login')
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
</style>
