<template>
  <div>
    <NuxtRouteAnnouncer />
    <!--    <NuxtWelcome />-->
    <p>Hello Word!</p>
    <p>{{ GetTest }}</p>
    <button @click="testconnection()">Связь</button>
  </div>
</template>
<script>
import { api } from "./shared/api/axios";
export default {
  data() {
    return {
      GetTest: "",
    };
  },
  methods: {
    testconnection() {
      api
        .get("/test")
        .then((data) => {
          this.GetTest = data.data.message;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
};
</script>
