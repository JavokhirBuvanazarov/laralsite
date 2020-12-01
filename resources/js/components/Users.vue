<template>
<div class="container">
    <div class="row mt-5">
        <div class="col-xs-12" style="width:100%;">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Users Management</h3>

              <div class="box-tools">
                <button class="btn btn-success mb-2" data-toggle="modal" data-target="#addNew" style="float:right"> <i class="fas fa-user-plus mr-1"></i> Add new</button>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive no-padding">
              <table class="table table-hover">
                <tbody><tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <td>183</td>
                  <td>John Doe</td>
                  <td>11-7-2014</td>
                  <td><span class="label label-success">Approved</span></td>
                  <td>
                      <a href="#">
                          <i class="fa fa-edit blue"></i>
                      </a>
                      <a href="#" class="ml-2">
                          <i class="fa fa-trash red"></i>
                      </a>
                  </td>
                </tr>
                
              </tbody></table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addNewLabel">Add New</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser">
                        <div class="modal-body">
                            <div class="form-group">
                                <input placeholder="Name" v-model="form.name" type="text" name="name" class="form-control" :class="{ 'is_valid': form.errors.has('name')}">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input placeholder="Email Address" v-model="form.email" type="email" name="email" class="form-control" :class="{ 'is_valid': form.errors.has('email')}">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <textarea placeholder="Bio for user (optional)" v-model="form.bio" type="text" name="bio" class="form-control" :class="{ 'is_valid': form.errors.has('bio')}"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select placeholder="Select user role" v-model="form.type" type="type" name="type" class="form-control" :class="{ 'is_valid': form.errors.has('type')}">
                                    <option value="admin">Admin</option>
                                    <option value="user">Standart User</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            <div class="form-group">
                                <input placeholder="Password" v-model="form.password" type="password" name="password" class="form-control" :class="{ 'is_valid': form.errors.has('password')}">
                                <has-error :form="form" field="password"></has-error>
                            </div>           
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods:{
            createUser() {
                this.form.post('api/user')
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>