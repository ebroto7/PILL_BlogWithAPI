const urlAllPosts = "https://jsonplaceholder.typicode.com/posts"

const main = document.getElementById('main')
const button = document.getElementById('button')
button.style.backgroundColor = 'red'

//const article = document.getElementById('article')

button.addEventListener('click', createArticle)


function createArticle(title) {

    const importTitle = title

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

   
    div1.appendChild(blogTitle)
    div1.appendChild(btn)

    div2.appendChild(editPost_btn)
    div2.appendChild(deletePost_btn)


    article.appendChild(div1)
    article.appendChild(div2)

    
    main.appendChild(article)
}



fetch(urlAllPosts)
  .then((response) => response.json())
  .then((json) => {
    
    for(let article of json) {
        createArticle(article.title)
    }
    console.log(json)

});
  