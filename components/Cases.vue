<script lang="ts" setup>
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
    import type Case from '~/interfaces/Case';

    import caseNotFound from '~/json/caseNotfound.json';

    // Props
    const props = defineProps(['content']);

    // States
    const featured = ref<Case>(props.content?.casesCollection.items[0]);

    // Handle changeCase func
    const changeCase = (id:string) => {

        // Show loader
        document.querySelector('#target-case')?.classList.add('case--loading');
        document.querySelector('.cases__example')?.classList.add('cases__example--loading');

        // Disable active point
        document.querySelector(`.slider-nav__btn.active`)?.classList.remove('active');

        wait(async () => {

            // Fetch data
            const { data, error } = await useFetch(`/api/case?id=${id}`, {
                transform: ( data:any ) => data.data.cases
            });

            // Enable active point
            document.querySelector(`.slider-nav__btn[data-id="${id}"]`)?.classList.add('active');

            // Hide loader
            document.querySelector('#target-case')?.classList.remove('case--loading');
            document.querySelector('.cases__example')?.classList.remove('cases__example--loading');

            if(!error.value){
                return featured.value = data.value
            } else {
                return featured.value = caseNotFound;
            }
        })
    }

</script>

<template>
    <div v-if="props.content" class="cases" id="cases">
        <div class="cases__content container">
            <div class="col-1">
                <div class="cases__text">
                    <slot name="title"></slot>
                </div>
            </div>

            <div class="col-2">
                <nav class="cases__text cases__text--icons">
                    <ul id="target-cases" class="slider-nav">
                        <li v-for="(item, index) in props.content.casesCollection.items">
                            <button @click.prevent="changeCase(item.sys.id)" :data-id="item.sys.id" class="slider-nav__btn" :class="index == 0 ? 'active' : ''" :style="`background-color:${item.appColor.value}`">
                                <img :src="item.applicationIcon.url" :alt="item.applicationIcon.title">
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="cases__example container">
            <div id="target-case" class="case" :class="featured.videoDemonstration ? 'case--video' : ''" :style="`background-image: url(${featured.imageDemonstration.url})`">
                <h3 class="title title--white">{{ featured.title }}</h3>

                <ul class="technologies" v-if="featured.technologyIconsCollection.total > 0">
                    <li v-for="item in featured.technologyIconsCollection.items" class="technologies__item" :title="item.name" v-html="item.technologyIcons"></li>
                </ul>


                <div class="description">
                    <div class="description__content col-1" v-html="documentToHtmlString(featured.content.json)"></div>
                </div>

                <div class="btn" v-if="featured.urlArr">

                    <form v-if="featured.urlArrMeta" v-for="(item, index) in featured.urlArrMeta" target="_blank" :action="featured.urlArr[index]?.value" method="post">
                        <button v-if="featured.urlArr[index] && item && item.key.length > 0 && item.value.length > 0" type="submit" class="btn__link btn__link--button">
                            <input type="hidden" :name="item.key" :value="item.value">

                            <span class="btn__gfx">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23.589" height="23.589" viewBox="0 0 23.589 23.589">
                                    <path id="Path_13" data-name="Path 13" d="M19.9,14.743H18.429a.737.737,0,0,0-.737.737v5.16H2.949V5.9H9.583a.737.737,0,0,0,.737-.737V3.686a.737.737,0,0,0-.737-.737H2.211A2.211,2.211,0,0,0,0,5.16V21.377a2.211,2.211,0,0,0,2.211,2.211H18.429a2.211,2.211,0,0,0,2.211-2.211v-5.9A.737.737,0,0,0,19.9,14.743ZM21.869,0h-7.31a1.29,1.29,0,0,0-1.29,1.29v.862A1.29,1.29,0,0,0,14.6,3.4l3.1-.088L6.222,14.7l0,0a1.106,1.106,0,0,0,0,1.564l1.1,1.1,0,0a1.106,1.106,0,0,0,1.562,0L20.272,5.9l-.087,3.1V9.03a1.29,1.29,0,0,0,1.29,1.29H22.3a1.29,1.29,0,0,0,1.29-1.29V1.72h0A1.72,1.72,0,0,0,21.869,0Z" fill="#282a2e"></path>
                                </svg>
                            </span>
                            {{ featured.urlArr[index]?.key }}
                        </button>
                    </form>
                    
                    <a v-else v-for="item in featured.urlArr" target="_blank" :href="item?.value" class="btn__link">
                        <span class="btn__gfx">
                            <svg xmlns="http://www.w3.org/2000/svg" width="23.589" height="23.589" viewBox="0 0 23.589 23.589">
                                <path id="Path_13" data-name="Path 13" d="M19.9,14.743H18.429a.737.737,0,0,0-.737.737v5.16H2.949V5.9H9.583a.737.737,0,0,0,.737-.737V3.686a.737.737,0,0,0-.737-.737H2.211A2.211,2.211,0,0,0,0,5.16V21.377a2.211,2.211,0,0,0,2.211,2.211H18.429a2.211,2.211,0,0,0,2.211-2.211v-5.9A.737.737,0,0,0,19.9,14.743ZM21.869,0h-7.31a1.29,1.29,0,0,0-1.29,1.29v.862A1.29,1.29,0,0,0,14.6,3.4l3.1-.088L6.222,14.7l0,0a1.106,1.106,0,0,0,0,1.564l1.1,1.1,0,0a1.106,1.106,0,0,0,1.562,0L20.272,5.9l-.087,3.1V9.03a1.29,1.29,0,0,0,1.29,1.29H22.3a1.29,1.29,0,0,0,1.29-1.29V1.72h0A1.72,1.72,0,0,0,21.869,0Z" fill="#282a2e"></path>
                            </svg>
                        </span>
                        {{ item?.key }}
                    </a>
                </div>

                <video v-if="featured.videoDemonstration" class="video" :src="featured.videoDemonstration.url" muted loop autoplay></video>
            </div>

            <CaseLoader />
        </div>
    </div>
