(() => {
  function componentFactory() {
    this.createComponent = function(type, jsonArticle, shortArticle) {
      let component;

      if(type === 'title') {
        component = new AddTitle(jsonArticle, shortArticle);
      } else if(type === 'description') {
        component = new AddShortDescription(jsonArticle, shortArticle);
      } else if(type === 'publishedAt') {
        component = new AddPublishedAt(jsonArticle, shortArticle);
      } else if(type === 'underscore') {
        component = new AddUnderscore(jsonArticle, shortArticle);
      }

      return component;
    }
  }

  function DecoratedShortArticle() {
    this.createOnlyTitle = function(popularAsideBlock, jsonArticle) {
      let shortArticle = new AddShortArticle(popularAsideBlock, jsonArticle);
      let factory = new componentFactory();

      let componentNames = ['title', 'underscore'];

      componentNames.forEach(function(componentName) {
        shortArticle.appendChild(new factory.createComponent(componentName, jsonArticle, shortArticle));
      })

      return shortArticle;
    },

    this.createOnlyDescription = function(popularAsideBlock, jsonArticle) {
      let shortArticle = new AddShortArticle(popularAsideBlock, jsonArticle);
      let factory = new componentFactory();

      let componentNames = ['description', 'underscore'];

      componentNames.forEach(function(componentName) {
        shortArticle.appendChild(new factory.createComponent(componentName, jsonArticle, shortArticle));
      })

      return shortArticle;
    }
  }

  let AddShortArticle = function(popularAsideBlock, jsonArticle) {
    let shortArticle = document.createElement('a');
    shortArticle.className = "editor text-center";
    shortArticle.href = jsonArticle.url;

    popularAsideBlock.appendChild(shortArticle);

    return shortArticle;
  }

  let AddTitle = function(jsonArticle, shortArticle) {
    let title = document.createElement('a');
    title.textContent = jsonArticle.title;
    title.className = 'title';

    return title;
  };

  let AddShortDescription = function(jsonArticle, shortArticle) {
    let shortDescription = document.createElement('p');
    shortDescription.textContent = jsonArticle.description.substring(0, 100) + '...';

    return shortDescription;
  }

  let AddPublishedAt = function(jsonArticle, shortArticle) {
    let publishedAt = document.createElement('label');
    publishedAt.textContent = jsonArticle.publishedAt;

    return publishedAt;
  }

  let AddUnderscore = function(jsonArticle, shortArticle) {
    let underscore = document.createElement('span');

    return underscore;
  }

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
        new DecoratedShortArticle().createOnlyTitle(popularAsideBlock, jsonArticle);
        new DecoratedShortArticle().createOnlyDescription(popularAsideBlock, jsonArticle);
      })
    })

})();
