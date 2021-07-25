window.onload = () => {
  const searchForm = document.forms['search-form'];
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = document.getElementById('search-form-input').value;
    console.log(term);
    getData(term);
  });

  const getData = async (term) => {
    const app_id = '7bc56cce';
    const app_key = '3d3922b79e098ca7ad060ea1b12cd370';
    const api_url = `https://api.edamam.com/search?q=${term}&app_id=${app_id}&app_key=${app_key}`;
    try {
      let response = await fetch(api_url);
      console.log(response);
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
};
