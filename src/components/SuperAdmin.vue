
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
                        <v-btn color="primary" dark v-on="on">Add School</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Add Events</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field id="name" label="Name*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field id="location" label="Location*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field id="abbreviation" label="Abbreviation*"  required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field id ="numberofstudents" label="Number of Student*"  required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field id ="type" label="Type*"  required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field id= "description" label="Description*" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="school_dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="AddingNewEvent">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
            </v-toolbar>  
          </v-container> 
        <v-container>
            <v-card
                class="mx-auto"
                max-width="700"
                tile>
                <v-card-title>
                    Approval queue
                </v-card-title>
                <v-card-text v-for="event in events" v-bind:key="event">
                    <v-card
                        class="mx-auto"
                        max-width="650"
                        outlined
                        tile>
                        <v-list-item two-line>
                          <v-list-item-content>
                                <v-list-item-title>{{event.name}} </v-list-item-title>
                                <v-list-item-title>Event type: </v-list-item-title>
                                <v-list-item-title>Number of Students: {{event.numberofstudents}} </v-list-item-title>
                                <v-list-item-title>Abbreviation: {{event.abbreviation}} </v-list-item-title>
                                <v-list-item-text>
                                    Description: {{event.description}}
                                </v-list-item-text>
                            </v-list-item-content>>
                        </v-list-item>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn >Approve</v-btn>
                        <v-btn >Reject</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>

import axios from 'axios';

export default {
        
    data: () => ({ 

            // boolean for modal
        school_dialog: false,

        // inporting events without rso and approval 
        // to be approved by the superadmin 
        //we need to replace these ids with those in the sql database
        events: [
            {
                name: "",
                location: "",
                abbreviation: "",
                numberofstudents:"" ,
                type:"",
                description: ""
            }
        ],
    }),

    methods : {

        addEvents(newEvent) {
            this.events = [...this.events, newEvent]
        },
        deleteEvent(id){
            this.events = this.events.filter(events => events.id !== id)
        },
        AddingNewEvent(e)
        {   //add new event method

            e.preventDefault();
            //want to remain authenticated when adding events
                                
                    const Config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Accept': 'application/json'
                            }
                        }
                
                axios.post('http://localhost:3000/events', {
                    name: this.name,
                    location: this.location,
                    abbreviation: this.abbreviation,
                    numberofstudents: this.numberofstudents,
                    type: this.type,
                    description: this.description
                }, Config)
                .then(
                    res => {
                        this.events = res.data,
                        addEvents(res.data)
                    }
                )
                .catch(
                    err => console.log("Could not create new event with error: " + JSON.stringify(err))
                );

        },
         DeletingEvent() {
             //want to remain authenticated when deleting events
            if (localStorage.getItem('jwt') != null) {
            axios.delete('http://localhost:3000/events', {
                name: this.name,
                location: this.location,
                abbreviation: this.abbreviation,
                numberofstudents: this.numberofstudents,
                description: this.description
            })
            .then(
                res => {
                    this.events = res.data,
                    deleteEvent(res.data)
                }
            )
            .catch(
                err => console.log("Could not Delete event in the database with error: " + JSON.stringify(err))
            )
            }
        }
    },
    
}
</script>

<style scoped>

</style>