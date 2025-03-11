import type { Access } from 'payload'

// Allow access if user is admin or is the same user being modified
export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  // If there's no user, deny access
  if (!user) return false

  // If the user is an admin, allow access
  if (user.management === 'admin') return true

  // If the user is trying to access their own document, allow access
  return user.id === id
}
