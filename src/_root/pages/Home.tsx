import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import CreateReply from "@/components/CreateReply"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type Post = {
  id: string
  content: string
  created_at: string
}

type Reply = {
  id: string
  content: string
  created_at: string
  post_id: string
}

const Home = () => {
  const [post, setPost] = useState<Post | null>(null)
  const [replies, setReplies] = useState<Reply[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle() // ✅ DO NOT use .single()

    if (data) {
      setPost(data)
      fetchReplies(data.id)
    } else {
      setPost(null)
    }

    setLoading(false)
  }

  const fetchReplies = async (postId: string) => {
    const { data } = await supabase
      .from("replies")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true })

    setReplies(data ?? [])
  }

  useEffect(() => {
    fetchPost()
  }, [])

  if (loading) {
    return <div className="p-6">Loading…</div>
  }

  return (
    <div className="p-3 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-serif">Home</h1>

        <Button asChild>
          <Link to="/create">Create</Link>
        </Button>
      </div>

      {/* Empty state */}
      {!post ? (
        <div className="text-muted-foreground">
          No posts yet.
        </div>
      ) : (
        <div className="mx-auto w-full max-w-xl border rounded-lg p-4 space-y-4">
          {/* Anonymous author */}
          <div className="text-sm text-muted-foreground">
            anonymous
          </div>

          <p className="whitespace-pre-wrap wrap-break-word">
            {post.content}
          </p>

          {/* Replies */}
          <div className="pl-4 border-l space-y-3">
            {replies.map((reply) => (
              <div key={reply.id} className="space-y-1">
                <div className="text-xs text-muted-foreground">
                  anonymous
                </div>
                <div className="text-sm wrap-break-word">
                  {reply.content}
                </div>
              </div>
            ))}

            <CreateReply
              postId={post.id}
              onReplyCreated={() => fetchReplies(post.id)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
