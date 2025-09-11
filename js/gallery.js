/*
 * gallery.js
 *
 * This script dynamically renders the gallery page using the list of
 * image filenames defined in gallery-data.js. It sorts images by
 * their numeric prefixes (in descending order), paginates them with
 * 50 items per page, and generates a simple pagination bar. The
 * gallery will automatically update when you modify the galleryImages
 * array.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Determine the current page from the URL query string. If no page
    // parameter is present, default to page 1.
    const params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get('page'), 10);
    if (isNaN(currentPage) || currentPage < 1) {
        currentPage = 1;
    }

    // Sort the galleryImages array by the numeric value extracted from
    // each filename. Files are expected to have a number as part of
    // their name, e.g. "123.jpg". Images with higher numbers will
    // appear first.
    const sortedImages = galleryImages.slice().sort((a, b) => {
        // Handle both string and object entries. When an entry is an object,
        // extract the filename from its `src` property. Otherwise treat the
        // entry itself as the filename.
        const nameA = typeof a === 'string' ? a : a.src;
        const nameB = typeof b === 'string' ? b : b.src;
        const numA = extractNumber(nameA);
        const numB = extractNumber(nameB);
        return numB - numA;
    });

    // Pagination settings
    const itemsPerPage = 50;
    const totalPages = Math.ceil(sortedImages.length / itemsPerPage) || 1;
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    // Compute the slice of images to display on this page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageImages = sortedImages.slice(startIndex, endIndex);

    // Expose pageImages globally within this closure so that the
    // navigation arrows can reference the full set of images on
    // the current page. We also maintain a currentIndex variable
    // that tracks which image is currently displayed in the lightbox.
    let currentIndex = 0;

    // Helper function to update the lightbox image and caption based
    // on the provided index. This function wraps around when
    // navigating past the first or last image on the page. It reads
    // caption information from the galleryImages array entries or
    // generates a default caption if none is provided.
    function showImage(index) {
        if (!lightbox || !lightboxImg || !lightboxCaption) return;
        // Wrap the index within the bounds of pageImages
        const total = pageImages.length;
        currentIndex = (index + total) % total;
        const entry = pageImages[currentIndex];
        const filename = typeof entry === 'string' ? entry : entry.src;
        const caption = typeof entry === 'string' ? `Image ${extractNumber(filename)}` : entry.caption || '';
        lightboxImg.src = `images/gallery/${filename}`;
        lightboxCaption.textContent = caption;
        // Ensure the lightbox is visible
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
    }

    // Render the gallery grid
    const galleryGrid = document.getElementById('gallery-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        pageImages.forEach((entry) => {
            const filename = typeof entry === 'string' ? entry : entry.src;
            const caption = typeof entry === 'string' ? `Image ${extractNumber(filename)}` : entry.caption || '';
            const item = document.createElement('div');
            item.className = 'gallery-item';
            const img = document.createElement('img');
            // Images are stored in the images/gallery directory. Adjust
            // the path if your structure differs.
            img.src = `images/gallery/${filename}`;
            img.alt = `Gallery image ${filename}`;
            img.dataset.caption = caption;
            item.appendChild(img);
            galleryGrid.appendChild(item);
        });
    }

    // Render pagination controls
    const pagination = document.getElementById('gallery-pagination');
    if (pagination) {
        pagination.innerHTML = '';
        const ul = document.createElement('ul');
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            // When page number is 1, omit the query string for a cleaner URL
            a.href = i === 1 ? 'gallery.html' : `gallery.html?page=${i}`;
            a.textContent = i.toString();
            if (i === currentPage) {
                a.classList.add('active');
            }
            li.appendChild(a);
            ul.appendChild(li);
        }
        pagination.appendChild(ul);
    }

    // Set up lightbox functionality after rendering the gallery. We attach a
    // single click listener to the gallery grid. When an image is clicked,
    // we display it in the lightbox overlay. The lightbox can be closed by
    // clicking the close button or clicking the overlay backdrop itself.
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;

    if (galleryGrid && lightbox && lightboxImg && closeBtn && lightboxCaption) {
        // Delegate click events to the grid. When an image is clicked,
        // determine its index within pageImages and display it in the lightbox.
        galleryGrid.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.tagName === 'IMG') {
                // Determine the filename from the src attribute
                const urlParts = target.src.split('/');
                const fileName = urlParts[urlParts.length - 1];
                const index = pageImages.findIndex((entry) => {
                    const fname = typeof entry === 'string' ? entry : entry.src;
                    return fname === fileName;
                });
                if (index >= 0) {
                    showImage(index);
                }
            }
        });

        // Close when clicking the close button
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
        });

        // Close when clicking outside the image (overlay backdrop) – ensure
        // click does not propagate from buttons or arrows
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('open');
                lightbox.setAttribute('aria-hidden', 'true');
            }
        });

        // Handle arrow navigation. The elements are selected outside
        // because they exist in the markup regardless of current state.
        const prevArrow = lightbox.querySelector('.lightbox-arrow.prev');
        const nextArrow = lightbox.querySelector('.lightbox-arrow.next');

        if (prevArrow) {
            prevArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex - 1);
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', (e) => {
                e.stopPropagation();
                showImage(currentIndex + 1);
            });
        }
    }
});

/**
 * Extracts the first sequence of digits from a filename and returns it
 * as a number. If no digits are found, returns 0. This helper is
 * used to sort files like "10.jpg" ahead of "2.jpg".
 *
 * @param {string} filename The filename to parse
 * @returns {number} The extracted numeric value
 */
function extractNumber(filename) {
    const match = filename.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
}