'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { supabase } from "@/lib/supabase"

type Profile = {
  avatar_url: string | null
  name: string | null
}


const Profile = () => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen py-10">
      <Card className="w-80">
        <CardHeader className="items-center gap-2">
          <CardTitle>
            {user.user_metadata?.name}
          </CardTitle>

          <CardDescription>{user?.email}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="destructive" onClick={async () => await supabase.auth.signOut()}>Sign out</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Profile
