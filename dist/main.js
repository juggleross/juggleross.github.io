'use strict';

(function () {
  var url = 'https://newsapi.org/v2/top-headlines?' + 'country=ru&' + 'apiKey=2a563e8347f14a44b618e0501345f3ff';
  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var articleContainer = document.getElementById('article-container');

    return data.articles.map(function (jsonArticle) {
      var article = document.createElement('div');
      article.className = "article";

      if (jsonArticle.urlToImage != null) {
        addSourceName(article, jsonArticle);
        addTitle(article, jsonArticle);
        addDescription(article, jsonArticle);
        addImage(article, jsonArticle);
        articleContainer.appendChild(article);
      }
    });
  });

  var addTitle = function addTitle(article, jsonArticle) {
    var title = document.createElement('a');
    title.textContent = jsonArticle.title;
    title.className = 'title';

    article.appendChild(title);
  };

  var addSourceName = function addSourceName(article, jsonArticle) {
    var sourceName = document.createElement('h6');
    sourceName.textContent = jsonArticle.source.name;
    article.appendChild(sourceName);
  };

  var addDescription = function addDescription(article, jsonArticle) {
    var description = document.createElement('p');
    description.textContent = jsonArticle.description;
    article.appendChild(description);
  };

  var addImage = function addImage(article, jsonArticle) {
    var imageLink = document.createElement('a');
    imageLink.href = jsonArticle.url;

    var urlToImage = document.createElement('img');
    urlToImage.src = jsonArticle.urlToImage;

    imageLink.appendChild(urlToImage);

    article.appendChild(imageLink);
  };
})();

(function () {
  var url = 'https://newsapi.org/v2/everything?' + 'q=Russia&' + 'language=ru&' + 'from=2018-02-04&' + 'sortBy=popularity&' + 'apiKey=2a563e8347f14a44b618e0501345f3ff';

  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var popularAsideBlock = document.getElementById('popular-aside-block');

    return data.articles.map(function (jsonArticle) {
      var shortArticle = document.createElement('a');
      shortArticle.className = "editor text-center";
      shortArticle.href = jsonArticle.url;

      addTitle(shortArticle, jsonArticle);
      addShortDescription(shortArticle, jsonArticle);
      addPublishedAt(shortArticle, jsonArticle);
      addUnderscore(shortArticle, jsonArticle);

      popularAsideBlock.appendChild(shortArticle);
    });
  });

  var addTitle = function addTitle(shortArticle, jsonArticle) {
    var title = document.createElement('h3');
    title.textContent = jsonArticle.title;

    shortArticle.appendChild(title);
  };

  var addShortDescription = function addShortDescription(shortArticle, jsonArticle) {
    var shortDescription = document.createElement('p');
    shortDescription.textContent = jsonArticle.description.substring(0, 100) + '...';

    shortArticle.appendChild(shortDescription);
  };

  var addPublishedAt = function addPublishedAt(shortArticle, jsonArticle) {
    var publishedAt = document.createElement('label');
    publishedAt.textContent = jsonArticle.publishedAt;
    shortArticle.appendChild(publishedAt);
  };

  var addUnderscore = function addUnderscore(shortArticle, jsonArticle) {
    var underscore = document.createElement('span');
    shortArticle.appendChild(underscore);
  };
})();
