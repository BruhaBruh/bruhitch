import adapter from '@sveltejs/adapter-auto';
import path from 'path';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true
    })
  ],

  kit: {
    adapter: adapter(),
    vite: () => ({
      resolve: {
        alias: {
          '@components': path.resolve('./src/components'),
          $types: path.resolve('./src/types'),
          $lib: path.resolve('./src/lib')
        }
      }
    })
  }
};

export default config;
