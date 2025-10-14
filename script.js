if (window.innerWidth > 768) {
    document.getElementById("mobile-section").classList.add("d-none");
    document.getElementById("desktop-warning").classList.remove("d-none");
} else {
    const video = document.getElementById("camera");
    const canvas = document.createElement("canvas");
    const captureBtn = document.getElementById("captureBtn");
    const preview = document.getElementById("preview");
    const previewCard = document.getElementById("previewCard");
    const analyzeBtn = document.getElementById("analyzeBtn");
    let capturedImage = null;

    const cameraModal = document.getElementById("cameraModal");
    const resultModal = new bootstrap.Modal(
        document.getElementById("resultModal")
    );
    const loader = document.getElementById("loader");
    const resultText = document.getElementById("resultText");

    // Open camera when modal opens
    cameraModal.addEventListener("shown.bs.modal", () => {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch((err) => {
                alert("Camera access denied: " + err);
            });
    });

    // Stop camera when modal closes
    cameraModal.addEventListener("hidden.bs.modal", () => {
        if (video.srcObject) {
            video.srcObject.getTracks().forEach((track) => track.stop());
        }
    });

    // Capture photo
    captureBtn.addEventListener("click", () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        capturedImage = canvas.toDataURL("image/png");
        preview.src = capturedImage;
        previewCard.classList.remove("d-none");
        bootstrap.Modal.getInstance(cameraModal).hide();
    });

    // Analyze button click
    analyzeBtn.addEventListener("click", () => {
        if (!capturedImage) {
            alert("Please capture an image first!");
            return;
        }

        loader.classList.remove("d-none");
        resultText.classList.add("d-none");
        resultModal.show();

        setTimeout(() => {
            loader.classList.add("d-none");
            resultText.classList.remove("d-none");
            resultText.innerHTML =
                "🩺 Result: Diseased Leaf Detected (Confidence: 93%)";
        }, 2000);
    });
}


//======================================================================================== //


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("upload-form");
    const resultSection = document.getElementById("result-section");
    const resultBox = document.getElementById("result");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // 👇 Hide form submit default behavior aur loader/processing dikhana optional
        resultBox.textContent = "Analyzing image... ⏳";
        resultSection.classList.remove("d-none");

        // Simulate analysis delay (replace with your real ML fetch request)
        setTimeout(() => {
            resultBox.textContent = "✅ Prediction Complete: Leaf is Healthy!";
            resultBox.classList.remove("alert-info");
            resultBox.classList.add("alert-success");
        }, 2000);
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("leafImage");
    const preview = document.getElementById("previewImage");
    const form = document.getElementById("upload-form");
    const resultSection = document.getElementById("result-section");
    const resultBox = document.getElementById("result");

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                preview.src = reader.result;
                preview.classList.remove("d-none");
            };
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        resultBox.textContent = "Analyzing leaf image... ⏳";
        resultSection.classList.remove("d-none");

        // Simulate ML prediction (replace this part with your backend logic)
        setTimeout(() => {
            resultBox.textContent = "✅ Leaf is healthy!";
            resultBox.classList.remove("alert-info");
            resultBox.classList.add("alert-success");
        }, 2000);
    });
});
