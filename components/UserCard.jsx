import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

const UserCard = ({ user }) => {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div />

      <CardHeader>
        <CardAction>
          <h1>no action</h1>
        </CardAction>
        <CardTitle>Name : {user.name}</CardTitle>
        <CardDescription>Email : {user.email}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={`/usre/${user._id}`}>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default UserCard
