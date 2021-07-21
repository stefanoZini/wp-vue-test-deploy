<template>
  <div>

    <section>

    </section>

    <ul>
      <Card
        :type="category"
        v-for="category in categories"
        :post="category"
        :key="category.id"
      />
    </ul>

  

  </div>
</template>

<script>
import bus from '../bus';
import ajax from '../mixins/ajax';
import Card from '../components/Card-category';


export default {
  name: 'categories',

  mixins: [ajax],

  data () {
    return {
      categories: [],
      page: 1,
      totalPages: null
    }
  },

  mounted: function () {
    this.getcategories();
  },

  created: function () {
    if(this.$route.name === 'page') {
      this.page = this.$route.params.page;
    }
  },

  methods: {
    getcategories: async function () {
      let response;

      try {
        response = await this.get(
          `/categories`
        );
        this.totalPages = response.headers['x-wp-totalpages'];
      } catch (error) {
        bus.$emit('showUpdater', 'Are you sure that\'s a valid endpoint?');
        bus.$emit('toggleLoading', false);
        return;
      }

      this.categories = await this.getFeaturedImages(response.data);

      this.getAdjacentPageData();

      bus.$emit('toggleLoading', false);
    },

    getAdjacentPageData: async function (prevPage = false) {

      let page = prevPage === true
              ? parseInt(this.page) - 1
              : parseInt(this.page) + 1;

      let response;

      if(page > 0) {
        try {
          response = await this.get(
            `/categories?per_page=${POSTS_PER_PAGE}`
          );
        } catch (error) {
          console.error(error);
        }

        response.data.forEach((post) => {
          if(post.featured_media) return;
         
        });
      }

      if(!prevPage) {
        this.getAdjacentPageData(true);
      }
    },

    getFeaturedImages: function (posts) {
      return new Promise((resolve) => {
        let requests = posts.map((post) => {
          return new Promise( async (resolve) => {
            let response;

            try {

              if(post.featured_media <= 0) {
                throw "No featured image.";
              }

              response = null;
              post.featured_image = response.data.media_details.sizes['medium'].source_url;
            } catch (error) {
              post.featured_image = null;
            }

            resolve(post);
          });
        });

        Promise.all(requests).then((posts) => resolve(posts));
      });
    }
  },

  components: {
    Card
  }
}

</script>

<style scoped lang="scss">

  section {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 3rem;
  }

  ul {
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax( 320px, auto ) );
    grid-gap: 1rem;
  }
</style>

