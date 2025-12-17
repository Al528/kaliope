import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

const SigninForm = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    // AuthContext listener will handle state update
    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleSignin}>
        <FieldSet className="w-88">
          <FieldLegend>Sign in</FieldLegend>
          <FieldDescription>
            Fill in the field below to sign in.
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Field>

            {error && (
              <FieldDescription className="text-red-500">
                {error}
              </FieldDescription>
            )}

            <Field orientation="horizontal">
              <Button type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>

              <FieldDescription>
                <Link to="/sign-up" className="text-purple-500">
                  Sign up
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}

export default SigninForm
