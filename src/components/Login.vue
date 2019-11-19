<template>
<v-app >
    <v-content>
      <v-container
        fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark >
                 <v-btn icon class="hidden-xs-only" :to="{name: 'HomePage'}">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />   
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="email"
                    label="Login"
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
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :to="{name: 'register'}">Register</v-btn>
                <v-btn color="primary" @click="handleSubmit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>

    <!-- <div>
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
    </div>     -->
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
                    .catch( (error) => {
                        console.log("Trouble authenticating user with error: " + JSON.stringify(error));
                    });
                }
            },
            goToRegister(e) {
                this.$router.push('/register')
            }
        }
    }
</script>

<style>
/* img {
  max-width: 25%;
  max-height: 25%;
  width: auto;
  height: auto;
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
    border: 3px solid #e0c600;
}

select {
    margin: 10px;
    background: black;
    color: white;
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