<template>
  <div class="repositories">
    <Header />
    <section class="repo-info">
      <div class="container row">
        <div class="repo-info__data col">
          <h1 class="repo-info__title">{{ repoInfos.name }}</h1>
          <p class="repo-info__text" v-if="repoInfos.description">{{ repoInfos.description }}</p>

          <div class="repo-info__details">
            <p class="repo-info__text repo-info__text--flex">
              <i class="far fa-star repo-info__icon"></i>
              {{ repoInfos.stargazers_count }}
            </p>

            <p class="repo-info__text repo-info__text--flex" v-if="repoInfos.language">
              <i class="fas fa-code repo-info__icon"></i>
              {{ repoInfos.language }}
            </p>
          </div>
          <div class="repo-info__details repo-info__details--margin">
            <a
              target="_blank"
              :href="repoInfos.html_url"
              class="repo-info__text--link"
            >Acessar repositório</a>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  components: {
    Header,
    Footer
  },
  props: {
    id: String,
    repo: String
  },
  data() {
    return {
      repoInfos: []
    };
  },
  mounted() {
    let repoAux = [];
    axios
      .get(`https://api.github.com/users/${this.id}/repos`)
      .then(response => (repoAux = response.data))
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        repoAux.forEach(repository => {
          if (repository.name == this.repo) {
            this.repoInfos = repository;
          }
        });
      });
  }
};
</script>

<style>
.repo-info__data {
  width: calc(100% - 20px);
  padding: 10px;
  justify-content: space-between;
}

.repo-info__title {
  background-color: #343f8f;
  padding: 20px;
  margin: 10px 0;
  color: #fff;
}

.repo-info__text {
  margin: 20px 0;
  padding: 0 10px;
}

.repo-info__text--flex {
  display: flex;
}

.repo-info__text--link {
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  padding: 10px;
}

.repo-info__details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #343f8f;
  color: #fff;
  font-size: 0.9rem;
  padding: 10px;
}

.repo-info__details--margin {
  margin-top: 10px;
}

.repo-info__icon {
  padding-right: 10px;
}
</style>