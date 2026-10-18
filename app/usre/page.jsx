import UserCard from "../../components/UserCard"

// Data comes from the local API at request time; don't bake it into the build.
export const dynamic = "force-dynamic"

const userPage = async () => {
  const res = await fetch("http://localhost:4000/user")
  const user = await res.json()
  return (
    <div>
      <h1>total user : {user.length}</h1>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {user.map((user) => (
          <UserCard key={user._id} user={user}></UserCard>
        ))}
      </div>
    </div>
  )
}

export default userPage
