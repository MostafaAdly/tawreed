const imageInput = document.getElementById("image-upload");
const uploadedImage = document.getElementById("uploaded-image");

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.r;
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

imageInput.onchange = async (e) => {
    const [file] = imageInput.files;
    if (file) {
        const url = URL.createObjectURL(file);
        uploadedImage.src = url;
        // document
        //     .getElementById("form-image-url")
        //     .setAttribute("value", url.toString());
        // console.log(await toBase64(file));
        // console.log(btoa(file));
    }
};
