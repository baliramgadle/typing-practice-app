const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const sample = document.getElementById("sample-text");
const first = document.getElementById("first");
const second = document.getElementById("second");
const result = document.getElementById("result");

let startTime = null;
let timer = null;

// Resize textarea dynamically
text1.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

// Start the typing test
function start() {
  text2.removeAttribute('disabled');
  if (text1.value.trim().length < 100) {
    alert("At least 100 characters required!");
    return;
  }
  const value = text1.value.trim();
  first.style.display = "none";
  sample.innerText = value;
  second.style.display = "block";
  startTime = null; // Reset timer
  result.innerHTML = ""; // Clear previous results
  text2.focus();
}

// Reset the test
function done() {
  first.style.display = "block";
  second.style.display = "none";
  text1.value = "";
  text2.value = "";
  sample.innerHTML = "";
  clearInterval(timer); 
  timer = null;
}

// Typing test logic
text2.addEventListener("input", () => {
  const sampleText = sample.innerText;
  const userInput = text2.value;
  let highlightedText = "";
  let correctChars = 0;

  // Start timer on first input
  if (startTime === null) {
    startTime = Date.now();
    timer = setInterval(() => updateResult(correctChars, userInput, sampleText), 100);
  }

  // Compare input with sample and highlight
  for (let i = 0; i < sampleText.length; i++) {
    if (i < userInput.length) {
      if (userInput[i] === sampleText[i]) {
        highlightedText += `<span style="color: green;">${sampleText[i]}</span>`;
        correctChars++;
      } else {
        highlightedText += `<span style="color: red;">${sampleText[i]}</span>`;
      }
    } else {
      highlightedText += sampleText[i];
    }
  }

  // Update the sample div
  sample.innerHTML = highlightedText;

  // Update results in real-time
  updateResult(correctChars, userInput);
});

function updateResult(correctChars, userInput) {
  const elapsedTime = (Date.now() - startTime) / 1000; 
  const wordsTyped = text2.value.length / 5; 
  const speed = Math.round((wordsTyped / (elapsedTime / 60)) || 0); 
  const totalWords = sample.innerText.length / 5;

  // Display the result
  result.innerHTML = `
    <p>Time: ${elapsedTime.toFixed(1)}s</p>
    <p>Speed: ${speed} WPM</p>
    <p>TotalWords: ${totalWords}</p>
    <p>TypedWords: ${wordsTyped}</p>
  `;

  text2.focus();
  const selectionStart = text2.selectionStart;
  const selectionEnd = text2.selectionEnd;

  if (selectionStart !== selectionEnd) {
    text2.setSelectionRange(text2.value.length, text2.value.length); 
  }
  
  // Stop the timer if input matches the sample text
  if (totalWords <= wordsTyped) {
    clearInterval(timer);
    result.innerHTML += "<p>Typing complete!</p>";
    text2.setAttribute('disabled','true');
  }
}

text2.addEventListener('paste', (e)=>{
    e.preventDefault();
})

text2.addEventListener('select', () => {
    const selectionStart = text2.selectionStart;
    const selectionEnd = text2.selectionEnd;

    if (selectionStart !== selectionEnd) {
      text2.setSelectionRange(text2.value.length, text2.value.length); 
    }
  });

  text1.addEventListener('keydown', (e)=>{
    if(text1.value.trim() == '!5' && e.key == 'Enter'){
        text1.value = "Perseverance is essential for success. It involves pushing forward despite obstacles or setbacks. Famous figures like Thomas Edison exemplified perseverance, failing many times before achieving success. It teaches us that failure is not defeat but part of the learning process. Perseverance allows us to grow stronger and more resilient in the face of challenges, ultimately leading to personal and professional achievement. It is about consistent effort, learning from mistakes, and refusing to give up.";
    }
    else if(text1.value.trim() == '!1' && e.key == 'Enter'){
        text1.value = "Technology has transformed our daily lives, making tasks more efficient and convenient. From smartphones to AI, technological advancements impact how we work, communicate, and live. While it has brought numerous benefits, it also presents challenges, such as cybersecurity risks and social isolation. The key is to use technology responsibly, balancing its advantages with its potential downsides. Embracing innovation while being mindful of its effects can lead to a more connected and productive world.";
    }
    else if(text1.value.trim() == '!2' && e.key == 'Enter'){
        text1.value = "Protecting the environment is crucial for the survival of all species. Deforestation, pollution, and climate change threaten ecosystems and human life. Sustainable practices like reducing waste, conserving water, and supporting renewable energy can help mitigate these issues. Every small action, from using eco-friendly products to recycling, contributes to a healthier planet. Environmental conservation is not just an obligation; it is a responsibility we all share for future generations.";
    }
    else if(text1.value.trim() == '!3' && e.key == 'Enter'){
        text1.value = "Mental health is a fundamental aspect of overall well-being. Conditions like stress, anxiety, and depression affect many, yet often remain unspoken. Destigmatizing mental health and providing access to support and care is vital. Simple activities like exercising, talking to a friend, or practicing mindfulness can significantly improve mental well-being. Just as we care for our bodies, we must prioritize mental health to lead balanced and fulfilling lives.";
    }
    else if(text1.value.trim() == '!4' && e.key == 'Enter'){
        text1.value = "Lifelong learning is the ongoing pursuit of knowledge throughout life. It helps individuals adapt to changing circumstances, whether in their careers or personal lives. Learning new skills, exploring different fields, or simply staying curious fosters growth and resilience. With countless resources available online and offline, lifelong learning is accessible to anyone. It not only enhances professional skills but also enriches personal experiences and promotes continuous self-improvement.";
    }
  });
