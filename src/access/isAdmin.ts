import type { Access } from 'payload'

// Check if the user has admin role
export const isAdmin: Access = ({ req: { user } }) => {
  // If there's no user, deny access
  if (!user) return false

  // If the user has the admin role, allow access
  return user.management === 'admin'
}
