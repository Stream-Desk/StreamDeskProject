<template>
  <v-main>
    <bar></bar>
    <div id="container"></div>
    <v-card outlined>
      <br />
      <h5 class="header">All Tickets</h5>

      <!-- Search area -->
      <v-card-actions>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search here"
              hide-details
              class="search"
              name="query"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-actions>

      <!-- Table -->
      <div id="grid-template">
        <div class="table-header-wrapper">
          <v-data-table :search="search" :headers="headers" :items="tickets">
            <template v-slot:[`item.status`]="{ item }">
              <v-chip small flat :color="getColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>

            <template v-slot:[`item.name`]="{ item }">
              {{ item.name }}
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                text
                small
                @click="viewTicket(item.id)"
                color="primary"
                class="viewbtn"
                ><span class="span">Details</span></v-btn
              >
              <v-icon icon small color="red" @click="deleteTicket(item.id)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>
  </v-main>
</template>

<script>
import AllTicketDataService from "../service/AllTicketDataServices";
import Bar from "../components/Bar.vue";

export default {
  name: "Table",
  components: {
    Bar,
  },
  data() {
    return {
      search: "",
      tickets: [],
      headers: [
        {
          text: "Ticket Id",
          align: "start",
          filterable: false,
          value: "ticketNumber",
        },
        { text: "Priority", value: "priority" },
        { text: "Category", value: "category" },
        { text: "Summary", value: "summary" },
        { text: "Date", value: "submitDate" },
        { text: "Requester", value: "name" },
        { text: "Status", value: "status", filterable: true },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  // Fetching tickets from the database
  created() {
    this.getAllTickets();
  },
  mounted() {
    this.getAllTickets();
  },
  methods: {
    getAllTickets() {
      var tickets = tickets;
      setInterval(() => {
        AllTicketDataService.getAll()
          .then((response) => {
            this.tickets = response.data;
            this.tickets.map((ticket) => {
              ticket.submitDate = this.getDisplaySubmitDate(ticket.submitDate);
            });

            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }, 10000);
    },

    // Refreshing tickets
    refreshList() {
      this.retrieveTickets();
    },

    //Viewing details of tickets
    viewTicket(id) {
      this.$router.push({ name: "Raised", params: { id: id } });
    },

    //Color of the status
    getColor(status) {
      if (status == "Open") return "amber";
      else if (status == "Pending") return "purple";
      else if (status == "New") return "red";
      else if (status == "InProgress") return "blue";
      else return "green";
    },

    //Deleting tickets
    deleteTicket(id) {
      AllTicketDataService.delete(id)
        .then(() => {
          this.dialog = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //Date of the tickets
    getDisplaySubmitDate(submitDate) {
      submitDate =
        submitDate.length > 10 ? submitDate.substr(0, 10) + "" : submitDate;
      return submitDate;
    },
  },
};
</script>

<style scoped>
.header {
  margin-left: 22px;
}
.search {
  /* margin-left: 99%; */
  box-sizing: border-box;
  width: 100%;
}
.filter {
  width: 30%;
  box-sizing: border-box;
  border-radius: 5px;
  left: 67%;
}
.v-card {
  border: 1px solid grey;
  margin-top: -52%;
}
.viewbtn {
  border-radius: 10px;
}
.span {
  text-transform: capitalize;
}
#container {
  margin: 5px 10em;
}
</style>
