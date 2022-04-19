<script lang="ts" context="module">
  import App from '@components/App.svelte';
  import '../app.css';
</script>

<script lang="ts">
  let isDark = true;
</script>

<App {isDark}>
  <main class="container mx-auto py-8 px-2">
    <slot />
  </main>
</App>
