<template>
    <v-app>
      <v-content>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
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
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="Organization*" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field label="School*" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Title*" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Description*"  required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-menu
                                        ref="menu1"
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        max-width="290px"
                                        min-width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="dateFormatted"
                                            label="Date"
                                            persistent-hint
                                            @blur="date = parseDate(dateFormatted)"
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field label="Time*" required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <v-container>
        <v-card
            class="mx-auto"
            max-width="344"
            outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">blah</div>
                    <v-list-item-title class="headline mb-1">blah</v-list-item-title>
                    <v-list-item-subtitle>blah</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions>
                <v-btn text>RSVP</v-btn>
                <v-btn text>Info</v-btn>
            </v-card-actions>
        </v-card>
        </v-container>
      </v-content>
    </v-app>
</template>

<script>
export default {

    data: vm => ({
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      dialog: false,
    }),

    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
    },

    methods: {
      formatDate (date) { if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) { if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    },
  }
</script>