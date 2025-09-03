<template>
  <section
    class="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center"
  >
    <img src="/favicon.ico" alt="Myndos Logo" class="w-16 h-16 mb-4" />
    <h1 class="text-4xl font-extrabold text-blue-700 mb-4 tracking-tight">Welcome to Myndos</h1>
    <p class="text-lg text-gray-600 mb-6">
      Your modern platform for exam generation, chat, and prompt management.<br />Empowering
      students and teachers with smart tools.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
      <router-link
        to="/register"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition w-full sm:w-auto"
        >Get Started</router-link
      >
      <router-link
        to="/login"
        class="bg-white border border-blue-600 text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition w-full sm:w-auto"
        >Log In</router-link
      >
    </div>
    <div class="mt-8 text-sm text-gray-400">&copy; 2025 Myndos. All rights reserved.</div>
  </section>
</template>

<script setup lang="ts">
// No logic needed for static welcome
</script>
