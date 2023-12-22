<script setup lang="ts">
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

    // Props
    const props = defineProps(['content']);

    // Date
    const date = new Date

    // handle anchors
    const handleAnchors = (key:string, value:string) => {
        switch(key){
            case 'Telefon':
                return `tel:+45${value.replace(/\s/g, '')}`;

            case 'E-mail':
                return `mailto:${value}`;

            default:
                return value;
        }
    }
</script>

<template>
    <footer v-if="props.content" class="footer" id="kontakt">
        <div class="footer__content container">

            <div class="col-1">
                <div class="footer__text">
                    <h3 class="title">
                        <span v-html="props.content.contactTitle.svgIconCode"></span>
                        <span>{{ content.contactTitle.entityTitle }}</span>
                    </h3>

                    <div v-html="documentToHtmlString(content.contactContent.json)"></div>
                </div>
            </div>

            <div v-if="props.content.contactInfoCollection.total > 0" class="col-2">
                <div class="footer__text">

                    <ul class="contacts">

                        <li v-for="item in props.content.contactInfoCollection.items" class="contacts__item">
                            <a target="_blank" :href="handleAnchors(item.entityTitle, item.entityValue)">
                                <span v-html="item.svgIconCode"></span>
                                <span>
                                    <span class="small-title">{{ item.entityTitle }}</span>
                                    {{ item.entityValue }}
                                </span>
                            </a>
                        </li>

                    </ul>

                </div>
            </div>

        </div>

        <div class="cridentials">
            <p>erolbakic.dk © Erol Bakic 2017 - {{ date.getFullYear() }} All Rights Reserved</p>
        </div>
    </footer>
</template>

<style lang="scss">
    @import '~/assets/scss/main.scss';

    .footer{
        position: relative;
        @media only screen and (max-width: 999px){
            z-index: 2;
        }
        &::before{
            content: '';
            background-color: #191A1B;
            width: 100%;
            position: absolute;
            bottom: 100%;
            height: 60px;
            z-index: 0;
            @media only screen and (max-width: 999px){
                content: none;
            }
        }
        background-color: #191A1B;
        &__content{
            display: flex;
            padding-top: 80px;
            padding-bottom: 80px;
            color: $white;
            font-family: $paragraf;
            @media only screen and (max-width: 999px){
                flex-direction: column;
                padding-top: 40px;
                padding-bottom: 40px;
            }
            .col-1{
                @media only screen and (max-width: 1250px){
                    flex: 1;
                }
                .footer__text{
                    padding: 20px 120px;
                    @include textFormat();
                    @media only screen and (max-width: 999px){
                        padding-left: 60px;
                        padding-right: 60px;
                        padding-top: 0;
                        padding-bottom: 0;
                    }
                    @media only screen and (max-width: 599px){
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                }
            }
            .col-2{
                position: relative;
                @media only screen and (max-width: 1250px){
                    flex: 1;
                    min-width: auto;
                }
                @media only screen and (max-width: 999px){
                    min-width: auto;
                }
                &::before{
                    content: '';
                    width: 1px;
                    height: 80%;
                    background-color: transparentize($white, .9);
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    @media only screen and (max-width: 999px){
                        content: none;
                    }
                }
                .footer__text{
                    padding: 20px 80px;
                    @media only screen and (max-width: 999px){
                        padding-left: 60px;
                        padding-right: 60px;
                    }
                    @media only screen and (max-width: 599px){
                        padding-left: 20px;
                        padding-right: 20px;
                    }
                    .contacts{
                        list-style: none;
                        margin-top: 60px;
                        @media only screen and (max-width: 999px){
                            margin-top: 20px;
                        }
                        &__item{
                            &:nth-child(n+2){
                                margin-top: 40px
                            }
                            a{
                                display: flex;
                                text-decoration: none;
                                color: $white;
                                svg{
                                    transform: translateY(0);
                                    margin-right: 20px;
                                }
                                span{
                                    padding-left: 0;
                                    transition: .1s ease;
                                    line-height: 20px;
                                    .small-title{
                                        font-size: 30px;
                                        font-family: $heading;
                                        color: $primary;
                                        margin-bottom: 10px;
                                    }
                                    display: flex;
                                    flex-direction: column;
                                }
                                &:hover{
                                    span {
                                        padding-left: 10px;
                                        .small-title{
                                            padding-left: 0;
                                            color: $secondary;
                                        }
                                    }
                                    svg{
                                        path{
                                            fill: $secondary;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .cridentials{
            padding-top: 20px;
            padding-bottom: 20px;
            color: transparentize($white, .9);
            font-size: 16px;
            font-family: $paragraf;
            text-align: center;
            @include textFormat();
        }
    }
</style>