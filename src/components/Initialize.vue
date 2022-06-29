<template>
  <div class="wrapper">
    <a
      href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=pk0roinew9e83z6qn6ctr7xo7yas15&redirect_uri=http://localhost:3000&scope=user:read:follows%20channel:read:subscriptions%20user:read:follows"
      class="link-acc"
      >Link
    </a>
    <button
      class="link-button"
      @click="validateToken()"
      v-if="User.userId !== 0"
    >
      Refresh Content
    </button>
    <button
      class="link-button"
      @click="validateToken()"
      v-if="User.userId === 0"
    >
      Display Content
    </button>
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { twitchStore } from "../stores/twitchData";

export default {
  methods: {
    validateToken() {
      const store = twitchStore();
      let url = window.location.hash;
      let split = url.split(/[:&]/);
      let token = split[0].split("=");
      let actualToken = token[1];

      console.log(actualToken);
      store.validate(actualToken);

      setTimeout(() => {
        store.fetchFollows();
      }, 500);
    },
  },
  computed: {
    ...mapState(twitchStore, ["User"]),
  },
};
</script>
<style>
.wrapper {
  margin-bottom: 5rem;
  width: 12rem;
}
.link-button {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.link-acc {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  color: #ffffff;
}
</style>