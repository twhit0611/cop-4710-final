<template>
<v-app>
      <v-content>
        <v-row justify="center">
                <v-dialog v-model="event_modal" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">Create Event</v-btn>
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
                                                :items="dropdown_RSO"
                                                label="RSO"
                                                item-value="text"
                                            ></v-overflow-btn>                                    </v-col>
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
                                                placeholder="Location"
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
                            <v-btn color="blue darken-1" text @click="event_modal = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialog1" max-width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="secondary" dark v-on="on">Create RSO</v-btn>
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
                            <v-btn color="blue darken-1" text @click="dialog1 = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>   
      </v-content>
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
        dropdown_RSO: ['tech club', 'spanish club'],
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        event_modal: false,
        dialog1: false,
    }),

     mounted() {
        this.$refs.address.focus();
    
  },

    methods: {
      getAddressData: function (addressData, placeResultData, id) {
        // getting the address data 
        this.address = addressData;
        },
    },
  
}
</script>
