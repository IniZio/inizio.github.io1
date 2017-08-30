module Blog.List exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as JDecode exposing (Decoder, field, string, int, list)

import Blog.Models exposing (Post)

-- MODEL

type alias Model =
    List Post

-- INIT

init: (Model, Cmd Msg)
init = ([], getPosts)

-- MSG

type Msg
  = NoOp
  | OnGetPosts (Result Http.Error (List Post))

-- UPDATE

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NoOp ->
      (model, Cmd.none)
    OnGetPosts response ->
      case response of
        Result.Ok newPosts ->
          (newPosts, Cmd.none)
        Result.Err _ ->
           (model, Cmd.none)
-- CMD

getPosts: Cmd Msg
getPosts =
  let
    request = Http.get getPostsUrl postsDecoder
  in
    Http.send OnGetPosts request

getPostsUrl: String
getPostsUrl = "https://demo1101552.mockable.io/"

postsDecoder : Decoder (List Post)
postsDecoder =
  JDecode.list postDecoder

postDecoder: Decoder Post
postDecoder =
  JDecode.map3 Post
    (field "sha" string)
    (field "name" string)
    (field "size" int)

-- VIEW

view : List Post -> Html Msg
view posts =
    ul [] (List.map post posts)

post: Post -> Html Msg
post p =
    li []
      [a [href "#"] [text p.name]]
