<template>
  <div class="submitform">
    <div v-if="!submitted">
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" class="form-control" id="name" required v-model="employee.employeeName" name="name">
        </div>
    
        <div class="form-group">
          <label for="login">Login</label>
          <input type="text" class="form-control" id="login" required v-model="employee.login" name="login">
        </div>
         <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" class="form-control" id="email" required v-model="employee.email" name="email">
        </div>
         <div class="form-group">
          <label for="senha">Senha</label>
          <input type="number" class="form-control" id="senha" required v-model="employee.senha" name="senha">
        </div>
    
        <button v-on:click="saveEmployee" class="btn btn-success">Enviar</button>
    </div>
    
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" v-on:click="newEmployee">Add</button>
    </div>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "add-customer",
  data() {
    return {
      employee: {
        id: 0,
        employeeName: "",
        login: "",
        email: "",
        senha: ""
      },
      submitted: false
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveEmployee() {
      var data = {
        name: this.employee.name,
        age: this.employee.age
      };

      http
        .post("/employees", data)
        .then(response => {
          this.employee.id = response.data.id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

      this.submitted = true;
    },
    newCustomer() {
      this.submitted = false;
      this.customer = {};
    }
    /* eslint-enable no-console */
  }
};
</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
