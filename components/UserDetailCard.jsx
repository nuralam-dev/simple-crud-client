import { Button } from "@/components/ui/button"
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowLeft, CalendarDays, Hash, Mail } from "lucide-react"
import Link from "next/link"

// Mongo ObjectIds carry their creation time in the first 4 bytes.
const joinedFromId = (id = "") => {
  if (!/^[0-9a-f]{24}$/i.test(id)) return null
  const timestamp = parseInt(id.slice(0, 8), 16) * 1000
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

const initialsOf = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const DetailRow = ({ icon: Icon, label, value, mono = false }) => (
  <div className="flex items-start gap-3 py-2.5">
    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={
          mono
            ? "truncate font-mono text-xs font-medium"
            : "truncate text-sm font-medium"
        }
      >
        {value}
      </p>
    </div>
  </div>
)

const UserDetailCard = ({ user }) => {
  const joined = joinedFromId(user._id)

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-card text-card-foreground shadow-lg ring-1 ring-foreground/10">
      {/* banner with back link */}
      <div className="relative h-28 bg-gradient-to-br from-primary/70 via-primary/30 to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(1_0_0_/_0.25),transparent_60%)]" />
        <Link
          href="/usre"
          className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5 text-xs font-medium backdrop-blur transition-colors hover:bg-background"
        >
          <ArrowLeft className="size-3.5" />
          All users
        </Link>
      </div>

      {/* avatar + identity */}
      <div className="flex flex-col items-center px-6 pb-6">
        <div className="-mt-10 flex size-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground ring-4 ring-card">
          {initialsOf(user.name)}
        </div>
        <CardHeader className="mt-3 items-center pb-0 text-center">
          <CardTitle className="text-xl">{user.name}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-1.5">
            <Mail className="size-3.5" />
            {user.email}
          </CardDescription>
        </CardHeader>

        {/* details list */}
        <div className="mt-4 w-full divide-y divide-border/60 rounded-xl bg-muted/40 px-4 py-1">
          <DetailRow icon={Mail} label="Email" value={user.email} />
          <DetailRow icon={Hash} label="User ID" value={user._id} mono />
          {joined && (
            <DetailRow icon={CalendarDays} label="Joined" value={joined} />
          )}
        </div>

        <Link href="/usre" className="mt-5 w-full">
          <Button className="w-full">
            <ArrowLeft className="size-4" />
            Back to users
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UserDetailCard
