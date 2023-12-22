interface ContentItem {
    nodeType: string;
    content: [{
        value: string
        marks: [{
            type: string
        }]
    }]
}

export function useRichContent() {
    const outputRichContent = (obj: Array<ContentItem>) => {
        if (obj && Array.isArray(obj)) {
            const html = obj.map((item) => {
                console.log(item);
                switch (item.nodeType) {
                    case 'paragraph':
                        return `<p>${item.content[0].value}</p>`;
                }
            });

            // Concatenate paragraphs into a single string
            return html.join('');
        }

        // Return a default value or an empty array if obj is falsy
        return '';
    };

    return {
        outputRichContent,
    };
}
