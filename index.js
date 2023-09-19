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

const createNotFoundMessage = () => {
    return `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">404!</strong>
  <span class="block sm:inline">Post not found.</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>`
}

/**
 * Fetch post and comments from API and render them
 * @param {number} postsId 
 */
const renderPost = async (postsId) => {
    let post
    try {

        // fetch posts by id
        post = await fetch(`https://jsonplaceholder.typicode.com/posts/${postsId}`).then(res => {
            if (res.status !== 200) {
                throw new Error('Post not found')
            }
            return res.json()
        })
    } catch (err) {
        // if post not found
        document.getElementById('post').innerHTML = createNotFoundMessage()
        return
    }
    
    // render post
    const postHTML = createPost(postsId, post.title, post.body)
    document.getElementById('post').innerHTML = postHTML

    // fetch comments by post id
    const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postsId}/comments`).then(res => res.json())
    // render comments
    const commentsHTML = comments.map(comment => createComment(comment.id, comment.name, comment.body)).join('')
    document.getElementById(`comments-${postsId}`).innerHTML = commentsHTML
}

/**
 * Remove post from DOM
 */
const cleanPost = () => {
    document.getElementById('post').innerHTML = ''
}


window.onload = () => {
    const form = document.getElementById('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        // get entered post id
        const postsId = document.getElementById('postsId').value

        // make sure to remove previous post
        cleanPost()

        // render post and comments
        renderPost(postsId)
    })
}