const gallery = document.querySelector('.gallery');

function createImageElement(index) {
  const img = document.createElement('img');
  img.src = `https://bafybeiat2xp4fpzb24cbzqcra36mrolks72t5njcgwrofrexwqzvtxpbby.ipfs.nftstorage.link/${index}.png`;
  img.alt = `Image ${index}`;
  img.addEventListener('click', () => {
    if (img.style.width === '100%') {
      img.style.width = 'auto';
    } else {
      img.style.width = '100%';
    }
  });
  return img;
}

function populateGallery() {
  for (let i = 1; i <= 6000; i++) {
    const img = createImageElement(i);
    gallery.appendChild(img);
  }
}

populateGallery();
