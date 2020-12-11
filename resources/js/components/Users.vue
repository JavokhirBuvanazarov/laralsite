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
                  <th>Date of registration</th>
                  <th>Actions</th>
                </tr>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type | upText}}</td>
                  <td>{{ user.created_at | customizedDate }}</td>
                  <td>
                      <a href="#">
                          <i class="fa fa-edit blue"></i>
                      </a>
                      <a href="#" class="ml-2" @click="deleteUser(user.id)">
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
                                <input placeholder="Name of user" v-model="form.name" type="text" name="name"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <input placeholder="Email address" v-model="form.email" type="email" email="email"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <textarea placeholder="bio of user" v-model="form.bio" type="text" bio="bio"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>
                            <div class="form-group">
                                <select placeholder="type of user" v-model="form.type" type="text" name="type"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="admin">Admin</option>
                                    <option value="user">Standart User</option>
                                    <option value="author">Author</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                            <div class="form-group">
                                <input placeholder="password of user" v-model="form.password" type="text" password="password"
                                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
                            </div>           
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Create</button>
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
                users: {},
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
            loadUsers() {
                axios.get('api/user').then(({data}) => (this.users = data.data))
            }, 
            createUser() {
                this.$Progress.start()
                this.form.post('api/user')
                    .then(() => {
                        Fire.$emit('loadUsers')
                        $('#addNew').modal('hide')
        
                        toast.fire({
                            icon: 'success',
                            title: 'Signed in successfully'
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                this.$Progress.finish()
            },
            deleteUser(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        this.form.delete('api/user/' + id).then(() => {
                            if (result.isConfirmed) {
                                Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )
                                Fire.$emit('loadUsers')
                            }
                    }).catch(() => {
                        Swal('Failed!', 'There was something wrong', 'warning')
                    })
                })
            }
        },
        created() {
           this.loadUsers()
           Fire.$on('loadUsers', () => {
             this.loadUsers()
           })
        }
    }
</script>