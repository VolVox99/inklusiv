(async () => {const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
const screenshot = document.createElement("screenshot");

    const captureStream = await navigator.mediaDevices.getDisplayMedia();
    screenshot.srcObject = captureStream;
    context.drawImage(screenshot, 0, 0, window.width, window.height);
    const frame = canvas.toDataURL("image/png");
    captureStream.getTracks().forEach(track => track.stop());
    window.location.href = frame;
})()