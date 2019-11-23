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

    <v-container fluid >
      <v-data-iterator
          :items="events"
          :search="search"
          hide-default-footer>  
        <template v-slot:header> 
          <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
            justify="space-around">

            <v-menu>
              <template v-slot:activator="{on: menu}">
                 <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                    <v-btn icon class="hidden-xs-only" v-on="{ ...tooltip, ...menu }">
                      <v-icon>menu</v-icon>
                    </v-btn>
                  </template>
                    <span> Click to add events or join RSO</span>
                </v-tooltip>
              </template>
              <v-list>
                <v-list-item>

                  <v-btn color="secondary" text @click.stop="dialog1=true">Create new RSO</v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn color="secondary" text @click.stop="create_event=true">Create Unaffilated Event</v-btn>
                </v-list-item>

                  <v-dialog v-model="dialog1" max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Create RSO</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                              <v-row>
                                  <v-col cols="12" sm="6" md="4">
                                      <v-text-field id="name" label="Name*" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12" sm="6" md="4">
                                      <v-text-field id="school" label="School*" required></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                      <v-text-field id="description" label="Description*" required></v-text-field>
                                  </v-col>
                                    <v-col cols="12">
                                      <v-text-field id="numberofemails" label="Student emails*" required></v-text-field>
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

                  <v-dialog v-model="create_event" max-width="600px">
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
                                <v-select
                                    v-model="cat"
                                    :items="catergory"
                                    menu-props="auto"
                                    label="Select Event Category"
                                    hide-details
                                    single-line
                                ></v-select> 
                            </v-col>
                              <v-col cols="12" sm="6">
                                <v-select
                                    v-model="type"
                                    :items="event_type"
                                    menu-props="auto"
                                    label="Select Event Type"
                                    hide-details
                                    single-line
                                ></v-select> 
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
                            <v-btn color="blue darken-1" text @click="create_event = false">Close</v-btn>
                            <v-btn 
                                color="blue darken-1" 
                                text 
                                @click="create_event = false"
                                v-on:click="submitEvent"
                            >Save</v-btn>
                        </v-card-actions>
                      </v-card>
                  </v-dialog> 
              </v-list>
              
              </v-menu>
             <v-select
                v-model="join_rso"
                flat
                solo-inverted
                hide-details
                :items="RSO_list"
                prepend-inner-icon="add"
                label="Join RSO"
              ></v-select>
            <v-spacer></v-spacer>
           <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="event_type"
                prepend-inner-icon="search"
                label="Sort"
                clearable
              ></v-select>
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

            
            <template v-slot:extension>
              <v-tabs
                v-model='tab'
                background-color="transparent" >
                <v-tabs-slider color="yellow"></v-tabs-slider>

                <v-tab >Your Events</v-tab>
                <v-tab>Your Organizations</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          </template>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-row >
              <v-col 
                v-for="event in events" 
                v-bind:key="event.id"
                cols="12"
                sm="6"
                md="4"
                lg="3">
                <v-card>
                    <v-list-item >
                        <v-list-item-content>
                            <div class="overline mb-4">
                              <v-row>
                                <v-col>{{event.rso}}</v-col>
                                <v-col>{{event.date}}</v-col>
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
          </v-tab-item>
          <v-tab-item>
            <v-row>
              <v-col 
                v-for="rso in RSO_list" 
                v-bind:key="rso"
                cols="12"
                sm="6"
                md="4"
                lg="3">
                <v-card>
                    <v-list-item >
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">{{rso}} </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
        </v-data-iterator>
        </v-container>
    </v-app>
</template>

<script>
export default {
  data: () => ({

    tab: null,
    // complete list of RSO in the student school
    RSO_list: ['Spanish Club', 'Hack@UCF', "IEEE"],

    // boolean for modals
    join_modal: false,
    dialog1: false,
    create_event: false,

    menu: false,
    modal: false,
    menu2: false,

    // v-model for sorting by college
    sortBy: '',
    join_rso: '',
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