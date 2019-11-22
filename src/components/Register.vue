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
                    v-model="email"
                    name="login"
                    prepend-icon="person"
                    type="email"
                    autofocus
                    required/>
                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    required />
                <v-text-field
                    id="password_confirmation"
                    v-model="password_confirmation"
                    label="Password Confirmation"
                    name="password_confirmation"
                    prepend-icon="lock"
                    type="password"
                    required/>
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
</template>

<script>
    export default {
        props : ["nextUrl"],
        data(){
            return {
                dropdown: ['Student', 'Admin', 'SuperAdmin' ],
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                account: '',
                is_admin: 0
            }
        },
        methods : {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password === this.password_confirmation && this.password.length > 0)
                {
                    let url = 'http://localhost:3000/register'
                    if (this.account == 'Student') this.is_admin = 0
                    else if (this.account == 'Admin') this.is_admin = 1
                    else if (this.account == 'SuperAdmin') this.is_admin = 2
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
                    this.password_confirmation = ""

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

