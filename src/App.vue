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
      console.log("hahahah")

      const result = await checkToken();

      console.log(result)

      if (!result) {
        removeCookie();
      }
    },
  },
}
</script>
