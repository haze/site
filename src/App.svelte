<script>
  import Logo from './Logo.svelte';
  export let links;
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-direction: column;
  }

  @media only screen and (max-width: 600px) {
    .links {
      flex-direction: column;
    }

    .links a {
      padding-bottom: 1vh;
    }
  }
  .links {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 10px;
    width: 65%;
  }

  .discrim {
    opacity: 0.3;
  }
</style>

<div class="container">
  <Logo/>
  <div class="links">
    {#each links as link}
      {#if link.href}
        <a href={link.href}>{link.name}</a>
      {:else if link.discord}
        <span>{link.discord}<span class="discrim">#{link.discrim}</span></span>
      {:else if link.email}
        <a href={"mailto:" + link.email}>{link.email}</a>
      {/if}
    {/each}
  </div>
</div>
