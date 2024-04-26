<template>
<div class="max-w-7xl mx-auto grid grid-cols-4 gap-4">
  <div class="main-left col-span-1">
    <div class="p-4 bg-white border border-gray-200 text-center rounded-lg">
      <img src="https://i.pravatar.cc/300?img=12" class="mb-6 rounded-full main-center">

      <p><strong>{{ userName }}</strong></p>

      <div class="mt-6 flex space-x-8 justify-around">
        <p class="text-xs text-gray-500">56 Saved Movies</p>
      </div>
    </div>
  </div>

  <div class="flex justify-center items-center main-right col-span-3 space-y-4">
    <div class="bg-white border border-gray-200 rounded-lg">
      <h1 class="text-2xl text-center">Explore Movies</h1>
      <ul v-if="savedMovies.length > 0">
        <div class="space-y-10 grid">
            <li v-for="movie in savedMovies" :key="movie.id">
              <img class="object-contain h-90 w-60" :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" />
              <h1 class="text-lg text-center uppercase">{{ movie.title }}</h1>
            </li>
        </div>
      </ul>
      <p v-else>No saved movies yet (This section would display if there are no movies fetched from the API).</p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: localStorage.getItem('user.name') || 'User',
      savedMovies: [],
    };
  },
  mounted() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzljYTEzNWQyM2RkMTI3Y2E0OWUyMDcxMmZjNjA4NCIsInN1YiI6IjY2MmJiYWE0ODU2NmQyMDExZDdlZTZjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M2EXM0_GIkBNb-58gfvZ3cUj7WYRb57ECEXLbFDZof0' // Replace with your actual API key
    };

    axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', { headers })
      .then(response => {
        this.savedMovies = response.data.results;
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
};
</script>