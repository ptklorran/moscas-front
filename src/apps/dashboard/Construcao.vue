<template>
  <layout class="expande-horizontal" :title="$route.name">
    <div class="expande-horizontal centraliza wrap" style="background: #f5f5f5; flex-direction: column; height: 30vh;">
        <img width="120" :src="$theme.logo" alt="">
        <h2 class="orange--text text-center fonte ">ESTAMOS CONSTRUINDO AQUI!</h2>
    </div>
    <div class="expande-horizontal centraliza wrap" :style="`background: ${$theme.background}`">
        <v-sheet
            class="pa-3"
            :style="`background: ${$theme.background}`"
        >
            <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                min-width="300"
                type="card"
            ></v-skeleton-loader>
        </v-sheet>
        <v-sheet
            class="pa-3"
            :style="`background: ${$theme.background}`"
        >
            <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                min-width="300"
                type="card"
            ></v-skeleton-loader>
        </v-sheet>
        <v-sheet
            class="pa-3"
            :style="`background: ${$theme.background}`"
        >
            <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                min-width="300"
                type="card"
            ></v-skeleton-loader>
        </v-sheet>
        <v-sheet
            class="pa-3"
            :style="`background: ${$theme.background}`"
        >
            <v-skeleton-loader
                class="mx-auto"
                max-width="300"
                min-width="300"
                type="card"
            ></v-skeleton-loader>
        </v-sheet>
    </div>
  </layout>
</template>
