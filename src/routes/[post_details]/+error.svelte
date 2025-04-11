<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";
  </script>
  
  <section>
  
    <h1>{"Sidan du sökte på har tagits bort eller fanns aldrig till att börja med."}</h1>
    <hr />
    <h2>{$page.status}: {$page.error.message}</h2>

    <a href="{base}/" class="btn preset-filled-error-50-950">Gå tillbaka till startsidan</a>
  </section>