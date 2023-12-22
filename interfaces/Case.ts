// Case definition
export default interface Case {
    sys: null | { 
        id: string 
    };
    content: { 
        json: any 
    };
    title: string;
    appColor: null | { 
        id: string; 
        name: string; 
        value: string 
    };
    applicationIcon: null | { 
        title: string; 
        url: string 
    };
    imageDemonstration: { 
        title: string; 
        url: string 
    };
    technologyIconsCollection: { 
        total: number; 
        items: Array<{ 
            name: string; 
            technologyIcons: string 
        }> 
    };
    urlArr: Array<null | {
        id: null | string,
        key: string,
        value: string
    }>;
    urlArrMeta: null | Array<{
        id: null | string,
        key: string,
        value: string
    }>
    videoDemonstration: null | { 
        title: string; 
        url: string 
    };
}