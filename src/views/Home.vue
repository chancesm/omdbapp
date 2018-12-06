<template>
  <div class="home">
    <Search />
    <SearchResults />
  </div>
</template>

<script>
  import Search from '../components/Search'
  import SearchResults from '../components/SearchResults'
  export default {
    components: {
      Search,
      SearchResults
    }
  }
</script>
