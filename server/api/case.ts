// server/api/example
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const apiUrl = 'https://graphql.contentful.com/content/v1/spaces/dk5a1nb7ip2d/environments/master';
    const accessToken = config.contentfulCPAToken;

    // Extract the id from the query parameters in a GET request
    const queryParams = getQuery(event)

    let caseID;
    if (event.method === 'GET' && queryParams.id) {
        caseID = queryParams.id;
    } else {
        return {
            status  : 400,
            message : 'invalid GET attribute' 
        }
    }

    const query = `
    query {
        cases(id:"${caseID}"){
          title,
          applicationIcon{
            title
            url
          }
          appColor
          videoDemonstration{
            title
            url
          }
          imageDemonstration{
            title
            url
          }
          technologyIconsCollection{
            total
            items{ 
                name,
              technologyIcons
            }
          }
          content{ 
              json
          }
          urlArr,
          urlArrMeta
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
            message: 'Unauthorized Access',
            success: false
        };
      }

})

