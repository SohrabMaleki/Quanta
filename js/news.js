// news.js
//
// This script reads the list of news items defined in news-data.js and
// renders them into the appropriate containers on the home page and
// the all news page. It provides two functions: one for a limited
// subset (recent news) and one for the full archive.

/**
 * Render a subset of news items onto the home page.
 * Displays the three most recent articles based on their date.
 */
function renderRecentNews() {
  var container = document.getElementById('news-grid');
  if (!container || typeof newsItems === 'undefined') return;
  // Sort by date descending (most recent first). The date strings include non-breaking spaces,
  // so we replace them with normal spaces for proper Date parsing.
  var sorted = newsItems.slice().sort(function(a, b) {
    var dateA = new Date(a.date.replace(/\u00a0/g, ' '));
    var dateB = new Date(b.date.replace(/\u00a0/g, ' '));
    return dateB - dateA;
  });
  var recent = sorted.slice(0, 3);
  recent.forEach(function(item) {
    var article = document.createElement('article');
    article.className = 'news-item';
    article.innerHTML =
      '<img src="' + item.image + '" alt="' + item.title + '">' +
      '<div class="news-content">' +
        '<h3>' + item.title + '</h3>' +
        '<span class="date">' + item.date + '</span>' +
        '<p>' + item.summary + '</p>' +
        '<a href="' + item.link + '" class="link">Read more</a>' +
      '</div>';
    container.appendChild(article);
  });
}

/**
 * Render all news items onto the all-news page.
 * The news items are sorted by date (most recent first).
 */
function renderAllNews() {
  var container = document.getElementById('all-news-grid');
  if (!container || typeof newsItems === 'undefined') return;
  var sorted = newsItems.slice().sort(function(a, b) {
    var dateA = new Date(a.date.replace(/\u00a0/g, ' '));
    var dateB = new Date(b.date.replace(/\u00a0/g, ' '));
    return dateB - dateA;
  });
  sorted.forEach(function(item) {
    var article = document.createElement('article');
    article.className = 'news-item';
    article.innerHTML =
      '<img src="' + item.image + '" alt="' + item.title + '">' +
      '<div class="news-content">' +
        '<h3>' + item.title + '</h3>' +
        '<span class="date">' + item.date + '</span>' +
        '<p>' + item.summary + '</p>' +
        '<a href="' + item.link + '" class="link">Read more</a>' +
      '</div>';
    container.appendChild(article);
  });
}

// Initialise after DOM content is loaded to ensure target containers exist.
document.addEventListener('DOMContentLoaded', function() {
  renderRecentNews();
  renderAllNews();
});