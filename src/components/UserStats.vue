<template>
  <div></div>
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