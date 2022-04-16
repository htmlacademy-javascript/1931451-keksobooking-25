const FILE_TYPES = ['svg', 'jpg', 'jpeg', 'png', 'gif'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('#avatar-preview');
const defaultAvatarPreview = avatarPreview.src;
const lodgingChooser = document.querySelector('#images');
const lodgingImageContainer = document.querySelector('.ad-form__photo');


avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const createImage = () => {
  const image = document.createElement('img');
  image.style.width = '100%';
  image.style.objectFit = 'cover';

  return image;
};

lodgingImageContainer.style.display = 'flex';
lodgingImageContainer.style.gap = '5px';

lodgingChooser.addEventListener('change', () => {
  const files = Array.from(lodgingChooser.files);

  files.forEach((file) => {
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const image = createImage();
      image.src = URL.createObjectURL(file);

      if (lodgingImageContainer.children.length < 3) {
        lodgingImageContainer.append(image);
      } else {
        lodgingImageContainer.children[lodgingImageContainer.children.length - 1].remove();
        lodgingImageContainer.insertAdjacentElement('afterbegin', image);
      }
    }
  });
});

const resetImages = () => {
  const images = Array.from(lodgingImageContainer.children);
  avatarPreview.src = defaultAvatarPreview;

  if (images.length > 0) {
    images.forEach((image) => image.remove());
  }
};


export { resetImages };
