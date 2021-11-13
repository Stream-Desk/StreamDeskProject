<template>
  <v-container>
    <v-container class="fill-height">
      <v-btn
        small
        class="btns"
        id="contain"
        color="primary"
        @click.stop="drawer = !drawer"
        ><span class="px-3">Send Email</span></v-btn
      >
    </v-container>

    <v-navigation-drawer
      absolute
      temporary
      right
      width="355px"
      class="drawer"
      v-if="!submitted"
      v-model="drawer"
    >
      <i @click="close" class="fas fa-times" id="close"></i>
      <v-card-text>
        <label>Name</label>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          v-model="email.emailToName"
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          v-model="email.emailToId"
        />
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          v-model="email.emailSubject"
        />
        <label>Messsage</label>
        <textarea
          name="message"
          cols="30"
          rows="5"
          placeholder="Message"
          v-model="email.emailBody"
        >
        </textarea>
        <v-card-actions class="submit">
          <v-spacer></v-spacer>
          <v-btn
            elevation="1"
            variant="outlined"
            class="mb-5 px-5"
            color="red"
            rounded
            small
            dark
            text-center
            id="buton"
            @click="close"
            >Cancel</v-btn
          >
          <v-btn
            elevation="1"
            class="mb-5 px-5"
            v-ripple="{ class: 'primary--text' }"
            @click="sendEmail"
            color="primary"
            rounded
            small
            id="btn"
            >Send</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import AllTicketsDataService from "../service/AllTicketDataServices";
export default {
  name: "Email",

  data() {
    return {
      email: {
        emailBody: "",
        emailSubject: "",
        emailToId: "",
        emailToName: "",
      },
      submitted: false,
      dialogCancel: false,
      dialog: false,
      drawer: null,
    };
  },
  methods: {
    //Send email
    sendEmail() {
      var data = {
        emailBody: this.email.emailBody,
        emailSubject: this.email.emailSubject,
        emailToId: this.email.emailToId,
        emailToName: this.email.emailToName,
        status: false,
      };

      AllTicketsDataService.email(data)
        .then((response) => {
          this.email.id = response.data.id;
          console.log(response.doata);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newEmail() {
      // this.submitted = false;
      this.email = {};
    },

    // onOpen() {
    //   this.dialog = true;
    // },

    close() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.container {
  display: block;
  margin: auto;
  text-align: center;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type="text"],
[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
}

input[type="submit"]:hover {
  background-color: #45a049;
}
#close {
  color: rgb(56, 56, 56);
  padding-top: 15px;
  margin-left: 85%;
}
.btns {
  /* border: 1px solid white; */
  /* margin: 0 5px; */
  /* font-size: 16px; */
  /* width: 10px;
  height: 10px; */
  line-height: 10px;
  text-transform: capitalize;
  margin-left: 100%;
  margin-top: 20px;
}
/* .drawer {
  margin-top: 1%;
} */
#buton::before {
  background-color: transparent !important;
}
</style>
