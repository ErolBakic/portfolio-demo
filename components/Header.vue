
<script lang="ts" setup>

    // Props
    const props = defineProps({
        nav : {
            type: Array,
            required: true
        }
    });

    // Emits
    const emits = defineEmits(['scrollTo']);

    // Handle navTo emit
    const handleNavTo = (item: string) => emits('scrollTo', item);
    
</script>

<template>
    <header class="header">
        <div class="header__content container">
            
            <div class="col-1">
                <div class="header__profile">
                    <slot name="hero"></slot>
                </div>
            </div>

            <div class="col-2" id="target-header">
                <div class="header__nav">
                    <nav class="nav" id="target-nav">

                        <ul id="menu-hovedmenu" class="menu">
                            <li v-for="item in props.nav" class="menu-item">
                                <a v-if="typeof item === 'string'" @click.prevent="handleNavTo(item)" :href="'#' + item">
                                    {{ item }}
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="header__text">
                    <slot name="content"></slot>
                </div>
            </div>

        </div>
    </header>
</template>

<style lang="scss">
    @import '~/assets/scss/main.scss';

    .header{
        background-color: $primary;
        color: $black;
        overflow: hidden;
        background-image: url('/assets/gfx/triangles.png');
        background-repeat: no-repeat;
        background-position: 100% 100%;
        &__content{
            padding: 40px 0;
            padding-bottom: 0;
            display: flex;
            @media only screen and (max-width: 1640px){
                padding-left: 20px;
                padding-right: 20px;
                height: 750px;
                flex-direction: column;
                position: relative;
                .col-1,
                .col-2{
                    width: 100%;
                    height: 100%;
                    flex: 1;
                }
                .col-1{
                    display: flex;
                    align-items: flex-end;
                }
                .col-2{
                    max-width: 500px;
                    @media only screen and (max-width: 999px){
                        min-width: auto;
                    }
                }
                .header__nav{
                    position: absolute;
                    top: 40px;
                    left: 20px;
                    right: 20px;
                    @media only screen and (max-width: 499px){
                        font-size: 9vw;
                        .nav > ul{
                            justify-content: space-between;
                        }
                    }
                }
                .header__text{
                    height: auto;
                    margin-top: 0;
                    transform: none;
                }
                .header__title{
                    position: relative;
                    transform: translateY(-40px);
                }
                .header__profile{
                    height: auto;
                    position: initial;
                    .main-title{
                        font-size: 120px;
                        @media only screen and (max-width: 430px){
                            font-size: 30vw;
                        }
                    }
                    .profile{
                        transform: translateY(20px);
                    }
                }
            }
            @media only screen and (max-width: 999px){
                height: auto;
                min-height: 750px;
                .header__profile{
                    .profile{
                        display: none;
                    }
                }
            }
        }
        &__title{
            position: absolute;
            justify-content: center;
            bottom: 0;
            top: 0;
            left: 0;
        }
        &__profile{
            height: calc(660px + 40px);
            position: relative;
            .profile{
                position: absolute;
                top: 0;
                right: 5px;
                bottom: -5px;
                max-width: 600px;
                img{
                    width: 100%;
                    height: auto;
                }
            }
        }
        &__nav{
            font-family: $heading;
            font-size: 40px;
            ul{
                display: flex;
                li{
                    &:nth-child(n+2){
                        margin-left: 40px;
                    }
                    a{
                        color: $black;
                        text-decoration: none;
                        position: relative;
                        &:hover{
                            color: $secondary;
                            &::before{
                                top: calc(100%);
                                width: 100%;
                                filter: opacity(100%);
                            }
                        }
                        &::before{
                            content: '';
                            display: block;
                            width: 10%;
                            margin: 0 auto;
                            height: 3px;
                            background-color: $secondary;
                            position: absolute;
                            top: 70%;
                            left: 0;
                            right: 0;
                            filter: opacity(0%);
                            transition: .2s ease;
                        }
                    }
                }
            }
        }
        &__text{
            margin-top: 40px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            transform: translateY(-50px);
            hr{
                width: 90px;
                border: 0;
                height: 3px;
                background-color: $black;
                margin: 30px 0;
            }
            .eyecatcher{
                font-family: $paragraf;
                font-size: 16px;
                line-height: 20px;
                width: calc(100% - 40px);
                @include textFormat();
            }
        }
    }
</style>