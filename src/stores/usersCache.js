import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/api";

export const usersCache = defineStore("usersCache", {
  state: () => {
    return {
      cacheUsers: [],
    };
  },
  actions: {
    fetchUsers(ids = []) {
      const filteredIds = [...new Set(ids)].filter((x) => {
        return !this.cacheUsers.find((user) => user._id == x);
      });
      if (filteredIds.length > 0) {
        return api.userService
          .findUsers({ids: filteredIds})
          .then((data) => {
            this.cacheUsers = this.cacheUsers.concat(data.data);
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        return new Promise((resolve) => {
          resolve();
        });
      }
    },
  },
});
