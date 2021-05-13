<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Employee List</h4>

              <table class="card-body table table-hover">
                    <thead>
                        <tr>                           
                            <th>Nome</th>                            
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(employee, index) in employees" :key="index">                            
                            <td>{{employee.name}}</td>                           
                            <td>  <button class="btn btn-secondary" type="button" >Excluir</button></td>
                        </tr>

                    </tbody>
                </table>

            <ul>
                <li v-for="(employee, index) in employees" :key="index">
                    <router-link :to="{
                            name: 'employee-details',
                            params: { employee: employee, id: employee.id }
                        }">
                            {{employee.employeeName}}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "employees-list",
  data() {
    return {
      employees: []
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveEmployees() {
      http
        .get("/employees")
        .then(response => {
          this.employees = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveEmployees();
    }
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrieveEmployees();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 450px;
  margin: auto;
}
</style>
