<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
              <h2 class="pink--text text-xs-center">SignUp Form</h2>
            <v-container>
            <form @submit.prevent="signup">
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-model="email" label="Mail" type="email" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-model="password" label="Password" type="password" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-model="confirmPassword" label="Confirm Password" :rules="[comparePasswords]" type="password" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12>
                        <v-btn type="submit" color="red white--text">Sign up</v-btn>
                    </v-flex>
                </v-layout>
            </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    import axios from 'axios';
  export default {
    data() {
      return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        comparePasswords () {
            return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
    },
    methods: {
        signup() {
            const formData = {
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword
            }
            axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAISZgYtlnMRsbcKJjcbUZ5MG91d1Z2gP4', {
                email: formData.email,
                password: formData.password,
                returnSecureToken: true
            })
            .then((res) => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })
            this.email = ''
            this.password = ''
            this.confirmPassword = ''
            this.$router.push('/')
        }
    }
}
</script>
