// news-data.js
//
// This file defines the list of news items used throughout the site.
// Each object contains metadata about a single news article. When adding
// a new article, append a new object to the array below. You do not need
// to modify the home page or the all news page; those pages will read
// from this array automatically.

const newsItems = [
  
  {
    id: 'new-topic',
    title: 'Descriptive title',
    date: 'Month Day, Year',
    summary: 'Short summary used on listing pages.',
    image: 'your-image.jpg',
    link: 'news/news-template.html'
  },
  {
    id: 'new-circle-statistical-physics',
    title: 'New Circle: Statistical Physics',
    date: 'July\u00a030,\u00a02025',
    summary: 'We are excited to announce a new study circle focusing on Statistical Physics starting this fall. Join us to explore partition functions, fluctuations and critical phenomena.',
    image: 'particle.jpg',
    link: 'news/new-circle-statistical-physics.html'
  },
  {
    id: 'guest-lecture-cosmology',
    title: 'Guest Lecture on Cosmology',
    date: 'July\u00a015,\u00a02025',
    summary: 'Professor A.\u00a0B.\u00a0Speaker gave an inspiring lecture on the evolution of galaxies and the cosmic microwave background. Video and slides are now available.',
    image: 'cosmos.jpg',
    link: 'news/guest-lecture-cosmology.html'
  },
  {
    id: 'recap-quantum-tests-session',
    title: 'Recap: Quantum Tests Session',
    date: 'June\u00a010,\u00a02025',
    summary: 'We concluded our second session on Quantum Tests, discussing the interference postulate and the introduction of transition amplitudes using unitary matrices.',
    image: 'lecture.jpg',
    link: 'news/recap-quantum-tests-session.html'
  }

];