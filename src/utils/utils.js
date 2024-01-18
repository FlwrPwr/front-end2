
const utils = {
  GetImageFormat(imageBase64) {
    if (!imageBase64) {
       global-require
      return require('@/assets/images/no-content-found.png');
    }
    return imageBase64;
  },
  InputImage(item) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      item.ImgBase64 = reader.result;
      fileInput.value = '';
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  },
  Ellipsify(str, length) {
    if (str.length > length) {
      return `${str.substring(0, length)}...`;
    }

    return str;
  },
};

export default utils;
