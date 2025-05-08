import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'cloudinary',
      type: 'group',
      fields: [
        {
          name: 'public_id',
          type: 'text',
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  upload: {
    disableLocalStorage: true, 
    adminThumbnail: ({ doc }) => {
      return doc.cloudinary?.url || '/default-thumbnail.jpg';
    },
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'fill',
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        crop: 'fill',
      },
    ],
  },
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        return doc;
      },
    ],
  },
};