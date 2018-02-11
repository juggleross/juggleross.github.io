'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Article = function () {
    function Article(articleContainer, jsonArticle) {
      _classCallCheck(this, Article);

      this.articleContainer = articleContainer;
      this.article = document.createElement('div');
      this.article.className = "article";
      if (jsonArticle.urlToImage != null) this.articleContainer.appendChild(this.article);
      this.jsonArticle = jsonArticle;
    }

    _createClass(Article, [{
      key: 'addArticle',
      value: function addArticle() {
        this.addTitle();
        this.addSourceName();
        this.addDescription();
        this.addImage();
      }
    }, {
      key: 'addTitle',
      value: function addTitle() {
        var title = document.createElement('a');
        title.textContent = this.jsonArticle.title;
        title.className = 'title';

        this.article.appendChild(title);
      }
    }, {
      key: 'addSourceName',
      value: function addSourceName() {
        var sourceName = document.createElement('h6');
        sourceName.textContent = this.jsonArticle.source.name;
        this.article.appendChild(sourceName);
      }
    }, {
      key: 'addDescription',
      value: function addDescription() {
        var description = document.createElement('p');
        description.textContent = this.jsonArticle.description;
        this.article.appendChild(description);
      }
    }, {
      key: 'addImage',
      value: function addImage() {
        var imageLink = document.createElement('a');
        imageLink.href = this.jsonArticle.url;

        var urlToImage = document.createElement('img');
        urlToImage.src = this.jsonArticle.urlToImage;

        imageLink.appendChild(urlToImage);

        this.article.appendChild(imageLink);
      }
    }]);

    return Article;
  }();

  var url = 'https://newsapi.org/v2/top-headlines?' + 'country=ru&' + 'apiKey=2a563e8347f14a44b618e0501345f3ff';
  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var articleContainer = document.getElementById('article-container');

    return data.articles.map(function (jsonArticle) {
      new Article(articleContainer, jsonArticle).addArticle();
    });
  });
})();

(function () {
  var ShortArticle = function () {
    function ShortArticle(popularAsideBlock, jsonArticle) {
      _classCallCheck(this, ShortArticle);

      this.popularAsideBlock = popularAsideBlock;

      this.shortArticle = document.createElement('a');
      this.shortArticle.className = "editor text-center";
      this.shortArticle.href = jsonArticle.url;

      if (jsonArticle.urlToImage != null) this.popularAsideBlock.appendChild(this.shortArticle);
      this.jsonArticle = jsonArticle;
    }

    _createClass(ShortArticle, [{
      key: 'addShortArticle',
      value: function addShortArticle() {
        this.addTitle();
        this.addShortDescription();
        this.addPublishedAt();
        this.addUnderscore();
      }
    }, {
      key: 'addTitle',
      value: function addTitle() {
        var title = document.createElement('a');
        title.textContent = this.jsonArticle.title;
        title.className = 'title';

        this.shortArticle.appendChild(title);
      }
    }, {
      key: 'addShortDescription',
      value: function addShortDescription() {
        var shortDescription = document.createElement('p');
        shortDescription.textContent = this.jsonArticle.description.substring(0, 100) + '...';

        this.shortArticle.appendChild(shortDescription);
      }
    }, {
      key: 'addPublishedAt',
      value: function addPublishedAt() {
        var publishedAt = document.createElement('label');
        publishedAt.textContent = this.jsonArticle.publishedAt;
        this.shortArticle.appendChild(publishedAt);
      }
    }, {
      key: 'addUnderscore',
      value: function addUnderscore() {
        var underscore = document.createElement('span');
        this.shortArticle.appendChild(underscore);
      }
    }]);

    return ShortArticle;
  }();

  var url = 'https://newsapi.org/v2/everything?' + 'q=Russia&' + 'language=ru&' + 'from=2018-02-04&' + 'sortBy=popularity&' + 'apiKey=2a563e8347f14a44b618e0501345f3ff';

  fetch(url).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var popularAsideBlock = document.getElementById('popular-aside-block');

    return data.articles.map(function (jsonArticle) {
      new ShortArticle(popularAsideBlock, jsonArticle).addShortArticle();
    });
  });
})();
