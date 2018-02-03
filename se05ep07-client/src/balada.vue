<template>
  <div>
    <h1>BALADA VUE</h1>
    <router-view></router-view>
  </div>
</template>

<script>
const VueRouter = require("vue-router");

module.exports = {
  name: "Spa",
  router: new VueRouter({
    routes: [
      { path: "/lista-festas", component: require("./lista-festas.vue") },
      { path: "/criar-festa", component: require("./criar-festa.vue") }
    ]
  })
};
</script>

<style>

</style>


<template>
  <md-list>
    <!-- lista-festas.vue -->
    <md-subheader>
      Lista de festas
    </md-subheader>
    <md-list-item v-for="f in festas" :key="f.idfesta">
      {{f.nomefesta}}
    </md-list-item>
  </md-list>
</template>

<script>
const axios = require("axios");
const api = axios.create({
  baseURL: "htto://127.0.0.1:3000"
});
module.exports = {
  name: "ListaFestas",
  created() {
    this.listfestas();
  },
  data() {
    return {
      festas: []
    };
  },
  methods: {
    listfestas() {
      api
        .get("/festa/list")
        .then(ret => {
          if (ret.status != 200) throw ret;
          this.festas = ret.data;
        })
        .catch(err => {
          console.log(err);
          alert("Erro ao recuperar festas");
        });
    }
  }
};
</script>

<style>

</style>

<template>
  <form @submit.prevent="dosave">
    <md-input-container>
      <label>Nome da festa</label>
      <md-input v-model="festa.nomefesta" required></md-input>
    </md-input-container>
    <md-button type="submit" class="md-primary md-raised">Salvar</md-button>
  </form>
</template>

<script>
const axios = require("axios");
const api = axios.create({
  baseURL: "htto://127.0.0.1:3000"
});
module.exports = {
  name: "CriarFesta",
  data: _ => ({festa:{nomefesta:""}}),
  methods: {
    dosave() {
      api
        .post("/festa/save", this.festa)
        .then(ret => {
          if (ret.status != 200) throw ret;
          this.festas = ret.data;
          this.$router.push("/lista-festas")
        })
        .catch(err => {
          console.log(err);
          alert("Erro ao salvar festa");
        });
    }
  }
};
</script>

<style>

</style>