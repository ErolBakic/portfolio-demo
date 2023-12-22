<script lang="ts" setup>

    // Props
    const props = defineProps({
        col: {
            type: String as () => 'col-1' | 'col-2',
            default : 'col-1'
        }
    });

    // Render Container Tag
    const containerTag = computed(() => (props.col == 'col-1' ? 'main' : 'div'));
</script>

<template>
    <div :class="props.col">
        <component :is="containerTag" class="main__text" :class="props.col == 'col-2' ? 'main__text--small' : ''" id="profil">
            <slot />
        </component>
    </div>
</template>

<style lang="scss">
    @import '~/assets/scss/main.scss';

    .main{
        background-color: $black;
        color: $white;
        position: relative;
        &__content{
            display: flex;
            .col-1,
            .col-2{
                height: 100%;
            }
        }
        &__text{
            position: relative;
            transform: translateY(-60px);
            z-index: 1;
            background-color: $gray;
            border-radius: 5px;
            padding: 80px 120px;
            font-family: $paragraf;
            line-height: 20px;
            &--small{
                padding: 80px
            }
            @include textFormat();
        }
    }
</style>