<template lang="pug">
    div.flex.horizontal-expand.horizontal-centralize.vertical-centralize()
        div.flex.horizontal-expand.expand-vh-vertical(style="min-height: 100vh; background: linear-gradient(to right, #000000, #434343);; display: flex; width: 100%; justify-content: center;")
          v-flex.pa-3(xs12 md3 v-if="passo===1")
              v-form(ref="form")
                  div.flex.horizontal-expand.horizontal-centralize.vertical-centralize.column
                      div.flex.expande-horizontal
                        v-btn(icon @click="$router.go(-1)" class="elevation-1" color="white")
                          v-icon mdi-chevron-left
                      div.flex.expande-horizontal.centraliza
                        img(height="80" :src="$theme.logo")
                      div.expande-horizontal.centraliza
                        span.margin-vertical.mb-6.fonte.text-center.mt-6.pr-6.pl-6.font-weight-thin.white--text Faça seu cadastro abaixo.

                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.white--text Nome Completo
                          v-flex(xs12)
                              v-text-field(
                                  dense
                                  dark
                                  v-model="payload.nome"
                                  placeholder="Digite o seu nome completo"
                                  :rules="[v => !!v || 'Preencha aqui']"
                                  :color="$theme.primary"
                                  solo-inverted
                                  flat
                              )
                      
                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.white--text E-mail
                          v-flex(xs12)
                              v-text-field(
                                  dense
                                  dark
                                  v-model="payload.email"
                                  placeholder="Informe o seu melhor e-mail"
                                  :rules="[v => !!v || 'Preencha aqui']"
                                  :color="$theme.primary"
                                  solo-inverted
                                  flat
                              )
                      
                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.white--text CPF
                          v-flex(xs12)
                              v-text-field(
                                  dense
                                  dark
                                  v-model="payload.cpf"
                                  placeholder="000.000.000-00"
                                  :rules="[v => !!v || 'Preencha aqui']"
                                  v-mask="['###.###.###-##']"
                                  :color="$theme.primary"
                                  solo-inverted
                                  flat
                              )
                      
                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.white--text Nome da Sua Empresa
                          v-flex(xs12)
                              v-text-field(
                                  dense
                                  dark
                                  v-model="payload.nome_empresa"
                                  placeholder="Solar Energy"
                                  :rules="[v => !!v || 'Preencha aqui']"
                                  :color="$theme.primary"
                                  solo-inverted        
                                  flat
                              )
                      
                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.white--text CNPJ da Sua Empresa
                          v-flex(xs12)
                              v-text-field(
                                  dense
                                  dark
                                  v-model="payload.cnpj"
                                  placeholder="00.000.000/0000-00"
                                  v-mask="['##.###.###/####-##']"
                                  :rules="[v => !!v || 'Preencha aqui']"
                                  :color="$theme.primary"
                                  solo-inverted        
                                  flat
                              )
                      

                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.white--text Senha para login
                          v-flex(xs12)
                              v-text-field(
                                  dense
                                  dark
                                  v-model="payload.senha"
                                  :rules="[v => !!v || 'Preencha este campo']"
                                  placeholder="******"
                                  type="password"
                                  :color="$theme.primary"
                                  solo-inverted
                                  flat
                              )

                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.white--text Confirme a Senha para login
                          v-flex(xs12)
                              v-text-field(
                                  dense
                                  dark
                                  v-model="confirm_senha"
                                  :rules="[v => !!v || 'Preencha aqui']"
                                  placeholder="******"
                                  type="password"
                                  :color="$theme.primary"
                                  solo-inverted
                                  flat
                              )
                      
                      div.flex.horizontal-expand.column
                          v-flex(xs12)
                              span.fonte.red--text {{ erro }}
                          

                      //- div.mb-6.expande-horizontal.centraliza
                      //-   v-switch(class="pa-2" dark color="light-green" outlined v-model="termos" label="Ao criar a conta você concorda com os nossos termos de uso.")
                      div.mb-6.expande-horizontal.centraliza
                          v-btn.fonte(
                            :disabled="senhaOk && termos ? false : true"
                            rounded
                            @click="valida_form"
                            :color="$theme.primary"
                          ) 
                            span.fonte Finalizar e Cadastrar
                      
                      div.mb-6.flex.horizontal-expand.column
                          v-btn.fonte(
                              @click="$router.go(-1)"
                              x-small
                              text
                              block
                              dark
                              :color="$theme.primary"
                          )
                            span.white--text Tem um cadastro? Faça Login

                      //- h3.margin-vertical.mb-12.fonte.text-center Ao criar uma conta, você concorda com a nossa Política de Privacidade.

                
               

</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["sponsor_id"],
  data() {
    return {
      passo: 1,
      modal: false,
      termos: true,
      erro: '',
      confirm_senha: '',
      payload: {
        transaction_senha: "",
        senha: '',
        sponsor: {
          _id: "nosponsor"
        }
      },
      senhaOk: false
    };
  },
  watch: {
    confirm_senha(val) {
      if(val === this.payload.senha) {
        this.senhaOk = true
          this.erro = ''
      } else {
        this.senhaOk = false
        this.erro = 'Senhas não correspondem'
      }
    },
  },
  methods: {
    ...mapActions(["createUser"]),
    valida_form() {
      if (this.$refs.form.validate()) {
        this.createUser(this.payload);
      }
    }
  }
};
</script>
