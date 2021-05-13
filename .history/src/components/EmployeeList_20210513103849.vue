<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Employees</h4>

              <table class="card-body table table-hover">
                    <thead>
                        <tr>                           
                            <th>Name</th>                            
                            <th>E-mail</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(employee, index) in employees" :key="index">                            
                            <td>{{employee.employeeName}}</td>                           
                             <td>{{employee.email}}</td> 
                            <td>  <button class="btn btn-secondary"  v-on:click="deleteEmployee(employee.id)" type="button">Remove</button></td>
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
    },
    deleteEmployee(id) {
      http
        .delete("/employees/" + id)
        .then(response => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push('/');
        })
        .catch(e => {
          console.log(e);
        });
    }
    
  },
  mounted() {
    this.retrieveEmployees();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 450px;
  margin: auto;
}
</style>
