import Vue from "vue";
import Router from "vue-router";
import EmployeeList from "./components/EmployeeList.vue";
import AddCustomer from "./components/AddCustomer.vue";
import SearchCustomers from "./components/SearchCustomers.vue";
import Employee from "./components/Employee.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "employees",
      alias: "/employees",
      component: EmployeeList,
      children: [
        {
          path: "/customer/:id",
          name: "customer-details",
          component: Employee,
          props: true
        }
      ]
    },
    {
      path: "/add",
      name: "add",
      component: AddCustomer
    },
    {
      path: "/search",
      name: "search",
      component: SearchCustomers
    }
  ]
});