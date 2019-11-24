
<template>
    <v-app>
        <v-app-bar
          app
          color="blue darken-3"
          dark>
            <v-btn icon class="hidden-xs-only" :to="{name: 'HomePage'}">
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Super Admin Page</v-toolbar-title>
          </v-app-bar>
        <v-container fluid>
            <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1" >
                <v-spacer></v-spacer>
                <v-dialog v-model="school_dialog"  max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="secondary" dark v-on="on">Add School</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Events</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="school_name" label="Name*" required></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="school_category" label="Category*"  required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field v-model="school_description" label="Description*" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="school_dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="handleSubmitSchool">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
            </v-toolbar>  
            <v-card
                class="mx-auto"
                max-width="700"
                tile>
                <v-card-title>Approval queue</v-card-title>
                <v-card-text v-for="event in events" v-bind:key="event">
                    <v-card
                        class="mx-auto"
                        max-width="650"
                        outlined
                        tile>
                        <v-list-item two-line>
                          <v-list-item-content>
                                <v-list-item-title>{{event.name}} </v-list-item-title>
                                <v-list-item-subtitle>{{event.category}} </v-list-item-subtitle>
                                <v-list-item-text>
                                    {{event.description}}
                                </v-list-item-text>
                            </v-list-item-content>>
                        </v-list-item>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text>Approve</v-btn>
                        <v-btn color="blue darken-1" text>Reject</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>

export default {
    beforeMount() {
        this.getAllEvents()
    },
    data: () => ({ 
        school_dialog: false,
        events: [],
        school_name: '',
        school_category: '',
        school_description: '',
    }),
    methods : {
        handleSubmitSchool(e) {
            e.preventDefault()
            let url = 'http://localhost:3000/register-school'
            this.$http.post(url, {
                name: this.school_name,
                category: this.school_category,
                description: this.school_description
            })
            .catch((err) => {
                console.error(err)
            })
        },

        getAllEvents(e)
        {   //add new event method
            let url = 'http://localhost:3000/get-unauthorized-events'
            this.$http.post(url)
            .then(response => {
                this.events = response.data.rows
                if (response.data.rows == null) {
                    alert('empty data')
                }
            })
            .catch((err) => {
                return console.error(err)
            })
        },
    }
}
</script>

<style scoped>

</style>