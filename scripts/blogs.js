const getAllBlogs = async () => {
  const url = 'http://localhost:3000/blogs';
  return await (await fetch(url)).json();
};

const populateHomePage = async () => {
  const blogs = await getAllBlogs();
  localStorage.setItem('blogs', JSON.stringify(blogs));
  let blogList = '';

  blogs.forEach((blog) => {
    const { id, likes, title, author, content, image } = blog;
    blogList += `
        <div class="card">
            <div class="view-more">
                <a href="updateBlog.html?id=${id}" class="edit">
                    Edit
                </a>
                <a onclick="deleteBlog(${id})" class="delete">
                    Delete
                </a>
                <a href="singleBlog.html?id=${id}" class="viewMore">
                    View More
                </a>
            </div>
            <div class="card-header">
                <img src="${image}" alt="Blog-image" />
            </div>
            <div class="card-body">
                <h2>
                    <span>${title}</span>
                    <span>By: ${author}</span>
                </h2>
                <div class="content">
                    <p>${content.substring(0, 275)}</p>
                </div>
            </div>
        </div>
    `;
  });

  document.querySelector('.wrapper').innerHTML = blogList;
};

const deleteBlog = (id) => {
  document
    .querySelector('.alert-container')
    .classList.add('show-alert-container');
  document.querySelector('.alert').classList.add('show-alert');

  document.querySelector('.alert-container .yes').onclick = async () => {
    const url = `http://localhost:3000/blogs/${id}`;
    await fetch(url, {
      method: 'DELETE',
    });
    window.location.replace('blogs.html');
  };

  document.querySelector('.alert-container .no').onclick = () => {
    document
      .querySelector('.alert-container')
      .classList.remove('show-alert-container');
    document.querySelector('.alert').classList.remove('show-alert');
  };
};

window.addEventListener('scroll', () => {
  const scrollHeight = window.scrollY;
  const nav = document.querySelector('.create-blog');
  if (scrollHeight > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  populateHomePage();
});
