"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const NewPage = () => {
  const router = useRouter()
  const handleNewUser = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newUser = Object.fromEntries(formData.entries())
    // post data
    const res = await fetch("http://localhost:4000/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
    const afterSubmit = await res.json()
    if (afterSubmit.insertedId) {
      console.log("user added successfully")
      router.push("/usre")
    }
  }
  return (
    <div>
      <form onSubmit={handleNewUser}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input id="fieldgroup-name" placeholder="Jordan Lee" name="name" />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              type="email"
              placeholder="name@example.com"
              name="email"
            />
            <FieldDescription>
              We&apos;ll send updates to this address.
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Add User</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}

export default NewPage
