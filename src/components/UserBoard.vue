<template>
    <v-app>
      <v-content>
        <v-row justify="center">
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
                      <v-btn color="blue darken-1" text @click="dialog1 = false">Save</v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>          
          <v-dialog v-model="join_modal" max-width="600px">
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Join RSO</v-btn>
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
        </v-row>
        <v-container v-for="event in events" v-bind:key="event.id">
            <v-card
                class="mx-auto"
                max-width="344"
                outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">
                          <v-row>
                            <v-col >RSO</v-col>
                            <v-col >School</v-col>
                          </v-row>
                        </div>
                        <v-list-item-title class="headline mb-1">Event name </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-card-actions>
                  <v-spacer></v-spacer>
                    <v-btn text :to="{name: 'events'}" >Info</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
      </v-content>
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

    // input events from the database and for loop output
    events: [
      {
        id: 1,
        title: 'BBQ'
      },
      {
        id: 2,
        title: 'party'
      },
      {
        id: 3,
        title: 'dinner'
      },
    ],
  })
}
</script>