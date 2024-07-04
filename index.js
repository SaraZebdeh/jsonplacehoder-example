/**
 *
 * @param {string} name name of the user who created the comment
 * @param {string} body comment message
 */
const createComment = (commentId, username, message) => {
  return ` <div class="space-y-4">
                        <div class="flex">
                            <div class="flex-shrink-0 mr-3">
                                <img class="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                                    src="https://source.unsplash.com/random/50x50/?man,car,anime&sig=${commentId}"
                                    alt="">
                            </div>
                            <div class="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                                <strong>${username}</strong> <span class="text-xs text-gray-400">3:34 PM</span>
                                <p class="text-xs sm:text-sm">
                                    ${message}
                                </p>
                            </div>
                        </div>
                    </div>`;
};

/**
 *
 * @param {number} postId
 * @param {string} title post title
 * @param {string} message post message
 */
const createPost = (postId, title, message) => {
  return `
         <div class="flex">
                <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>${title}</strong> <span class="text-xs text-gray-400">3:34 PM</span>
                    <p  class="text-sm">
                        ${message}
                    </p>

                    <h4 class="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Comments</h4>
                    <div id="comments-${postId}" class="space-y-4"></div>

                </div>
            </div>
    `;
};

/**
 * Reive post and comments and render them
 * @param {*} post
 * @param {*} comments
 */

/**
 * Fetch post and comments from API
 * Post API: https://jsonplaceholder.typicode.com/posts/${postId}
 * Comments API: https://jsonplaceholder.typicode.com/posts/${postsId}/comments
 * @param {number} postId
 * @returns {Promise<{post: {id: number, title: string, body: string}}>}
 * @returns {Promise<{comments: [{id: postId, name: string, body: string}}]>}
 */

//Remove post and comments from DOM
const cleanUp = () => {
  document.getElementById("postContainer").innerHTML = "";
};

//show error messge for not exist post
const showError = async (message) => {
  await cleanUp();
  const errorElement = document.createElement("div");
  errorElement.className = "text-red-500";
  errorElement.textContent = message;
  document.getElementById("postContainer").appendChild(errorElement);
};

//fetch api for post
const fetchPost = (postId) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
    (res) => res.json()
  );
};

//fetch api for post's comments
const fetchComments = (postId) => {
  return fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  ).then((res) => res.json());
};

const renderPostandComments = async (postId) => {
  const post = await fetchPost(postId);
  try {
    if (!post.id) {
      throw new Error();
    }
  } catch {
    showError("Sorry! This post is not found!");
    return;
  }

  const postElement = createPost(post.id, post.title, post.body);
  document.getElementById("postContainer").innerHTML = postElement;

  //fetch comments
  const comments = await fetchComments(postId);

  //render comments
  const commentElements = comments.map((comment) => {
    return createComment(comment.id, comment.name, comment.body);
  });
  document.getElementById(`comments-${postId}`).innerHTML = commentElements;
};

const renderPostandCommentsUsingPromises = (postId) => {
  const post = fetchPost(postId);
  post
    .then((post) => {
      if (!post.id) {
        throw new Error();
      }
      // render post
      const postHTML = createPost(postId, post.title, post.body);
      document.getElementById("postContainer").innerHTML = postHTML;
    })
    .then(() => {
      // fetch comments by post id
      return fetchComments(postId);
    })
    .then((comments) => {
      //render comments
      const commentsHTML = comments
        .map((comment) => createComment(comment.id, comment.name, comment.body))
        .join("");
      document.getElementById(`comments-${postId}`).innerHTML = commentsHTML;
    })
    .catch(() => {
      showError("Sorry! This post is not found!");
      return;
    });
};

window.onload = async () => {
  const form = document.getElementById("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //get the post id which user entered in the search input
    const postId = document.getElementById("postId").value;

    //remove previous post and its comments
    cleanUp();

    //fetch and render the post and its comments
    renderPostandComments(postId);
    // renderPostandCommentsUsingPromises(postId);
  });
};
