var divElement = document.createElement("div");
divElement.textContent = "Processing CSS for Accessibility...";
divElement.style.position = "fixed";
divElement.style.bottom = "0";
divElement.style.left = "0";
divElement.style.width = "100%";
divElement.style.backgroundColor = "purple";
divElement.style.color = "white";
divElement.style.fontSize = "24px";
divElement.style.padding = "10px";
divElement.style.textAlign = "center";
divElement.style.zIndex = "9999";
document.body.appendChild(divElement);


function getAllPageCSS() {
  let styles = '';
  for (let i = 0; i < document.styleSheets.length; i++) {
    console.log("getting info for " + document.styleSheets[i]);
    try {
      const rules = document.styleSheets[i].cssRules;
      for (let j = 0; j < rules.length; j++) {
        styles += rules[j].cssText + '\n';
      }
    } catch (e) {
      console.warn("Can't read the css rules of: ", document.styleSheets[i], e);
    }
  }
  return styles;
}

async function modifyCSSForColorBlindness(css, colorBlindnessType) {
    const prompt = `Given this CSS: \n\n${css}\n\n Adjust the CSS to accommodate for ${colorBlindnessType}. Ensure the modifications enhance readability and visual accessibility.`;

    // Update UI to indicate the process has started
    divElement.textContent = "Generating modified CSS for accessibility...";

    // Mockup of the API request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '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' // Ensure to securely manage your API key
        },
        body: JSON.stringify({
            model: "gpt-4", // Update to the model you're using
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0
        })
    });

    const data = await response.json();

    // Before applying the CSS, update UI to indicate processing is done and applying begins
    divElement.textContent = "Applying modified CSS for accessibility...";

    return data.choices[0].text; // Assuming the modified CSS is returned in the text
}

// Function to apply the modified CSS to the page
function applyModifiedCSS(modifiedCSS) {
    const styleElement = document.createElement('style');
    styleElement.textContent = modifiedCSS;
    document.head.appendChild(styleElement);
    
    // Update the divElement to indicate completion
    divElement.textContent = "Accessibility enhancements applied.";
}

// Main function to orchestrate the CSS modification and application
async function processCSSForAccessibility() {
    const originalCSS = getAllPageCSS();
    const colorBlindnessType = 'protanopia'; // Dynamically determine this based on user input in a real implementation
    
    try {
        const modifiedCSS = await modifyCSSForColorBlindness(originalCSS, colorBlindnessType);
        applyModifiedCSS(modifiedCSS);
    } catch (error) {
        console.error('Error processing CSS for accessibility:', error);
        // Update the divElement to indicate an error occurred
        divElement.textContent = "Error applying accessibility enhancements.";
    }
}

document.addEventListener('DOMContentLoaded', processCSSForAccessibility);