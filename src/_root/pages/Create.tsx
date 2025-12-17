import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setLoading(true)

    const { error } = await supabase.from("posts").insert({
      content,
      author_id: user.id,
    })

    if (!error) {
      navigate("/") // ✅ redirect after success
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-1 justify-center items-center min-h-screen py-10">
      <form onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          placeholder="What’s on your mind?"
          className="w-80 h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={280}
        />

        <Button type="submit" disabled={loading || !content.trim()}>
          {loading ? "Posting..." : "Post"}
        </Button>
      </form>
    </div>
  )
}

export default Create
