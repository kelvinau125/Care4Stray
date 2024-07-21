<template>
  <!-- Navbar -->
  <nav
    class="z-10 top-0 left-0 fixed md:top-16 w-full bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 bg-secondTheme">
    <div class="w-full mx-auto md:items-center flex flex-col justify-between md:flex-nowrap flex-wrap md:px-10 ml-3 md:ml-0">
      <!-- Form -->
      <form class="w-8/12 flex flex-row flex-wrap md:items-center mr-3 md:mb-0">
        <div class="relative flex w-full flex-wrap items-stretch">
          <span
            class="z-10 h-full leading-snug font-normal text-center text-blueGray-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
            <i class="fas fa-search"></i>
          </span>
          <input type="text" placeholder="Search post..."
            class="rounded-full border-0 px-3 py-3 placeholder-blueGray-600  text-blueGray-600 relative bg-secondTheme text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10" />
        </div>

        <!-- Navigation Links -->
        <ul class="md:flex-row md:min-w-full flex flex-row space-x-6 mt-6 list-none">
          <li class="items-center">
            <router-link to="/user/news" v-slot="{ href, navigate, isActive }">
              <a :href="href" @click="navigate" class="text-sm uppercase pt-3 font-semibold block" :class="[
                isActive
                  ? 'text-mainText hover:text-mainText font-black'
                  : 'text-blueGray-700 hover:text-blueGray-500',
              ]">
                News
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link to="/user/nearme" v-slot="{ href, navigate, isActive }">
              <a :href="href" @click="navigate" class="text-sm uppercase pt-3 font-semibold block" :class="[
                isActive
                  ? 'text-mainText hover:text-mainText font-black'
                  : 'text-blueGray-700 hover:text-blueGray-500',
              ]">
                Near Me
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link to="/user/adoption" v-slot="{ href, navigate, isActive }">
              <a :href="href" @click="navigate" class="text-sm uppercase pt-3 font-semibold block" :class="[
                isActive
                  ? 'text-mainText hover:text-mainText font-black'
                  : 'text-blueGray-700 hover:text-blueGray-500',
              ]">
                Adoption
              </a>
            </router-link>
          </li>
        </ul>

      </form>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>

export default {
  components: {

  },
};
</script>