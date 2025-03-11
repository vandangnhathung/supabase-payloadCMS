import type { FieldAccess } from 'payload'

// Field-level access control for admin-only fields
export const fieldLevelIsAdmin: FieldAccess = ({ req: { user } }) => {
  // If there's no user, deny access
  if (!user) return false

  // Return a boolean (true if admin, false otherwise)
  return user.management === 'admin'
}
