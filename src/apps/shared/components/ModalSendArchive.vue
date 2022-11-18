<template>
  <v-slide-group show-arrows>
    <v-dialog fullscreen transition="slide-x-transition" v-model="viewImgDialog">
      <div class="expande-horizontal centraliza" style="height: 100vh; background: rgba(0,0,0, 0.8)">
        <v-flex xs12 md4 class="elevation-0">
          <div class="expande-horizontal centraliza pa-3" style="background: #e2e2e2; flex-direction: column; border-radius: 6px;">
            <div class="expande-horizontal">
              <v-btn @click="setModalViewImg('', false)" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </div>
            <img :style="`width: 100%`" class="" :src="link" />
          </div>
        </v-flex>
      </div>
    </v-dialog>
    <v-slide-item v-for="(link, i) in getLinks" :key="link">
      <v-card color="#333" width="240" height="140" class="pa-2 ma-3">
        <v-img contain @click="setModalViewImg(link, true)" style="height: 100px; width: 400px; cursor: pointer;" class="img " :src="link"></v-img>
        <v-btn @click="createConfirmAction({
          opened: true,
          message: 'Remover Imagem?',
          action: 'removeLink',
          action_value: link
        })" text block class="fonte">
          <span class="fonte white--text text-capitalize">remover</span>
          <v-icon color="white">mdi-image-remove</v-icon>
        </v-btn>
      </v-card>
    </v-slide-item>
    <v-slide-item>
      <v-card outlined width="240" height="140" class="pa-2 ma-3">
        <div class='input-wrapper centraliza' style="display: flex; height: 140px; align-items: center;">
            <label for='input-file' style="background: #333;">
                <span class="fonte white--text mr-1">Add Imagem</span>
                <v-icon color="white">mdi-image-plus</v-icon>
            </label>
            <input style="cursor: pointer;" id='input-file' type='file' accept="image/*" name="importxml" @change="upload" />
            <span id='file-name'></span>
        </div>
      </v-card>
    </v-slide-item>
  </v-slide-group>

  <!-- <v-dialog transition="slide-x-transition" elevation-0 persistent style="overflow: hidden" v-model="getModalSendArchive">
    <v-container style="background: rgba(0,0,0,0.5);" fluid>
        <v-layout justify-center>
            <v-flex xs12 md6>
                <v-card tile min-height="500">
                    <v-card-title>
                        <v-flex xs12>
                            <div class="semQuebra centraliza expande-horizontal pr-2">
                              <v-btn small @click="disableModalSendArchive" icon>
                                  <v-icon color="grey" size="20">mdi-chevron-left</v-icon>
                              </v-btn>
                              <span class="fonte">Envio</span>
                              <v-spacer></v-spacer>
                              <form ref="form">
                                <div class='input-wrapper'>
                                    <label for='input-file'>
                                        <span class="fonte black--text mr-1">Add</span>
                                        <v-icon color="black">mdi-image-plus</v-icon>
                                    </label>
                                    <input id='input-file' type='file' accept="image/*" name="importxml" @change="upload" />
                                    <span id='file-name'></span>
                                </div>
                              </form>
                            </div>
                        </v-flex>
                        <v-divider></v-divider>
                    </v-card-title>

                    <v-flex xs12 class="pa-3">
                      <div style="flex-wrap: wrap;" class="expande-horizontal centraliza wrap">
                        
                      </div>
                    </v-flex>

                </v-card>
                <v-card tile class="elevation-0 pa-3">
                  <v-flex xs12>
                    <div class="expande-horizontal centraliza">
                      <v-btn @click="disableModalSendArchive" :color="$theme.primary" class="btn fonte" tile>Terminei de enviar
                        <v-icon>mdi-check</v-icon>
                      </v-btn>
                    </div>
                  </v-flex>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container> -->
<!-- </v-dialog> -->
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        viewImgDialog: false,
        link: ''
      }
    },
    computed: {
      ...mapGetters([
        'getModalSendArchive',
        'getLinks',
        'getPercentage'
      ])
    },
    methods: {
      ...mapActions([
        "createConfirmAction",
        "addLink",
        "removeLink",
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

        this.setCurrentLinkInfo({ file, metadata })

        const self = this
        this.$storage.ref('images').child(file.name).put(file, metadata)
            .then(function(snapshot) {
              snapshot.ref.getDownloadURL().then(function(url) {
                  self.addLink(url)
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