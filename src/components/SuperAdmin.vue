
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
                                        <v-text-field label="Name*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Location*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Abbreviation*"  required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field label="Number of Student*"  required></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Description*" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="school_dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" text @click="school_dialog = false">Save</v-btn>
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
                                <v-list-item-title>Event type </v-list-item-title>
                                <v-list-item-text>
                                    Description
                                </v-list-item-text>
                            </v-list-item-content>
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
export default {
        
    data: () => ({
        // boolean for modal
        school_dialog: false,

        // inporting events without rso and approval 
        // to be approved by the superadmin 
        events: [
            {
                id: 1,
                name: 'BBQ'
            },
            {
                id: 2,
                name: 'party'
            },
            {
                id: 3,
                name: 'dinner'
            },
        ],
    }),
}
</script>

<style scoped>

</style>