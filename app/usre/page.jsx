import UserCard from "../../components/UserCard"

const userPage = async () => {
  const res = await fetch("http://localhost:4000/user")
  const user = await res.json()
  return (
    <div>
      <h1>total user : {user.length}</h1>
      <div>
        {
            user.map(user=> <UserCard key={user._id} user={user}></UserCard>)
        }
      </div>
    </div>
  )
}

export default userPage
