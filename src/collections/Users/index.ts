import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { isAdmin } from '../../access/isAdmin'
import { isAdminOrSelf } from '../../access/isAdminOrSelf'
import { fieldLevelIsAdmin } from '../../access/fieldLevelIsAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // Only authenticated users can access the admin panel
    admin: authenticated,
    // Only admins can create new users (or you could use authenticated if you want anyone to register)
    create: isAdmin,
    // Only admins can delete users
    delete: isAdmin,
    // Authenticated users can read, but we'll filter what they can see in the read function
    read: ({ req: { user } }) => {
      // If no user, deny access
      if (!user) return false

      // If user is admin, they can read all users
      if (user.management === 'admin') return true

      // Regular users can only read their own document
      return {
        id: {
          equals: user.id,
        },
      }
    },
    // Users can only update themselves, admins can update anyone
    update: isAdminOrSelf,
  },
  admin: {
    defaultColumns: [
      'email',
      'name',
      'nickname',
      'birth date',
      'nationality',
      'gender',
      'management',
    ],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'nickname',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
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
    {
      name: 'management',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
      // Only admins can change user roles
      access: {
        update: fieldLevelIsAdmin,
      },
    },
  ],
  timestamps: true,
}