</template>

<style lang="scss">
    @import '~/assets/scss/main.scss';
    
    .cases{
        background-color: $black;
        @media only screen and (max-width: 999px){
            margin-top: -60px;
            position: relative;
            z-index: 1;
            &::after{
                content: '';
                width: 100%;
                height: 60px;
                z-index: 0;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: #191A1B;
            }
        }
        &__content{
            padding-top: 20px;
            padding-bottom: 20px;
            display: flex;
            .col-1{
                .cases__text{
                    padding: 20px 120px;
                }
                
            }
            .col-2{
                .cases__text{
                    padding: 20px 80px;
                    @media only screen and (max-width: 999px) {
                        padding: 0 !important;
                    }
                }
            }
        }
        &__text{
            
            color: $white;
            .slider-nav{
                display: flex;
                justify-content: flex-end;
                @media only screen and (max-width: 999px){
                    padding-right: 0 !important;
                }
                li{
                    .slider-nav__btn{
                        position: relative;
                        width: 70px;
                        height: 70px;
                        border: 0;
                        padding: 5px;
                        border-radius: 5px;
                        cursor: pointer;
                        z-index: 1;
                        @media only screen and (max-width: 499px){
                            width: 16vw;
                            height: 16vw;
                        }
                        &::after{
                            content: '';
                            width: 14px;
                            height: 14px;
                            display: block;
                            border-radius: 100%;
                            position: absolute;
                            background-color: $primary;
                            transform: translateX(-50%);
                            left: 50%;
                            bottom: 0px;
                            filter: opacity(0%);
                            transition: .5s ease;
                            z-index: 0;
                        }
                        &.active{
                            pointer-events: none;
                            &::after{
                                bottom: -20px;
                                filter: opacity(100%);
                                transition: 1s linear(0 0%, 0.22 2.1%, 0.86 6.5%, 1.11 8.6%, 1.3 10.7%, 1.35 11.8%, 1.37 12.9%, 1.37 13.7%, 1.36 14.5%, 1.32 16.2%, 1.03 21.8%, 0.94 24%, 0.89 25.9%, 0.88 26.85%, 0.87 27.8%, 0.87 29.25%, 0.88 30.7%, 0.91 32.4%, 0.98 36.4%, 1.01 38.3%, 1.04 40.5%, 1.05 42.7%, 1.05 44.1%, 1.04 45.7%, 1 53.3%, 0.99 55.4%, 0.98 57.5%, 0.99 60.7%, 1 68.1%, 1.01 72.2%, 1 86.7%, 1 100%);
                            }
                        }
                        img{
                            width: 100%;
                            height: 100%;
                            object-fit: scale-down;
                            pointer-events: none;
                        }
                    }
                    &:nth-child(n+2){
                        margin-left: 20px;
                    }
                }
                @media only screen and (max-width: 999px){
                    padding-right: 40px;
                    flex-wrap: wrap;
                    li{
                        margin-left: 0 !important;
                        margin-right: 20px !important;
                        margin-bottom: 40px !important;
                    }
                }
                @media only screen and (max-width: 999px){
                    li{
                        margin-bottom: 30px !important;
                    }
                }
            }
        }
        &__example{
            border-radius: 5px;
            position: relative;
            z-index: 1;
            .case{
                background-color: $gray;
                display: flex;
                flex-direction: column;
                padding: 80px 120px;
                height: 600px;
                background-size: cover;
                background-position: 50%;
                background-repeat: no-repeat;
                border-radius: 5px;
                position: relative;
                z-index: 1;
                overflow: hidden;
                filter: opacity(100%);
                transition: .5s ease;
                > * {
                    filter: drop-shadow(1px 1px 1px transparentize($black, .05));
                }
                &--video::before{
                    content: '';
                    width: 90vw;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    background: inherit;
                    background: linear-gradient(90deg, rgba(0,0,0,.9) 0%, rgba(25,29,55,.5) 100%);
                    z-index: -1;
                }
                &--loading{
                    filter: opacity(0%);
                }
                @media only screen and (max-width: 1250px){
                    margin-left: 20px;
                    margin-right: 20px;
                    padding-left: 60px;
                    padding-right: 60px;
                }
                @media only screen and (max-width: 999px){
                    padding: 40px;
                    height: auto;
                }
                @media only screen and (max-width: 599px){
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .title{
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-bottom: 0;
                    &::after{
                        content: '';
                        height: 5px;
                        width: 100px;
                        display: block;
                        margin-top: 10px;
                        background-color: $white;
                    }
                }
                .technologies{
                    list-style: none;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                    &__item{
                        margin-top: 20px;
                        margin-right: 20px;
                        &:last-child{
                            margin-right: 0;
                        }
                    }
                    svg{
                        height: 30px;
                        width: auto;
                        path{
                            fill: $white;
                        }
                    }
                }
                .description{
                    color: $white;
                    @include textFormat();
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: flex-end;
                    &__content{
                        max-width: calc(1080px - 240px);
                    }
                }
                .btn{
                    margin-top: 40px;
                }
                .video{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: -2;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    @media only screen and (max-width: 999px){
                        display: none;
                    }
                }
            }
        }
        .loader{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: $gray;
            border: 1px dashed transparentize($white, .8);
            z-index: -1;
            display: flex;
            justify-content: center;
            align-items: center;
            @media only screen and (max-width: 1250px){
                width: calc(100% - 40px);
            }
            &__spinner{
                width: 100px;
                height: 100px;
            }
        }
    }
</style>