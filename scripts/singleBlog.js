const populateSingleBlogPage = () => {
  const blogId = window.location.search.split('=')[1];
  const blogs = JSON.parse(localStorage.getItem('blogs'));
  const { title, author, image, content } = blogs.find(
    (blog) => blog.id == blogId
  );

  const paragraphs = content.split('\n').filter((p) => p !== '');

  let blogContent = `
    <div class="img-container">
      <img src="${image}" alt="blog-image">
    </div>
    <div class="blog-content">
      <h2>
        <span> ${title} </span>
        <span>By: ${author}</span>
      </h2>
      ${paragraphs.map((p) => `<p>${p}</p><br>`).join('')}
    </div>
  `;
  document.querySelector('.wrapper').innerHTML = blogContent;
};

window.addEventListener('DOMContentLoaded', () => {
  populateSingleBlogPage();
});
