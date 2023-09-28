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






























// /**
//  * Fetch post and comments from API and render them
//  * @param {number} postsId
//  */
// const renderPost = (postsId) => {
//     // fetch posts by id
//     fetch(`https://jsonplaceholder.typicode.com/posts/${postsId}`).then(res => res.json()).then(post => {
//         // render post
//         const postHTML = createPost(postsId, post.title, post.body)
//         document.getElementById('post').innerHTML = postHTML
//     }).then(() => {
//         // fetch comments by post id
//         return fetch(`https://jsonplaceholder.typicode.com/posts/${postsId}/comments`).then(res => res.json())
//     }).then(comments => {
//         const commentsHTML = comments.map(comment => createComment(comment.id, comment.name, comment.body)).join('')
//         document.getElementById(`comments-${postsId}`).innerHTML = commentsHTML
//     })


// }

// /**
//  * Remove post from DOM
//  */
// const cleanPost = () => {
//     document.getElementById('post').innerHTML = ''
// }


// window.onload = () => {
//     const form = document.getElementById('form')
//     form.addEventListener('submit', (e) => {
//         e.preventDefault()
//         // get entered post id
//         const postsId = document.getElementById('postsId').value

//         // make sure to remove previous post
//         cleanPost()

//         // render post and comments
//         renderPost(postsId)
//     })
// }