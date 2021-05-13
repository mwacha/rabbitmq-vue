<template>
    <div id="app" class="container-fluid">
        <div class="site-info">           
            <h3>Stomp Example</h3>
        </div>
        <nav>
            <router-link class="btn btn-primary" to="/">Employees</router-link>
            <router-link class="btn btn-primary" to="/add">Add</router-link>
            <router-link class="btn btn-primary" to="/search">Search</router-link>
        </nav>
        <br/>
        <router-view/>
    </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
.site-info {
  color: black;
  margin-bottom: 20px;
}

.btn-primary {
  margin-right: 5px;
}

.container-fluid {
  text-align: center;
}
</style>
