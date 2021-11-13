<template>
  <div>
    <div class="mx-3 my-6" width="200" id="card">
      <v-container grid-list-xs>
        <v-card>
          <v-btn text color="blue" class="backbtn" router to="/table"
            >Back</v-btn
          >
          <v-card-text>
            <h6 class="h6">Ticket details</h6>

            <email></email>

            <form v-if="currentTicket">
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">TicketId:</label>
                <div class="col-sm-10">
                  {{ currentTicket.id }}
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Priority:</label>
                <div class="col-sm-10">
                  {{ currentTicket.priority }}
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Requester:</label>
                <div class="col-sm-10">
                  {{ currentTicket.name }}
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Category:</label>
                <div class="col-sm-10">
                  {{ currentTicket.category }}
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Summary:</label>
                <div class="col-sm-10">
                  {{ currentTicket.summary }}
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Description:</label>
                <div class="col-sm-10">
                  {{ currentTicket.description }}
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Date:</label>
                <div class="col-sm-10">
                  {{ currentTicket.submitDate }}
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Attachment:</label>
                <div class="col-sm-10">
                  <a :href="currentTicket.fileUrls">{{ currentTicket.name }}</a>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-2 col-form-label">Status:</label>
                <div class="col-sm-10">
                  <v-chip :color="getColor(currentTicket.status)">{{
                    currentTicket.status
                  }}</v-chip>
                  <!-- {{ currentTicket.status }} -->
                </div>
              </div>
            </form>
          </v-card-text>
          <v-divider></v-divider>
          <comments></comments>

          <div class="comment-form">
            <textarea
              type="text"
              v-model="text"
              placeholder="Leave Comment here...  "
            ></textarea>

            <v-btn @click="sendComment" small color="primary" id="subtn">
              <span class="px-5">Submit</span>
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </div>
  </div>
</template>

<script>
import AllTicketsDataService from "../service/AllTicketDataServices";
import Comments from "../components/Comments.vue";
import Email from "../components/Email.vue";

export default {
  name: "Raised",

  components: {
    Comments,
    Email,
  },
  data() {
    return {
      currentTicket: null,
      text: "",
      currentTicketId: "",
      dialog: false,
    };
  },
  updated: false,
  methods: {
    //send comment
    sendComment() {
      const data = {
        text: this.text,
        ticketId: this.currentTicketId,
      };
      AllTicketsDataService.createComment(data)
        .then((response) => {
          this.comment = response.data;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    onSend: function (message) {
      alert(message);
    },
    onClickEditTicket() {
      this.dialog = true;
    },

    getTicket(id) {
      AllTicketsDataService.get(id)
        .then((response) => {
          this.currentTicket = response.data;
          this.currentTicketId = response && response.data.id;
          console.log(response.data);
          console.log(response && response.data.id);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getColor(status) {
      if (status == "Open") return "amber";
      else if (status == "Resolved") return "green";
      else return "purple";
    },
  },
  mounted() {
    this.message = "";
    this.getTicket(this.$route.params.id);
  },
};
</script>

<style>
form input {
  margin-left: 30px;
}
form label {
  font-weight: bold;
  color: black;
  font-size: 17px;
}
.btn {
  color: rgb(95, 191, 247);
  /* border: 1px solid rgb(7, 21, 148); */
}

textarea {
  width: 90%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin-top: 6px;
  resize: vertical;
}
.view {
  float: right;
  right: 3.5rem;
  margin-top: -8%;
}
/* #card {
  border: 1px solid rgb(161, 161, 161);
} */
.backbtn {
  margin-top: 25px;
  text-transform: capitalize;
  margin-inline-start: 10px;
}
.divider {
  margin-left: 13%;
}
.h6 {
  color: rgb(2, 33, 68);
  padding-left: 39%;
  font-weight: 600;
  font-size: 20px;
}
</style>
