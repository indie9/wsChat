<template>
  <main class="bg-gradient-to-b from-gray-100 to-gray-300 h-full py-10 px-20  text-black main-wrapper overflow-y-auto">
    <h1 class="text-3xl font-bold mb-4 ">Это мой демонстрационный проект!</h1>

    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-2">Front-end
      </h2>
      <a href="https://github.com/indie9/wsChat/tree/baseproject" target="_blank" rel="noopener noreferrer"
        class="text-sm my-1 inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-700 active:bg-blue-800">
        GitHub проекта
      </a>

      <h3 class="text-xl font-semibold mb-2">Используемые технологии:</h3>
      <ul>
        <li>Vue 3 </li>
        <li>Tealwind CSS</li>
        <li>Pinia </li>
        <li>Vite </li>
      </ul>
      <h3 class="text-xl font-semibold mb-2">Реализовано:</h3>
      <li>Роутинг для навигации по страницам</li>
      <li>Кэширование пользователей через хранилище</li>
      <li>Чат с комнатами через вебсокет</li>
    </section>


    <section class="mb-6">
      <h2 class="text-2xl font-semibold mb-2">Back-end</h2>
      <a href="https://github.com/indie9/wsChat/tree/serverproject" target="_blank" rel="noopener noreferrer"
        class="text-sm my-1 inline-flex items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-700 active:bg-blue-800">
        GitHub проекта
      </a>
      <h3 class="text-xl font-semibold mb-2">Используемые технологии:</h3>
      <ul>
        <li>Node.js и Express </li>
        <li>MongoDB </li>
        <li>Socket.IO </li>
      </ul>
      <h3 class="text-xl font-semibold mb-2">Реализовано:</h3>
      <li>Socket.IO для реализации чата через вебсокет</li>
      <li>JWT Token для аутентификации пользователей</li>
      <li>Ролевая модель пользователей</li>
      <li>Шифрование паролей для безопасного хранения</li>
      <li>Интеграция с БД для хранения данных</li>
    </section>

  </main>
</template>


<script>
import { mapActions, mapState } from 'pinia'
import { userLogin } from '@/stores/userLogin'
export default {
  computed: {
    ...mapState(userLogin, ['user']),
  }
}
</script>

<style scoped>
.main-wrapper {
  max-height: calc(100vh - 80px);
}
</style>