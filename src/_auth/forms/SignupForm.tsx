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

const SignupForm = () => {
  const navigate = useNavigate()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    navigate("/")
  }

  return (
    <div>
      <form onSubmit={handleSignup}>
        <FieldSet className="w-88">
          <FieldLegend>Sign up</FieldLegend>
          <FieldDescription>
            Fill in the field below to create an account.
          </FieldDescription>

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

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
                {loading ? "Creating account..." : "Sign up"}
              </Button>

              <FieldDescription>
                <Link to="/sign-in" className="text-purple-500">
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}

export default SignupForm
