module Blog.Models exposing (Post)

type alias Post = {
  sha: String,
  name: String,
  size: Int
}
