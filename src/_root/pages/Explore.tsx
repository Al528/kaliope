
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Post = {
  id: string
  content: string
  created_at: string
}

const Explore = () => {
  
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      const fetchPosts = async () => {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(800000)
  
        if (!error && data) {
          setPosts(data)
        }
  
        setLoading(false)
      }
  
      fetchPosts()
    }, [])
  
    if (loading) {
      return <div className="p-6">Loading…</div>
    }
  
  return (
    <div>
      <h1 className="text-5xl font-serif">Explore</h1>
      <div className="space-y-4 mt-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg p-4 m-5"
          >
            <p className="text-sm text-muted-foreground">
              {new Date(post.created_at).toLocaleString()}
            </p>

            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Explore