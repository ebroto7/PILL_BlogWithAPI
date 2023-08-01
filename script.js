const urlAllPosts = "https://jsonplaceholder.typicode.com/posts"
const postsWillLoad = 10
let loadedPosts = 0
let totalNumOfPosts;
fetch(urlAllPosts)
        .then((response) => response.json())
        .then((json) => {
            totalNumOfPosts = json.length
        }
);

const userUrl = "https://jsonplaceholder.typicode.com/users"
const commentsUrl = "https://jsonplaceholder.typicode.com/comments"

const main = document.getElementById('main')
const postMain = document.getElementById('blogArticleModal')
const loadPostbutton = document.getElementById('loadPostbutton')
const commentsBtn = document.getElementById('commentsBtn')
commentsBtn.style.width = '10rem'
commentsBtn.style.justifyContent = 'center'
const commentContainer = document.getElementById('modalComments__body')
let postIDComments;
const btn_closeModal = document.querySelector('.btn_closeModal')
let openComments = true

loadPostbutton.addEventListener('click', () => {
    loadPosts(postsWillLoad, loadedPosts)
})
commentsBtn.addEventListener('click', () => {
     openCloseComments()
})

function openCloseComments() {
    if (openComments) {
        closeComents()
    } else {
        commentContainer.replaceChildren()
        loadPostComments(postIDComments)
        openComments = true
        commentsBtn.innerText = 'Close Comments'
    }
}
function closeComents() {
    commentContainer.replaceChildren()
    openComments = false
    commentsBtn.innerText = 'Load Comments'
}

function createArticle(article) {
    const importTitle = article.title
    const importID = article.id
    
    const post = document.createElement('article');
    post.classList.add('blogPostArticle')
  
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    div2.classList.add('postButtonsStack')

    const blogTitle = document.createElement('h4');
    blogTitle.innerText = importTitle

    const btn = document.createElement('button')
    btn.innerText = 'open article'
    btn.classList.add('btn')
    btn.classList.add('btn-primary')
    btn.setAttribute("id", `id${importID}`);
    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#blogArticleModal" );

    btn.addEventListener('click', () => {
        loadInfoPost(importID)
        loadUserInfo(article.userId)
        postIDComments = importID
        openComments = false
        closeComents()
    })

    const idNumber = document.createElement('p')
    idNumber.textContent = importID

    const deletePost_btn = document.createElement('button')
    deletePost_btn.innerText = 'delete post'
    deletePost_btn.classList.add('btn')
    deletePost_btn.classList.add('btn-danger')
    deletePost_btn.style.margin = '0.5rem'

    const editPost_btn = document.createElement('button')
    editPost_btn.innerText = 'edit post'
    editPost_btn.classList.add('btn')
    editPost_btn.classList.add('btn-warning')
    editPost_btn.style.margin = '0.5rem'

    div1.appendChild(idNumber)
    div1.appendChild(blogTitle)
    div1.appendChild(btn)
    div2.appendChild(editPost_btn)
    div2.appendChild(deletePost_btn)
    post.appendChild(div1)
    post.appendChild(div2)
    main.appendChild(post)
}

function createPost(post) {
    const postInfo = post
    
    const articleTitle = document.getElementById('staticBackdropLabel')
    articleTitle.innerHTML = post.title

    const articleBody = document.getElementById('modalBody')
    articleBody.innerHTML = post.body
}

function loadPosts(numberOfPosts, firstID) {
    let url = urlAllPosts+ "?_limit="+numberOfPosts
    if (firstID != 0) {
        url = `${urlAllPosts}?_start=${firstID}&_limit=${numberOfPosts})`
    }
       
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            for(let article of json) {
                createArticle(article)
            }
            loadedPosts += numberOfPosts
            changeLoadPostButton(loadedPosts, totalNumOfPosts)
        }
    );
}

function changeLoadPostButton(loadedPosts, totalPosts) {
    if (loadedPosts < totalPosts) {
        loadPostbutton.innerHTML = 'Load more posts'
    } else if (loadedPosts >= totalPosts) {
        loadPostbutton.disabled = true
        loadPostbutton.innerHTML = 'No more posts'

    }
}

function loadInfoPost(id) {
    let url = urlAllPosts+"/"+id
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            createPost(json)
        }
    );
}

function loadUserInfo(userId) {  
    let url = userUrl+"/"+userId
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            putInfoUser(json)
        }
    );
}

function putInfoUser(user) {
    const userName = document.getElementById('userName')
    userName.innerHTML = user.name
    const userMail = document.getElementById('userMail')
    userMail.innerHTML = user.email
}

function loadPostComments(postID) {
    const url = urlAllPosts+'/'+postID+'/comments'
    fetch(url)
        .then((response) => response.json())
        .then((json) =>  {
            console.log(json.length)
            console.log(url)
            if (json.length === undefined){
                createComment(json)
            } else {
                for(let comment of json) {
                    createComment(comment)
                }
            }
        }
    );
}

function createComment(comment) {
    const commentArticleContainer = document.createElement('article');
    commentArticleContainer.classList.add('commentArticleContainer')
    const commentTitle = document.createElement('h6');
    commentTitle.classList.add('commentTitle')
    commentTitle.innerText = comment.name
    const commentBody = document.createElement('p');
    commentBody.innerText = comment.body
    const commentEmail = document.createElement('p');
    commentEmail.innerText = comment.email

    commentArticleContainer.appendChild(commentTitle)
    commentArticleContainer.appendChild(commentBody)
    commentArticleContainer.appendChild(commentEmail)
    commentContainer.appendChild(commentArticleContainer)
}