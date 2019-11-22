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
                                        <v-text-field label="Title" v-model="event_name" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="event_category"
                                            :items="category"
                                            menu-props="auto"
                                            label="Select Event Category"
                                            hide-details
                                            single-line
                                        ></v-select> 
                                    </v-col>
                                     <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="event_type"
                                            :items="event_type_list"
                                            menu-props="auto"
                                            label="Select Event Type"
                                            hide-details
                                            single-line
                                        ></v-select> 
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-select
                                            v-model="event_RSO_name"
                                            :items="admin_RSO"
                                            menu-props="auto"
                                            label="Select RSO"
                                            hide-details
                                            single-line
                                        ></v-select> 
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Description" v-model="event_description"  required></v-text-field>
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
                                                v-model="event_date"
                                                label="Date"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="event_date" no-title scrollable>
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
                                            v-model="event_address"
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
                                        <v-text-field label="Contact phone number" v-model="event_contact_phone" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field label="Contact email address" v-model="event_contact_email" required></v-text-field>
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
                                v-on:click="handleSubmitEvent"
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
                                        <v-text-field id="name" label="Name*" v-model="rso_name" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field id="school" label="School*" v-model="rso_school" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field id="description" label="Description*" v-model="rso_description" required></v-text-field>
                                    </v-col>
                                     <v-col cols="12">
                                        <v-text-field id="numofemails" label="Student emails*" v-model="rso_student_email" required></v-text-field>
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
                                v-on:click="handleSubmitRSO">Save</v-btn>
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
    data() {
        return {
            // values to pass into database
            event_name: '',
            event_category: '',
            event_type: '',
            event_RSO_name: '',
            event_description: '',
            event_date: new Date().toISOString().substr(0, 10),
            event_time: '',
            event_address: '',
            event_contact_phone: '',
            event_contact_email: '',
            rso_name: '',
            rso_school: '',
            rso_description: '',
            rso_student_email: '',
            rso_student_signatures: 1,

            // calendar stuff
            menu: false,
            menu2: false,
            modal: false,

            // input the RSO specific to this admin
            admin_RSO: ['tech club', 'spanish club'],
            admin_college: "insert College",
            category: ['Social', 'Fundraising', 'Academic', 'Volunteering', 'Career'],
            event_type_list: ['Public', 'Private', 'RSO Event'],
            event_modal: false,
            dialog1: false
        }
    },

    methods: {
        handleSubmitEvent(e) {
            e.preventDefault()
            let url = 'http://localhost:3000/register-event'
            this.$http.post(url, {
                name: this.event_name,
                category: this.event_category,
                type: this.event_type,
                RSO_name: this.event_RSO_name,
                description: this.event_description,
                date: this.event_date,
                time: this.event_time,
                address: this.event_address,
                contact_phone: this.event_contact_phone,
                contact_email: this.event_contact_email
            })
            .catch(error => {
                console.error(error)
            })
            this.event_name=''
            this.event_category=''
            this.event_type=''
            this.event_RSO_name=''
            this.event_description=''
            this.event_event_date=''
            this.event_time=''
            this.event_address=''
            this.event_contact_phone=''
            this.event_contact_email=''
        },

        handleSubmitRSO(e) {
            e.preventDefault()
            let url = 'http://localhost:3000/register-rso'
            this.$http.post(url, {
                name: this.rso_name,
                school: this.rso_school,
                description: this.rso_description,
                student_email: this.rso_student_email,
                student_signatures: this.rso_student_signatures
            })
            .catch(error => {
                console.error(error)
            })
            this.rso_name=''
            this.rso_school=''
            this.rso_description=''
            this.rso_student_email=''
        },

        getAddressData: function (addressData, placeResultData, id) {
            // getting the address data to output to the  
            // returns:
            //       street_number, route, locality, 
            //       administrative_area_level_1, country, 
            //       postal_code, latitude, longitude
            this.event_address = addressData;
        },
    },

    mounted() {
        this.$refs.address.focus();
    },
}
</script>
