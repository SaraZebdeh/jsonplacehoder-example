/**
 * 
 * @param {string} username name of the user who created the comment
 * @param {string} message comment message 
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
                    </div>`
}

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
    `
}


/**
 * Remove post and comments from DOM
 */
const cleanUp = () => {
}

/**
 * Reive post and comments and render them
 * @param {*} post 
 * @param {*} comments 
 */
const renderPost = (post, comments) => {
    const postElement = createPost(post.id, post.title, post.body)
    document.getElementById('postContainer').innerHTML = postElement
}

/**
 * Fetch post and comments from API 
 * Post API: https://jsonplaceholder.typicode.com/posts/${postId}
 * Comments API: https://jsonplaceholder.typicode.com/posts/${postsId}/comments
 * @param {number} postId 
 * @returns {Promise<{post: {id: number, title: string, body: string}}>}
 */
const fetchPostAndComments = (postId) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json())
        .then(post => ({ post }))
}

// Add submit event listener to the form
// get the id of the post from the input field
// then fetch post and comments and render them
window.onload = () => {
    fetchPostAndComments(1)
        .then(res => renderPost(res.post))
}
