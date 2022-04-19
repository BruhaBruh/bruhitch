<script lang="ts" context="module">
  import App from '@components/App.svelte';
  import Header from '@components/Header.svelte';
  import '../app.css';
</script>

<script lang="ts">
</script>

<App>
  <Header />
  <main class="container mx-auto py-8 px-2 sm:px-4">
    <slot />
  </main>
</App>
