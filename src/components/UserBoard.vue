<template>
    <v-app>
      <v-app-bar
          app
          color="blue darken-3"
          dark>
          <v-btn icon class="hidden-xs-only" :to="{name: 'HomePage'}">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          <v-toolbar-title>Event Feed</v-toolbar-title>
      </v-app-bar>

    <v-container fluid>
      <v-data-iterator
          :items="events"
          :search="search"
          hide-default-footer>  
        <template v-slot:header> 
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1">

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
                                  <v-text-field id="numberofemails" label="Student emails*" v-model="rso_student_email" required></v-text-field>
                              </v-col>
                          </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog1 = false" v-on:click="handleSubmitRSO">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>          
            <v-spacer></v-spacer>
            <v-dialog v-model="join_modal" max-width="600px">
              <template v-slot:activator="{ on }">
                  <v-btn color="secondary" dark v-on="on">Join RSO</v-btn>
              </template>
              <v-card>
                  <v-card-title>
                      <span class="headline">Join RSO</span>
                  </v-card-title>
                  <v-card-text>
                    <li v-for="RSO in RSO_list" v-bind:key="RSO">
                      <v-btn >{{RSO}}</v-btn>
                    </li>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="join_modal = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="join_modal = false">Save</v-btn>
                  </v-card-actions>
              </v-card>
            </v-dialog>  
            <v-spacer></v-spacer>

            <v-dialog v-model="create_event" max-width="600px">
              <template v-slot:activator="{ on }">
                  <v-btn color="secondary" dark v-on="on">Create Unaffilated Event</v-btn>
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
                            <v-col cols="12">
                                <v-text-field label="Description" v-model="event_description" required></v-text-field>
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
                                    ref="address"
                                    id="map"
                                    classname="form-control"
                                    placeholder="Address"
                                    v-on:placechanged="getAddressData"
                                    country="us"
                                    v-model="event_address"
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
                    <v-btn color="blue darken-1" text @click="create_event = false">Close</v-btn>
                    <v-btn 
                        color="blue darken-1" 
                        text 
                        @click="create_event = false"
                        v-on:click="handleSubmitEvent"
                    >Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> 
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="Search"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="college"
                prepend-inner-icon="search"
                label="College"
              ></v-select>
            
          </v-toolbar>
          </template>
            
          <template >
            <v-row>
              <v-col 
                v-for="event in events" 
                v-bind:key="event.id"
                cols="12"
                sm="6"
                md="4"
                lg="3">
                <v-card>
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div class="overline mb-4">
                              <v-row>
                                <v-col >RSO</v-col>
                                <v-col >school</v-col>
                              </v-row>
                            </div>
                            <v-list-item-title class="headline mb-1">{{event.name}} </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                        <v-btn text :to="{name: 'events'}" >Info</v-btn>
                    </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
        </v-container>
    </v-app>
</template>

<script>
export default {
  data: () => ({
    // complete list of RSO in the student school
    RSO_list: ['tech club', 'spanish club'],

    // boolean for modals
    join_modal: false,
    dialog1: false,
    create_event: false,

    menu: false,
    modal: false,
    menu2: false,

    // v-model for sorting by college
    sortBy: '',
    search: '',
    category: [ 'Social', 'Fundrasing', 'Academic', 'Volunteering', 'Carrer'],
    event_type_list: ['Public', 'Private', 'RSO Event' ],

    // list of avaliable college to sort thru
    college: ['UCF','USF'],

    // input events from the database and for loop output
    events: [],

    // data to be passed to create an event
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
    rso_student_emails: '',
    rso_student_signatures: 1
  }),

  mounted() {
    this.$refs.address.focus()
  },

  beforeMount() {
    this.getAllEvents()
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
     this.address = addressData;
    },

    getAllEvents() {
      this.$http.post('http://localhost:3000/get-all-events')
      .then(response => {
        if (response.data.rows == null) {alert('No events found.')}
        response.data.rows.forEach((element, i) => {
          if (element.RSO_name != '' || element.admin_approved != null) {
            this.events.push(element)
          }
        })
      })
      .catch(err => {
        return console.error(err)
      })
    }
  }
}
</script>