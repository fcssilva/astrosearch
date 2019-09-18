<template>
  <div class="home">
    <Header />
    <section class="search col">
      <div class="container">
        <h1 class="search__title">Digite o nome do usuário do Git-Hub</h1>

        <form class="search__form">
          <input type="text" class="search__input" v-model="user" />
          <button class="search__btn" @click.prevent="searchUsersList">Buscar</button>
        </form>
      </div>
    </section>

    <div class="lds-dual-ring" v-if="loading"></div>

    <section class="users" v-if="usersList.items">
      <h3>Exibindo {{ usersList.total_count }} para {{ user }}</h3>
      <div class="users-list" v-if="usersList.items">
        <div
          class="users-list__box"
          v-for="(user, index) in usersList.items"
          :key="index"
          @click="goToPerfil( user.login )"
        >
          <img class="users-list__logo" :src="user.avatar_url" />
          <div class="users-list__info">
            <h1 class="users-list__name">{{ user.login }}</h1>
            <p class="users-list__url">{{ user.url }}</p>
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
  name: "home",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      user: "",
      loading: false,
      usersList: []
    };
  },
  methods: {
    // Realiza a busca dos usuários
    searchUsersList() {
      this.usersList = [];

      // Caso o não tenha valor digitado, retorna
      if (!this.user.length) return;

      this.loading = true;
      axios
        .get("https://api.github.com/search/users", {
          params: {
            q: this.user
          }
        })
        .then(response => (this.usersList = response.data))
        .finally(() => (this.loading = false));
    },
    // Aciona a rota para a exibição do perfil
    goToPerfil(userName) {
      this.$router.push({ path: `/perfil/${userName}` });
    }
  }
};
</script>
  
<style>
.search {
  margin-bottom: 40px;
  text-align: center;
  padding: 20px;
}

.search__form {
  display: flex;
  flex-wrap: wrap;
}

.search__input {
  height: 20px;
  text-align: center;
  width: 100%;
  padding: 10px 15px;
  color: #380021;
  outline: none;
  border: 1px solid #380021;
}

.search__btn {
  background-color: #343f8f;
  padding: 10px 15px;
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  outline: none;
  border: 0.5px solid #343f8f;
  cursor: pointer;
  width: 100%;
}

.users-list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
}

.users-list__box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;
  padding: 20px;
  width: calc(100% - 40px);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.users-list__logo {
  width: 80;
  height: 80px;
  padding: 10px;
}

.users-list__info {
  margin: 5px;
}

.users-list__name {
  margin: 0;
  padding: 0;
}

.users-list__url {
  margin: 10px 0;
  padding: 0;
  font-size: 0.9rem;
}

@media (min-width: 361px) {
  .search__form {
    flex-wrap: nowrap;
  }
  .search__input {
    text-align: left;
    width: 80%;
    font-size: 1.8rem;
  }
  .search__btn {
    width: auto;
    margin-top: 0;
  }
  .users-list__box {
    flex-direction: row;
    text-align: left;
    padding: 5px;
    flex: 1 1;
  }
}
</style>