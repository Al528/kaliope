import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const CreateReply = ({
  postId,
  onReplyCreated,
}: {
  postId: string
  onReplyCreated: () => void
}) => {
  const { user } = useAuth()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setLoading(true)

    const { error } = await supabase.from("replies").insert({
      content,
      post_id: postId,
      author_id: user.id,
    })

    if (!error) {
      setContent("")
      onReplyCreated()
    }

    setLoading(false)
  }

  if (!user) return null

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Textarea
        placeholder="Write a reply…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-20"
      />

      <Button type="submit" size="sm" disabled={loading || !content.trim()}>
        Reply
      </Button>
    </form>
  )
}

export default CreateReply
