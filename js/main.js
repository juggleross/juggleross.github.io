const url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=2a563e8347f14a44b618e0501345f3ff';
fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    const ul = document.getElementById('news');
    const br = document.createElement('br');

    for(let i = 0; i < data.articles.length; i++) {
      article = data.articles[i];

      author = document.createElement('li');
      author.textContent = article.author;

      description = document.createElement('li');
      description.textContent = article.description;

      publishedAt = document.createElement('li');
      publishedAt.textContent = article.publishedAt;

      title = document.createElement('li');
      title.textContent = article.title;

      article_url = document.createElement('li');
      article_url.textContent = article.url;

      urlToImage = document.createElement('img');
      urlToImage.src = article.urlToImage;
      urlToImage.style.width = '600px';

      ul.appendChild(author);
      ul.appendChild(description);
      ul.appendChild(publishedAt);
      ul.appendChild(title);
      ul.appendChild(urlToImage);
      ul.appendChild(br);
    }
  })


