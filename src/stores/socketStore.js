import { ref, computed } from "vue";
import { defineStore } from "pinia";
import io from 'socket.io-client';
import api from "@/api";

export const socketStore = defineStore("socketStore", {
  state: () => {
    return {
      socket: null,
    };
  },
  actions: {
    connection() {
      // this.socket = io('http://localhost:80');
      this.socket = io('https://petwschat-nikolayg.amvera.io');
      
    },
  },
});
