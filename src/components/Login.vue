<template>
  <v-main>
    <v-app-bar app color="" dark class="bar">
      <div class="d-flex align-center">
        <v-toolbar-title class="title"
          >Stream|<span>Desk</span></v-toolbar-title
        >
      </div>

      <v-spacer></v-spacer>

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

    <div class="d-flex justify-center align-center">
      <v-card width="370" height="330" class="mx-auto mt-9 pa-9" id="card">
        <div>
          <h5 class="text-center" id="title">Stream|<span>Desk</span></h5>
        </div>
        <v-form @submit.prevent="submitHandler" ref="form" v-model="valid">
          <v-card-text>
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              type="name"
              label="Username"
              placeholder="Username"
              prepend-inner-icon="mdi-account"
            />

            <v-text-field
              label="Password"
              v-model="password"
              :rules="passwordRules"
              required
              placeholder="Password"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-key"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            />
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn type="submit" color="yellow" :disabled="!valid">
              <span class="px-8">Login</span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </div>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      valid: false,
      showPassword: false,
      password: "",
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 6) || "Password must be 6 characters or more",
      ],
      username: "",
      usernameRules: [
        (v) => !!v || "username is required",
        (v) => (v && v.length >= 3) || "Password must be 3 characters or more",
      ],
    };
  },

  methods: {
    //Validate users
    submitHandler() {
      this.$refs.form.validate();

      //Get users from database
      const formData = {
        userName: this.username,
        password: this.password,
      };
      axios
        .post(
          "https://streamdeskticketmicroservice.herokuapp.com/api/Users/authenticate",
          formData
        )
        .then((response) => {
          console.log(response, "Successfully login");
          localStorage.setItem("username", this.username);

          this.$router.push("/table");
        })

        .catch((error) => {
          console.log(error, "Failed to login");
        });
    },
  },
};
</script>

<style scoped>
#card {
  border-radius: 10px;
  border: 1px outset rgb(253, 234, 59);
}
#title {
  color: rgb(253, 234, 59);
}
span {
  color: rgb(29, 29, 29);
}
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
</style>
