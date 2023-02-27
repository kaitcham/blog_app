const blogId = window.location.toString().split('=')[1];
const url = `http://localhost:3000/blogs/${blogId}`;
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  try {
    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    window.location.replace('blogs.html');
  } catch (error) {
    console.log(error);
  }
});

window.onload = async () => {
  const blog = await (await fetch(url)).json();
  form.title.value = blog.title;
  form.image.value = blog.image;
  form.author.value = blog.author;
  form.content.value = blog.content;
};
