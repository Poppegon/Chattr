
<!-- src/routes/devblog/[slug]/+page.svelte -->
<script>

  /** @type {import('./$types').PageData} */

  export let data;

  
</script>

<article id="post">
  <h1>{data.title}</h1>
  <p>Published: {data.date}</p>
  <div class="prose">
      <svelte:component this={data.content}/>
  </div>
</article>


<style global>
  .prose ,
    h1 {
      color: aqua;
  }

  #post {
    overflow-x: wrap;
    overflow-y: scroll;
  }
</style>