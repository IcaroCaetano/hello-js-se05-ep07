// // main.js
// const foo = require("./mymodule1")
// const bar = require("./anothermodule").bar

// foo(2)
// console.log(bar(3))

// alert("hello from browserify")// alert só é válido no browser
const Vue = require("vue")
const VueMaterial = require("vue-material")

Vue.use(VueMaterial)

Vue.component("hello-vue", require("./hello.vue"))

new Vue({
  el: "#mountpoint",
  render: r => r("hello-vue")
})