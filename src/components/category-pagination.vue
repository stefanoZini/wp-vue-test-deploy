<template>
  <nav>
    <ul>
      <li>
        <router-link
          :class="{'is-disabled' : currentPage === 1}"
          :to="{ name: 'category_page', params: {page: this.currentPage - 1, id: this.$route.params.id} }"
        >
          Pagina Precedente
        </router-link>
      </li>
      <li>
        <router-link
          :class="{'is-disabled' : currentPage === this.totalPages}"
          :to="{ name: 'category_page', params: {page: this.currentPage + 1, id: this.$route.params.id} }"
        >
          Pagina Successiva 
        </router-link>
      </li>
    </ul>

    <p>pagina <strong>{{ currentPage }}</strong> di <strong>{{ totalPages }}</strong></p>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    currentPage: {
      default: 1
    },

    totalPages: {
      default: 1
    },
  }
}

</script>

<style scoped lang="scss">
  nav {
    margin: 2rem 0 0;
    text-align: center;
  }

  ul {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  li {
    & + & {
      margin-left: 1rem;
    }
  }

  p {
    font-size: $small-font-size;
  }
</style>
