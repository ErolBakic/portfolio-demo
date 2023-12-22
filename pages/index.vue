<script setup lang="ts">
    import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

    // Fetch data content
    const { data:content , pending, error } = await useFetch('/api/content', {
        transform: ( content:any ) => content.data.base
    });

    // States
    const isReady = ref<boolean>(false);

    // SEO
    if(content.value){
        useSeoMeta({
            title: content.value.seoEntity.title,
            ogTitle: content.value.seoEntity.title,
            description: content.value.seoEntity.description,
            ogDescription: content.value.seoEntity.description,
            ogImage: content.value.seoEntity.pageImage.url,
        });
    }
    
    // Handle scrollTo
    const handleScrollTo = (item:string) => {
        const target = document.querySelector(`#${item.toLowerCase()}`);
    
        // non-null assertion operator
        target!.scrollIntoView({
            behavior: 'smooth'
        });
    }

    setTimeout(() => {
        return isReady.value = true;
    }, 500);

</script>

<template>
    <div class="boost" :class="isReady ? 'boost--ready' : ''">

        <aside class="boost__text" v-if="error">
            <p>Det ser ud til at være problemer med indlæsningen af data!</p>
            <p>Vil du være så sød at kontakte mig på LinkedIn og gøre mig opmærksom på, at min portefølje ikke fungerer? ❤️</p>
        </aside>
        
        <div v-if="content">
            <Header
                :nav="content.navigation"
                @scrollTo="handleScrollTo"
            >
                <template v-slot:hero>
                    <h1 id="target-maintitle" class="header__title main-title">
                        <span class="firstname">{{ content.firstname }}</span>
                        <span class="lastname">{{ content.lastname }}</span>
                    </h1>

                    <figure v-if="content.profileImage" class="profile" id="target-profile">
                        <img :src="content.profileImage.url" :alt="content.profileImage.title     ">
                    </figure>
                </template>

                <template v-slot:content>
                    <h2 class="sub-title">{{ content.heroTitle }}</h2>
                    <hr>
                    <div class="eyecatcher" v-html="documentToHtmlString(content.heroContent.json)"></div>
                </template>
                
            </Header>

            <div class="main" v-if="content">
                <div class="main__content container">
                    <Profile col="col-1">
                        <h3 class="title">
                            <span v-html="content.profileTitle.svgIconCode"></span>
                            <span>{{ content.profileTitle.entityTitle }}</span>
                        </h3>

                        <div v-html="documentToHtmlString(content.profileContent.json)"></div>
                        
                        <div v-if="content.linkToCv && content.linkToCv.entityMediaCollection.total > 0" class="btn btn--center">

                            <a v-for="item in content.linkToCv.entityMediaCollection.items" target="_blank" :title="item.title" :href="item.url" class="btn__link">
                                <span class="btn__gfx" v-html="content.linkToCv.svgIconCode"></span>
                                
                                {{ item.title }}
                            </a>

                        </div>
                    </Profile>

                    <Profile col="col-2">
                        <h3 class="title">
                            <span v-html="content.skillsTitle.svgIconCode"></span>
                            <span>{{ content.skillsTitle.entityTitle }}</span>
                        </h3>

                        <div v-html="documentToHtmlString(content.skillsContent.json)"></div>
                    </Profile>
                </div>
            </div>

            <Cases v-if="content.casesCollection.total > 0" :content="content">
                <template v-slot:title v-if="content.casesTitle">
                    <h3 class="title">
                        <span v-html="content.casesTitle.svgIconCode"></span>
                        <span>{{ content.casesTitle.entityTitle }}</span>
                    </h3>
                </template>
            </Cases>

            <Footer :content="content" />
        </div>

    </div>
</template>