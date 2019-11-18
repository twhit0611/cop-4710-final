
<template>
<v-app>
      <v-content>
    <v-row justify="center">
            <v-dialog v-model="dialog"  max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on">Add School</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Add School</span>
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
      </v-content>
      <v-content>
          <v-card
                class="mx-auto"
                max-width="700"
                outlined
                elevation="5"
                tile>
            <v-card-title>
                Approval queue
            </v-card-title>
            <v-card-text>
                <v-card
                class="mx-auto"
                max-width="650"
                outlined
                tile>
                <v-list-item two-line>
                    <v-list-item-content>
                        <v-list-item-title>Event Name </v-list-item-title>
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
      </v-content>
</v-app>
</template>

<script>
export default {
        
    data: () => ({
      dialog: false,
    }),
}
</script>

<style scoped>

</style>