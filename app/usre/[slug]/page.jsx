// Data comes from the local API at request time; don't bake it into the build.
export const dynamic = "force-dynamic"

import UserDetailCard from "@/components/UserDetailCard"

const UserDetailsPage = async ({ params }) => {
  const { slug } = await params
  const res = await fetch(`http://localhost:4000/users/${slug}`)

  if (!res.ok) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        User not found.
      </div>
    )
  }

  const user = await res.json()

  return (
    <div className="flex justify-center py-10">
      <UserDetailCard user={user} />
    </div>
  )
}

export default UserDetailsPage
