<template>
    <div class="expande bg pt-12 mt-12">
        <v-icon size="47" class="mb-6" color="green">mdi-lock-outline</v-icon>
        <h1 class="fonte green--text mb-6">Defina Sua Nova Senha!</h1>
        <v-card style="border-radius: 12px;" class="pa-4" width="400">
            <v-form ref="form">
                <v-flex xs12>
                    <v-text-field
                    :rules="[v => !!v || 'Preencha aqui']"
                    rounded solo-inverted type="password" dense flat v-model="nova_senha" label="Informe a nova senha aqui" :color="$primaria" />
                </v-flex>
            </v-form>
            <v-flex xs12>
                <div class="expande-horizontal centraliza">
                    <v-btn rounded class="white--text" color="green" @click="validate"> Concluir <v-icon class="mb-1" size="20">mdi-check</v-icon> </v-btn>
                </div>
            </v-flex>
        </v-card>
        <v-flex class="mt-6" xs12>
            <div class="expande-horizontal centraliza">
                <v-btn text :color="$theme.primary" @click="$router.push('/')">  Ir Para o Login <v-icon class="mb-1">mdi-chevron-right</v-icon> </v-btn>
            </div>
        </v-flex>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ['token'],
    data() {
        return {
            nova_senha: ""
        }
    },
    methods: {
        ...mapActions(['sendForgotPasswordFire']),
        validate() {
            if(this.$refs.form.validate()) {
                this.sendForgotPasswordFire({
                    token: this.token,
                    nova_senha: this.nova_senha
                })
            }
        }
    },
    created() {
        this.verificaConta()
    }

}
</script>

<style>
    .expande {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>