const uploadImage = document.getElementById('upload-image');
const canvas = document.getElementById('image-canvas');
const ctx = canvas.getContext('2d');
let image = new Image();
let rotation = 0;

uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

document.getElementById('rotate-left').addEventListener('click', () => {
    rotation -= 90;
    drawRotatedImage();
});

document.getElementById('rotate-right').addEventListener('click', () => {
    rotation += 90;
    drawRotatedImage();
});

document.getElementById('reset').addEventListener('click', () => {
    rotation = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
});

function drawRotatedImage() {
    const radians = (rotation * Math.PI) / 180;
    canvas.width = image.height;
    canvas.height = image.width;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    ctx.restore();
}