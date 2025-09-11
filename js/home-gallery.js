// js/home-gallery.js
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('homeGallery');
  const viewAll = container.querySelector('.news-extra'); // Save the "View All" card
  container.innerHTML = ''; // Clear everything

  // Sort images by number descending (assuming filenames like '1.jpg', '2.png', etc.)
  const sorted = galleryImages.slice().sort((a, b) => {
    const extractNum = item => {
      const match = item.src.match(/(\d+)\.(jpg|jpeg|png|gif)$/i);
      return match ? parseInt(match[1], 10) : 0;
    };
    return extractNum(b) - extractNum(a);
  });

  // Take the first 4 images and create the markup
  sorted.slice(0, 3).forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';

    const img = document.createElement('img');
    img.src = `images/gallery/${item.src}`;
    img.alt = item.caption || 'Gallery image';

    itemDiv.appendChild(img);
    container.appendChild(itemDiv);
  });

  // Append back the "View All Images" card at the end
  container.appendChild(viewAll);
});
