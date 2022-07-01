<template>
  <div class="content-wrapper">
    <div class="header">
      <h1>{{ User.username }}</h1>
    </div>
    <div class="general stats">
      <p>Total Follows: {{ Followers.total }}</p>
      <p>Total Subs: {{}}</p>
    </div>
    <div class="stats-header">
      <h3>Follows</h3>
      <h3>Subscribers</h3>
    </div>
    <div class="stats-tables">
      <table>
        <thead>
          <th>Name</th>
          <th>Follow Date</th>
        </thead>
        <tbody>
          <tr v-for="(follower, i) in Follows.followerArr[0]" v-bind:key="i">
            <td>{{ follower.from_login }}</td>
            <td>{{ follower.followed_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />
  </div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { twitchStore } from "@/stores/twitchData";

export default {
  computed: {
    ...mapState(twitchStore, ["User", "Followers"]),
  },
};
</script>