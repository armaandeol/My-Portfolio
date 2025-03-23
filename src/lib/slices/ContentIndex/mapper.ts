import type { Client, Content, SliceMapper } from '@prismicio/client';
import type { ComponentProps } from 'svelte';

import ContentIndex from './index.svelte';

type Context = { client: Client<Content.AllDocumentTypes> };

const mapper: SliceMapper<
    Content.ContentindexSlice,  // Make sure this matches your type definition
    ComponentProps<ContentIndex>,
    Context
> = async ({ slice, context }) => {
    const { client } = context;
    
    try {
        const contentType = slice.primary.content_type;
        
        let items: string | any[] = [];
        
        if (contentType === 'Blog') {
            items = await client.getAllByType('blogpost');
        } else if (contentType === 'Project') {
            items = await client.getAllByType('project');
            
        }
        
        return { slice, items };
    } catch (error) {
        console.error("Error in ContentIndex mapper:", error);
        return { slice, items: [] };
    }
};

export default mapper;