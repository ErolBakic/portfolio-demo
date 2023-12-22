<script setup>
    const props = defineProps(['error']);
</script>

<template v-if="props.error">
    <div class="err-container">
        <main class="err-container__content">
            <h1 class="title title--white"><span class="title-err">Av!</span>Det gjorde ondt!</h1>
            <p class="status-text">{{ props.error.statusCode == 404 ? 'Siden blev ikke fundet!' : 'Noget gik galt!' }}</p>

            <div class="btn btn--center">
                <a @click.prevent="navigateTo('/')" href="/" class="btn__link">
                    <span class="btn__gfx">
                        <svg xmlns="http://www.w3.org/2000/svg" width="23.589" height="23.589" viewBox="0 0 23.589 23.589">
                            <path id="Path_13" data-name="Path 13" d="M19.9,14.743H18.429a.737.737,0,0,0-.737.737v5.16H2.949V5.9H9.583a.737.737,0,0,0,.737-.737V3.686a.737.737,0,0,0-.737-.737H2.211A2.211,2.211,0,0,0,0,5.16V21.377a2.211,2.211,0,0,0,2.211,2.211H18.429a2.211,2.211,0,0,0,2.211-2.211v-5.9A.737.737,0,0,0,19.9,14.743ZM21.869,0h-7.31a1.29,1.29,0,0,0-1.29,1.29v.862A1.29,1.29,0,0,0,14.6,3.4l3.1-.088L6.222,14.7l0,0a1.106,1.106,0,0,0,0,1.564l1.1,1.1,0,0a1.106,1.106,0,0,0,1.562,0L20.272,5.9l-.087,3.1V9.03a1.29,1.29,0,0,0,1.29,1.29H22.3a1.29,1.29,0,0,0,1.29-1.29V1.72h0A1.72,1.72,0,0,0,21.869,0Z" fill="#282a2e"></path>
                        </svg>
                    </span>

                    Tilbage til forsiden
                </a>
            </div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
    @import '~/assets/scss/main.scss';

    .err-container{
        width: 100vw;
        height: 100vh;
        background-color: $black;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('/assets/gfx/404.png');
        background-position: 80% 45%;
        background-repeat: no-repeat;
        padding: 20px;
        &__content{
            padding: 50px;
            border: 3px solid transparentize($white, .8);
            border-radius: 20px;
            background-color: $black;
            @media only screen and (max-width: 999px){
                padding: 20px;
            }
        }
        .title{
            flex-direction: column;
            .title-err{
                color: $primary !important;
                margin-right: 10px;
                margin-bottom: 10px;
                font-size: 90px;
                @media only screen and (max-width: 999px){
                    font-size: 40px;
            }
            }
        }
        .status-text{
            color: $white;
            text-align: center;
            margin-bottom: 20px;
            font-family: $paragraf;
        }
    }
</style>