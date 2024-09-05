<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import VueCookies from 'vue-cookies';
import { removeCookie } from '@/service/cookie';

import { checkToken } from "@/service/apiProviderAuth";

export default {
  created() {
    if (VueCookies.isKey('email')) {
      this.checkTokenAPi();
    }
  },
  methods: {
    async checkTokenAPi() {
      const result = await checkToken();

      if (!result) {
        removeCookie();
      }
    },
  },
}
</script>
