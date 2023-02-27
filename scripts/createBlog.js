const url = 'http://localhost:3000/blogs';
const form = document.querySelector('form');

const options = (data) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    await fetch(url, options(data));
    window.location.replace('blogs.html');
  } catch (error) {
    console.log(error);
  }
});
