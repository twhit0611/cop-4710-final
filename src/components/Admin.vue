<template>
    <v-app>
        <v-app-bar
          app
          color="blue darken-3"
          dark>
          <v-btn icon class="hidden-xs-only" :to="{name: 'HomePage'}">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        <v-toolbar-title>Admin Page</v-toolbar-title>
          </v-app-bar>
      <v-container fluid>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1">
                <v-spacer></v-spacer>
                <v-dialog v-model="event_modal" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="secondary" dark v-on="on">Create Event</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Create New Event</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Title" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Event Category" required></v-text-field>
                                    </v-col>
                                     <v-col cols="12" sm="6">
                                        <v-text-field label="Type"  required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-overflow-btn
                                                class="my-2"
                                                :items="admin_RSO"
                                                label="RSO"
                                                item-value="text"
                                            ></v-overflow-btn>                                    
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Description"  required></v-text-field>
                                    </v-col>                  
                                    <v-col cols="12" sm="6">
                                        <v-menu
                                            ref="menu"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            :return-value.sync="date"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="date"
                                                label="Date"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" no-title scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                                            </v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Time, ex: 11:30am" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" >
                                        <vuetify-google-autocomplete
                                            ref="address"
                                            id="map"
                                            classname="form-control"
                                            placeholder="Address"
                                            v-on:placechanged="getAddressData"
                                            country="us"
                                        >
                                        </vuetify-google-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Contact phone number" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Contact email address" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="event_modal = false">Close</v-btn>
                            <v-btn 
                                color="blue darken-1" 
                                text 
                                @click="event_modal = false"
                                v-on:click="submitEvent"
                            >Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog1" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="secondary" dark v-on="on">Create new RSO</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">Create RSO</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Name*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="School*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Description*" required></v-text-field>
                                    </v-col>
                                     <v-col cols="12">
                                        <v-text-field label="Student emails*" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <small>*indicates required field</small>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
                            <v-btn 
                                color="blue darken-1" 
                                text 
                                @click="dialog1 = false"
                                v-on:click="submitRSO">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
        </v-toolbar>
      </v-container>
            <v-container>
            <v-card
                class="mx-auto"
                max-width="300"
                tile >
                <v-card-title>
                    <span class="headline">{{admin_college}}</span>
                </v-card-title>
                <v-list disabled>
                    <v-subheader>Your RSOs</v-subheader>
                    <v-list-item-group v-model="item" color="primary">
                        <v-list-item 
                            v-for="RSO in admin_RSO" 
                            v-bind:key="RSO"
                        >
                            <v-list-item-title v-text="RSO"></v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-container>
    </v-app>
</template>

<script>
export default {
    // add snack bar for successfull creation of events?

    // to autocomplete the address 
    data: function () {
        return {
        address: ''
        }
    },
    // the admin's RSOs
    data: () => ({
        // input the RSO specific to this admin
        admin_RSO: ['tech club', 'spanish club'],
        admin_college: "Insert College",

        // stuff to make the calender to work
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,

        // boolean for the modals
        event_modal: false,
        dialog1: false,
    }),
    mounted() {
        this.$refs.address.focus();
    },
    methods: {
        // submitting new RSO data to database
        // submitRSO {

        // }

        // submitting new event data to database
        // submitEvent {

        // }

        getAddressData: function (addressData, placeResultData, id) {
            // getting the address data to output to the  
            // returns:
            //       street_number, route, locality, 
            //       administrative_area_level_1, country, 
            //       postal_code, latitude, longitude
            this.address = addressData;
        },
    },
}
</script>
