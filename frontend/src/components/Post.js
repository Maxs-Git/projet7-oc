import "../styles/Post.css";
import { postComment, like, dislike } from "../app/features/post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
function Post() {
  const dispatch = useDispatch();
  const post = useSelector(postComment);
  const postObject = post.payload;
  console.log(postObject);

  return (
    <div>
      {postObject.post.map((post, index) => (
        <div className="postcontainer">
          <div id="name-area">
            <p>nomtest</p>
            <p>prenomtest</p>
          </div>
          <h2 class="title">{post.title}</h2>
          <div id="text-area">{post.textContent}</div>
          <div id="button-area">
            <div id="likeDislike-area">
              <button id="like" onClick={() => dispatch(like())}>
                <FontAwesomeIcon icon={faThumbsUp} /> <span>{post.like}</span>
              </button>
              <button id="dislike" onClick={() => dispatch(dislike())}>
                <FontAwesomeIcon icon={faThumbsDown} />{" "}
                <span>{post.dislike}</span>
              </button>
            </div>
            <div id="technic-button">
              <button id="modif">modifier</button>
              <button id="delete">supprimer</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Post;
