import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: [
      'email',
      'name',
      'nickname',
      'birth date',
      'nationality',
      'gender',
      'social login',
      'management',
    ],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'nickname',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'birth date',
      type: 'date',
    },
    {
      name: 'nationality',
      type: 'text',
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Non-binary',
          value: 'non-binary',
        },
        {
          label: 'Prefer not to say',
          value: 'not-specified',
        },
      ],
    },
  ],
  timestamps: true,
}
