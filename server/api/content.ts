// server/api/example
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const apiUrl = 'https://graphql.contentful.com/content/v1/spaces/dk5a1nb7ip2d/environments/master';
    const accessToken = config.contentfulCPAToken;
    const entryId = config.public.contentfulEntryID;
    //const entryId = '';

    if (!accessToken || !entryId) {
      return {
        status: 401,
        message: 'Unauthorized Access - Access token or entry id is missing',
        success: false
      };
    }

    const query = `
    query {
        base(id: "${entryId}") {
          seoEntity{
            title,
            description
            pageImage{ 
              fileName,
              url
            }
          }
          navigation
          firstname
          lastname
          heroTitle
          heroContent {
            json
          }
          profileImage {
            title
            description
            url
          }
          profileTitle{
            svgIconCode,
            entityTitle
          }
          profileContent {
            json
          }
          linkToCv {
            svgIconCode
            entityTitle
            entityValue
            entityMediaCollection {
              total
              items {
                title
                description
                url
              }
            }
          }
          skillsTitle{
            svgIconCode,
            entityTitle
          }
          skillsContent {
            json
          }
          casesTitle{
            svgIconCode
            entityTitle
          }
          casesCollection {
            total
            items {
              sys {
                id
              }
              title
              applicationIcon {
                title
                url
              }
              appColor
              videoDemonstration {
                title
                url
              }
              imageDemonstration {
                title
                url
              }
              technologyIconsCollection {
                total
                items {
                  name
                  technologyIcons
                }
              }
              content {
                json
              }
              urlArr,
              urlArrMeta
            }
          }
          contactTitle{
            svgIconCode
            entityTitle
          }
          contactContent {
            json
          }
    			contactInfoCollection{
            total
            items{
              svgIconCode
            	entityTitle
              entityValue
            }
          }
          footerCredentials
        }
      }                  
    `;

    
    try{
      return await $fetch(apiUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ query }),
      });

    } catch (error){
      throw {
          status: 500,
          message: error,
          success: false
      };
    }

});