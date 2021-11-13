<template>
  <v-app>
    <v-app-bar app color="" dark class="bar">
      <div class="d-flex align-center">
        <v-toolbar-title class="title"
          >Stream|<span>Desk</span></v-toolbar-title
        >
      </div>

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <h6 class="batons" dark v-bind="attrs" v-on="on">
            {{ username }}
          </h6>
        </template>
        <span>User</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="btn" dark v-bind="attrs" v-on="on">
            <i class="fas fa-bell"> </i>
          </v-btn>
        </template>
        <span>Notifications</span>
      </v-tooltip>

      <!-- <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon class="btn" dark v-bind="attrs" v-on="on">
            <email></email>
          </v-btn>
        </template>
        <span>Email</span>
      </v-tooltip> -->

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            depressed
            class="button"
            color=""
            router
            to="/login"
            v-bind="attrs"
            v-on="on"
          >
            <i class="fa fa-sign-out" aria-hidden="true"></i>
          </v-btn>
        </template>
        <span>Sign-out</span>
      </v-tooltip>
    </v-app-bar>
  </v-app>
</template>

<script>
// import Email from "../components/Email.vue";

export default {
  name: "Bar",
  // components: {
  //   Email,
  // },
  data() {
    return {
      username: "",
    };
  },

  methods: {
    getUsername() {
      this.username = localStorage.getItem("username");
    },
  },

  created: function () {
    this.getUsername();
  },
};
</script>
<style scoped>
.bar .title {
  color: rgb(235, 211, 2);
  font-size: 25px;
  text-transform: uppercase;
  font-weight: 800;
  list-style-type: none;
}
.bar .title span {
  color: #fff;
}
.btn {
  margin: 0 5px;
  font-size: 16px;
  width: 10px;
  height: 10px;
  line-height: 20px;
}

.btns {
  border: 1px solid white;
  margin: 0 8px;
}
.buttons {
  font-size: 16px;
}
.batons {
  color: rgb(218, 197, 3);
  text-transform: capitalize;
  margin: 0 8px;
}
</style>
