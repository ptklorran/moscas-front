<template>
  <div class="expande-horizontal centraliza column">
    <h3 class="fonte text-center">Arquivos</h3>
    <v-list>
      <template v-for="(file, index) in getFiles">
        <v-list-item :key="file.nome">
          <v-avatar class="mr-2" :color="$theme.primary">
            <v-icon color="white" >mdi-archive</v-icon>
          </v-avatar>
          <v-list-item-content>
            <v-list-item-title> {{ file.name }} </v-list-item-title>
            <v-list-item-subtitle> <a target="_blank" :href="file.link"> ACESSE O ARQUIVO </a> {{  }} </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-actions>
            <v-btn @click="createConfirmAction({
              icon: 'mdi-warning',
              color: 'yellow darken-3',
              message: 'Remover este arquivo?',
              action: 'removeFile',
              action_value: index
            })" color="red" icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-actions>
        </v-list-item>
        <v-divider :key="index"></v-divider>
      </template>
    </v-list>
    <div v-if="!sendoff" class='input-wrapper' style="display: flex; height: 240px; align-items: center;">
        <label for='input-file2'>
            <span class="fonte black--text mr-1">Adicionar Um Arquivo</span>
        </label>
        <input style="cursor: pointer;" id='input-file2' type='file' name="importxml" @change="upload" />
        <span id='file-name2'></span>
    </div>
  </div>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    props: ['sendoff'],
    data() {
      return {
        viewImgDialog: false,
        link: ''
      }
    },
    computed: {
      ...mapGetters([
        'getModalSendArchive',
        'getFiles',
        'getFile',
        'getPercentage'
      ])
    },
    methods: {
      ...mapActions([
        "createConfirmAction",
        "addFile",
        "removeFile",
        "setPencentageSent",
        "disableModalSendArchive",
        "enableLoading",
        "disableLoading",
        "setCurrentLinkInfo"
      ]),
      setModalViewImg(link, valueModal) {
        this.link = link
        this.viewImgDialog = valueModal
      },
      upload(evt) {
        this.enableLoading();
        evt.stopPropagation();
        evt.preventDefault();
        var file = evt.target.files[0];

        var metadata = {
          'contentType': file.type
        };

        this.getFile.nome = file.name

        // this.setCurrentLinkInfo({ file, metadata })

        const self = this
        this.$storage.ref('images').child(file.name).put(file, metadata)
            .then(function(snapshot) {
              snapshot.ref.getDownloadURL().then(function(url) {
                  self.addFile(url)
                  self.$refs.form.reset()
              });
              self.$store.dispatch('disableLoading')
            })
            .catch(function(error) {
                // [START onfailure]
                self.$store.dispatch('disableLoading')
                // [END onfailure]
            });
      }
    }
  };
</script>

<style>
  input[type='file'] {
    display: none
  }

  .input-wrapper label {
    background: linear-gradient(-45deg, #d8d645, #4dff3d);
    border-radius: 5px;
    color: #fff;
    margin: 8px;
    padding: 6px 20px
  }

  .btn {
    background: linear-gradient(-45deg, #d8d645, #4dff3d);
  }

  .input-wrapper label:hover {
    background-color: #2980b9
  }

  .img {
    border-radius: 6px;
    border: 2px solid rgb(71, 73, 71);
  }
</style>