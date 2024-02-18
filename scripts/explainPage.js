(async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const screenshot = document.createElement("img"); // Use <img> instead of <screenshot>

    try {
        const captureStream = await navigator.mediaDevices.getDisplayMedia();
        screenshot.srcObject = captureStream;

        screenshot.onload = function() {
            // Set canvas dimensions to match the image
            canvas.width = screenshot.width;
            canvas.height = screenshot.height;

            // Draw the image onto the canvas
            context.drawImage(screenshot, 0, 0, screenshot.width, screenshot.height);

            // Convert canvas to data URL
            const frame = canvas.toDataURL("image/png");

            // Stop the media stream
            captureStream.getTracks().forEach(track => track.stop());

            // Open the data URL in a new window/tab
            window.open(frame, '_blank');
        };
    } catch (error) {
        console.error('Error capturing screen:', error);
    }
})();
