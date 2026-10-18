// Data comes from the local API at request time; don't bake it into the build.
export const dynamic = "force-dynamic"

const UserDetailsPage = async ({ params }) => {
  const { slug } = await params
  const res = await fetch(`http://localhost:4000/users/${slug}`)
  const user = await res.json()

  return (
    <div>
      <h1>User Details Page</h1>
      <p>User ID: {slug}</p>
      <h1>name : {user.name}</h1>
    </div>
  )
}

export default UserDetailsPage
