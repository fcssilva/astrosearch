<template>
  <div class="perfil">
    <Header />

    <section class="user-info">
      <div class="container row">
        <img class="user-info__logo" :src="userInfos.avatar_url" />

        <div class="user-info__data col">
          <h1 class="user-info__title">{{ userInfos.login }}</h1>
          <p class="user-info__text" v-if="userInfos.email">{{ userInfos.email }}</p>
          <p class="user-info__text" v-if="userInfos.bio">{{ userInfos.bio }}</p>

          <div class="user-info__follows">
            <p class="user-info__text">Seguidores: {{ userInfos.followers }}</p>
            <p class="user-info__text">Seguindo: {{ userInfos.following }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="lds-dual-ring" v-if="!userInfos"></div>

    <div v-else>
      <section class="repositories" v-if="userRepos.length">
        <div class="container">
          <h1 class="repositories__title">Repositórios</h1>

          <div class="repositories__results">
            <p>Exibindo {{ userRepos.length }} repositórios</p>
          </div>

          <div class="order">
            <button
              class="order__btn"
              @click="sortByStars()"
            >Ordenar por estrelas {{ order ? '▲' : '▼' }}</button>
          </div>

          <ul class="repo-list">
            <li
              class="repo-list__items"
              v-for="(repo, index) in userRepos"
              :key="index"
              :class="`repo-list__element-${index}`"
            >
              <div class="repo-list__head">
                <h2 class="repo-list__text repo-list__text--white">{{ repo.name }}</h2>
                <p class="repo-list__text repo-list__text--white">
                  <i class="far fa-star repo-list__text--white"></i>
                  {{ repo.stargazers_count }}
                </p>
              </div>

              <p class="repo-list__text">{{ repo.description }}</p>

              <div class="repo-list__options">
                <span class="repo-list__link" @click="goToRepositorie(repo.name)">Ver detalhes</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section class="repo-list" v-else>
        <div class="container">
          <h2
            class="repo-list__subtitle"
          >Nenhum repositório encontrado para o usuário {{ userInfos.login }}</h2>
        </div>
      </section>
    </div>
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
    id: String
  },
  data() {
    return {
      userInfos: [],
      userRepos: [],
      order: true
    };
  },
  // Executa no carregamento da página
  mounted() {
    this.userInfo = [];

    if (!this.id.length) return;

    // Buscar dados do usuário
    axios
      .get(`https://api.github.com/users/${this.id}`)
      .then(response => (this.userInfos = response.data))
      .catch(error => {
        console.log(error);
      });

    // Buscar todos os repositórios do usuário
    axios
      .get(`https://api.github.com/users/${this.id}/repos`)
      .then(response => this.sortByStars(response.data))
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    // Realiza a ordenação dos repositórios pelo número de estrelas
    sortByStars(json = this.userRepos) {
      // true => decrescente, false => crescente
      if (this.order) {
        this.userRepos = json.sort(
          (a, b) => b.stargazers_count - a.stargazers_count
        );
      } else {
        this.userRepos = json.sort(
          (b, a) => b.stargazers_count - a.stargazers_count
        );
      }
      // Inverte a ordem para a próxima ordenação
      this.order = !this.order;
    },
    // Aciona a rota para a exibição da página de repositório
    goToRepositorie(repoName) {
      this.$router.push({ path: `/repositorie/${this.id}/${repoName}` });
    }
  }
};
</script>

<style>
.user-info__data {
  max-width: 100%;
  padding: 10px;
  justify-content: space-between;
}

.user-info__logo {
  height: 150px;
  width: 150px;
  padding: 30px;
}

.user-info__title {
  background-color: #343f8f;
  color: #fff;
  padding: 10px;
}

.user-info__text {
  margin: 10px 0;
  padding: 10px;
}

.user-info__follows {
  background-color: #343f8f;
  color: #fff;
}

.order__btn {
  background-color: #343f8f;
  padding: 10px 15px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  outline: none;
  border: 0.5px solid #343f8f;
  box-shadow: none;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.repo-list {
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.repo-list__text {
  margin: 10px;
  word-wrap: break-word;
}

.repo-list__text--white {
  color: #fff;
  max-width: 100%;
  word-wrap: break-word;
}

.repo-list__head {
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 20px;
  background-color: #343f8f;
}

.repo-list__items {
  padding: 10px;
  margin: 20px 10px 0;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
}

.repo-list__title {
  word-wrap: break-word;
}

.repo-list__options {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.repo-list__link {
  padding: 10px 20px;
  width: calc(100% - 40px);
  background-color: #343f8f;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

@media (min-width: 361px) {
  .user-info__data {
    align-items: center;
    text-align: center;
  }
  .user-info__follows {
    display: flex;
    justify-content: space-around;
  }
  .user-info__logo {
    padding: 30px;
  }
  .repo-list__link {
    width: auto;
  }
}
</style>