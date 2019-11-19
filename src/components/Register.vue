<template>
<v-app >
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark >
                <v-btn icon class="hidden-xs-only" :to="{name: 'HomePage'}">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer />   
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="email"
                    label="Email"
                    v-modal="email"
                    name="login"
                    prepend-icon="person"
                    type="email"
                    autofocus
                    required/>
                  <v-text-field
                    id="password"
                    v-modal="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    required />
                </v-form>
               <v-select
                    v-model="account"
                    :items="dropdown"
                    menu-props="auto"
                    label="Select Account Type"
                    hide-details
                    prepend-icon="info"
                    single-line
                ></v-select>  
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :to="{name: 'login'}">Login</v-btn>
                <v-btn color="primary" @click="handleSubmit">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>

    <!-- <div class="main">
        <img src="@/assets/registration.png" class="titleImage">
        <h4>Register</h4>
        <form class="registerForm">
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
            <button type="submit" v-on:click="goToLogin" class="loginButton">Go to login</button>
        </div>
    </div> -->
</template>

<script>
    export default {
        props : ["nextUrl"],
        data(){
            return {
                dropdown: ['Student', 'Admin', 'SuperAdmin' ],
                name : "",
                email : "",
                password : "",
                password_confirmation : "",
                // is_admin : null
                account: '',
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                    let url = "http://localhost:3000/register"
                    // if(this.is_admin == 1) url = "http://localhost:3000/register-admin"
                    // else if(this.is_admin == 2) url = "http://localhost:3000/register-super-admin"
                    if(this.is_admin == 'Admin') url = "http://localhost:3000/register-admin"
                    else if(this.is_admin == 'Super Admin') url = "http://localhost:3000/register-super-admin"
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

<style>
/* img.titleImage {
    display:block;
    max-width: 25%;
    max-height: 25%;
    margin-left: auto;
    margin-right: auto;
    width: auto;
    height: auto;
    padding: 31px;
    background: white;
    border-bottom: 3px solid #e0c600;
}

h4 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    font-size: 120%;
    font-weight: bold;
    border-bottom: 3px solid #e0c600;
    background: black;
    width: 30%;
    color:white;
}

label {
    display: block;
    font-weight: bold;
    border-bottom: 3px solid #e0c600;
    background: black;
    width: 200px;
    margin: auto;
    color: white;
}

input {
    margin: 10px;
    width: 194px;
    background: white;
    border: 3px solid #e0c600;
}

select {
    margin: 10px;
    background: white;
    color: black;
    border: 3px solid #e0c600;
}

button {
    background: black;
    border: 3px solid #e0c600;
    color: white;
    width: 150px;
    font-size: 110%;
    height: 40px;
    margin: 10px;
}

body {
    background-image: url("https://knightnews.com/wp-content/uploads/2017/10/14712758_10157511833500527_1554147307089290995_o-1.jpg");
} */

</style>

