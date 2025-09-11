/*
 * gallery-data.js
 *
 * This file exports an array of gallery image filenames. Each entry
 * corresponds to a file stored in the `images/gallery/` directory of
 * your project. Images should be named using numeric prefixes, for
 * example `1.jpg`, `2.jpeg`, `3.png`, etc. The numeric part will be
 * used to sort images in descending order automatically. When you
 * add new photos to your gallery, simply append their filenames to
 * this list. The gallery.js script will handle sorting and
 * pagination.
 */

const galleryImages = [
    // Example entries – replace these with your actual gallery images.
    // Each entry can be either a string (the filename) or an object with
    // `src` and `caption` properties. Captions will appear beneath the
    // full-size image in the lightbox.
    { src: '6.jpg', caption: 'Lecture hall' },
    { src: '5.jpg', caption: 'Lecture hall' },
    { src: '4.jpg', caption: 'Lecture hall' },
    { src: '3.jpg', caption: 'Lecture hall' },
    { src: '2.jpg', caption: 'Particle collision' },
    { src: '1.jpg', caption: 'Cosmos galaxy' }
];