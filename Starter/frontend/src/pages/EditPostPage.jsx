import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'

// TODO (student): Implement edit flow.
// Suggested steps:
// 1) Fetch existing post with GET /api/posts/:id.
// 2) Pass fetched data to PostForm as initialData.
// 3) On submit, send PUT /api/posts/:id.
// 4) Navigate back to /posts/:id after successful save.
function EditPostPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    //Replaced the placeholder with GET /api/posts/:id fetch logic.
    async function fetchOnePost() {
      try {
        const response = await fetch(`/api/posts/${id}`)
        if (!response.ok) {
          throw new Error(`Unable to fetch the post ${response.status}`)
        }
        const dataInfo = await response.json()
        setPost(dataInfo)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchOnePost()
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    //Implemented PUT /api/posts/:id.
    const formInput = new FormData(e.target)
    const body = {
      title: formInput.get('title'),
      content: formInput.get('content'),
      author: formInput.get('author')
    }
    //implemented PUT /api/posts/:id to update the post and navigate back to the post detail page after successful save.
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw new Error(`Unable to update the post ${response.status}`)
      }
      const updatedPost = await response.json()
      setPost(updatedPost)
      navigate(`/posts/${id}`)
    } catch (error) {
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <p className="status-msg">Loading…</p>
  if (error && !post) return <p className="status-msg error">{error}</p>
  if (!post) return <p className="status-msg">TODO: Load a post before editing.</p>

  return (
    <div>
      <h1 className="page-title">Edit post</h1>
      {error && <p className="status-msg error">{error}</p>}
      <PostForm
        key={post._id}
        initialData={post}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  )
}

export default EditPostPage
