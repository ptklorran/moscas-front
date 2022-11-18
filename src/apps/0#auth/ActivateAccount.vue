<template>
    <div class="expande-horizontal centraliza" style="height: 100vh;">
        <v-icon :color="$theme.primary" class="mr-2" size="50">mdi-account-circle</v-icon>
        <h4 class="text-center fonte orange--text"> Ativando conta... </h4>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: ['id'],
    methods: {
        ...mapActions([
            "activateAccount"
        ])
    },
    created() {
        this.activateAccount(this.id)
    }

}
</script>