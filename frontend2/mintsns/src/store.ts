import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import User from "@/model/User";

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(User)

export default new Vuex.Store({
    plugins: [VuexORM.install(database)]
});
