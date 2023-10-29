const imageInput = document.getElementById("image-upload");
const uploadedImage = document.getElementById("uploaded-image");
imageInput.onchange = (e) => {
    const [file] = imageInput.files;
    if (file) {
        const url = URL.createObjectURL(file);
        uploadedImage.src = url;
        imageInput.value = url;
    }
};
