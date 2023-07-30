const urlAllPosts = "https://jsonplaceholder.typicode.com/posts"
const postsWillLoad = 10
let loadedPosts = 0

const userUrl = "https://jsonplaceholder.typicode.com/users"

const main = document.getElementById('main')
const postMain = document.getElementById('blogArticleModal')
const button = document.getElementById('button')
button.style.backgroundColor = 'red'

//const article = document.getElementById('article')

button.addEventListener('click', () => {
    loadPosts(postsWillLoad, loadedPosts)
})


function createArticle(title, id) {
    const importTitle = title
    const importID = id

    const article = document.createElement('article');
    article.style.display = 'flex'
    article.style.justifyContent = 'space-between'
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    div2.style.display = 'block'
    div2.style.alignItems = 'center'
    div2.style.justifyContent = 'center'

    article.style.backgroundColor = 'lightgreen'
    article.style.margin = '1rem'
    article.style.padding = '0.2rem'

    const blogTitle = document.createElement('h3');
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


    article.appendChild(div1)
    article.appendChild(div2)

    
    main.appendChild(article)
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
    console.log('loaded posts before= '+firstID)
    if (firstID != 0) {
        url = urlAllPosts+ "?_limit="+numberOfPosts+"&after_id="+firstID
    }
    console.log('feth url= '+url)
       
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            
            for(let article of json) {
                createArticle(article.title, article.id)
            }
            loadedPosts += numberOfPosts
            
            console.log(json)

            
            console.log('number of articles= '+json.length)
            console.log('number of posts loaded= '+loadedPosts)
        }
    );
}


function loadInfoPost(id) {
    
    let url = urlAllPosts+"/"+id
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            createPost(json)
            console.log(json)

            loadUserInfo(json.userId)
        }
    );
}

function loadUserInfo(userId) {  

    let url = userUrl+"/"+userId
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            putInfoUser(json)
            console.log(json)
        }
    );

}

function putInfoUser(user) {
    const userName = document.getElementById('userName')
    userName.innerHTML = user.name
    const userMail = document.getElementById('userMail')
    userMail.innerHTML = user.email

}