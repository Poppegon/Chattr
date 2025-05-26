
<!-- src/routes/devblog/[slug]/+page.svelte -->
<script>

  /** @type {import('./$types').PageData} */

  export let data;

  
</script>

<article id="post" class="dark:bg-surface-900 bg-surface-50">
  <h1>{data.title}</h1>
  <p>Published: {data.date}</p>
  <div class="prose dark:prose-invert">
      <svelte:component this={data.content}/>
  </div>
</article>


<style>
  .prose {}

  #post {
    overflow-x: wrap;
    overflow-y: scroll;

    padding-left: 20px;
    padding-top: 20px;
  }

  article {
    transition: all ease-out 1000ms;
  }
</style>