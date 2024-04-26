<template>
    <nav class="py-10 px-8 border-b border-gray-200"> <!--padding top and bottom of navbar -->
        <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between"> <!-- makes it possible to have 3 divs next to each other-->
                <div class="menu-left">
                    <a href="#" class="text-xl">Mov1eApp</a>
                </div>

                <div class="menu-center flex space-x-12" v-if="userStore.user.isAuthenticated"> <!-- space-x adds space between the icons it also makes the navbar only appear when logged in-->
                    <a href="#" class="text-orange-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </a>

                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>     
                    </a>

                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                        </svg>                                                         
                    </a>
                </div>

                <div class="menu-right">
                    <template v-if="userStore.user.isAuthenticated">
                        <a href="#">
                            <img src="https://i.pravatar.cc/40?img=12" class="rounded-full">
                        </a>
                    </template>

                    <template v-else>
                        <RouterLink to="/login" class="mr-4 py-4 px-6 bg-gray-600 text-white rounded-lg">Log in</RouterLink>
                        <RouterLink to="/signup" class="py-4 px-6 bg-orange-300 text-white rounded-lg">Sign up</RouterLink>
                    </template>
                </div>
            </div>
        </div>
    </nav>
    
    <main class="px-8 py-6 bg-gray-100">
      <RouterView />
    </main>

    <Toast />
</template>

<script>
    import axios from 'axios'
    import Toast from '@/components/Toast.vue'
    import { useUserStore } from '@/stores/user'

    export default {
        setup() {
            const userStore = useUserStore()//preevent refresh to reset token

            return {
                userStore
            }
        },

        components: {
            Toast
        },

        beforeCreate() {
            this.userStore.initStore()

            const token = this.userStore.user.access

            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            } 
            else {
                axios.defaults.headers.common["Authorization"] = "";
            }
        }
    }
</script>

