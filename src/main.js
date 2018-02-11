(() => {
  const url = 'https://newsapi.org/v2/top-headlines?' +
            'country=ru&' +
            'apiKey=2a563e8347f14a44b618e0501345f3ff';
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const articleContainer = document.getElementById('article-container');

      return data.articles.map((jsonArticle) => {
        let article = document.createElement('div');
        article.className = "article";

        if(jsonArticle.urlToImage != null) {
          addSourceName(article, jsonArticle);
          addTitle(article, jsonArticle);
          addDescription(article, jsonArticle);
          addImage(article, jsonArticle);
          articleContainer.appendChild(article);
        }
      })
    })

  let addTitle = (article, jsonArticle) => {
    let title = document.createElement('a');
    title.textContent = jsonArticle.title;
    title.className = 'title';

    article.appendChild(title);
  }

  let addSourceName = (article, jsonArticle) => {
    let sourceName = document.createElement('h6');
    sourceName.textContent = jsonArticle.source.name;
    article.appendChild(sourceName);
  }

  let addDescription = (article, jsonArticle) => {
    let description = document.createElement('p');
    description.textContent = jsonArticle.description;
    article.appendChild(description);
  }

  let addImage = (article, jsonArticle) => {
    let imageLink = document.createElement('a');
    imageLink.href = jsonArticle.url;

    let urlToImage = document.createElement('img');
    urlToImage.src = jsonArticle.urlToImage;

    imageLink.appendChild(urlToImage);

    article.appendChild(imageLink);
  }
})();

(() => {
  const url = 'https://newsapi.org/v2/everything?' +
          'q=Russia&' +
          'language=ru&' +
          'from=2018-02-04&' +
          'sortBy=popularity&' +
          'apiKey=2a563e8347f14a44b618e0501345f3ff';

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const popularAsideBlock = document.getElementById('popular-aside-block');

      return data.articles.map((jsonArticle) => {
        let shortArticle = document.createElement('a');
        shortArticle.className = "editor text-center";
        shortArticle.href = jsonArticle.url;

        addTitle(shortArticle, jsonArticle);
        addShortDescription(shortArticle, jsonArticle);
        addPublishedAt(shortArticle, jsonArticle);
        addUnderscore(shortArticle, jsonArticle);

        popularAsideBlock.appendChild(shortArticle);
      })
    })

  let addTitle = (shortArticle, jsonArticle) => {
    let title = document.createElement('h3');
    title.textContent = jsonArticle.title;

    shortArticle.appendChild(title);
  }

  let addShortDescription  = (shortArticle, jsonArticle) => {
    let shortDescription = document.createElement('p');
    shortDescription.textContent = jsonArticle.description.substring(0, 100) + '...';

    shortArticle.appendChild(shortDescription);
  }

  let addPublishedAt = (shortArticle, jsonArticle) => {
    let publishedAt = document.createElement('label');
    publishedAt.textContent = jsonArticle.publishedAt;
    shortArticle.appendChild(publishedAt);
  }

  let addUnderscore = (shortArticle, jsonArticle) => {
    let underscore = document.createElement('span');
    shortArticle.appendChild(underscore);
  }
})();
