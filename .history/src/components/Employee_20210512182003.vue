<template>
  <div v-if="this.employee">
    <h4>Employee</h4>
    <div>
      <label>Name: </label> {{this.employee.name}}
    </div>
    <div>
      <label>Login: </label> {{this.employee.age}}
    </div>
    <div>
      <label>Active: </label> {{this.employee.active}}
    </div>
  
    <span v-if="this.employee.active"
      v-on:click="updateActive(false)"
      class="button is-small btn-primary">Inactive</span>
    <span v-else
      v-on:click="updateActive(true)"
      class="button is-small btn-primary">Active</span>
  
    <span class="button is-small btn-danger" v-on:click="deleteEmployee()">Delete</span>
  </div>
  <div v-else>
    <br/>
    <p>Please click on a employee...</p>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "employee",
  props: ["employee"],
  methods: {
    /* eslint-disable no-console */
    updateActive(status) {
      var data = {
        id: this.employee.id,
        name: this.employee.name,
        age: this.employee.age,
        active: status
      };

      http
        .put("/employee/" + this.employee.id, data)
        .then(response => {
          this.employee.active = response.data.active;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteEmployee() {
      http
        .delete("/employee/" + this.employee.id)
        .then(response => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push('/');
        })
        .catch(e => {
          console.log(e);
        });
    }
    /* eslint-enable no-console */
  }
};
</script>