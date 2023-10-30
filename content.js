// Listener for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.instruction) {
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.value = message.instruction;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));

            // Simulate Enter key press
            const enterEvent = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                keyCode: 13  // Key code for Enter
            });
            textarea.dispatchEvent(enterEvent);
        }
    }
});

// Create a side panel div
const sidePanel = document.createElement('div');
sidePanel.id = 'mySidePanel';
sidePanel.style.position = 'fixed';
sidePanel.style.right = '6px'; // Added 6px spacing from the right
sidePanel.style.top = '0';
sidePanel.style.width = '195px'; // Reduced the width by 5px
sidePanel.style.height = '100%';
sidePanel.style.backgroundColor = '#343541';

// Add the heading with the text "Chat EDU"
const headingText = "Chat EDU";
const heading = document.createElement('div');
heading.style.margin = '30px auto';
heading.style.textAlign = 'center';
heading.style.fontSize = '30px';
heading.style.fontWeight = 'bold';
heading.style.letterSpacing = '2px';

// Split heading text into individual letters and apply effects
Array.from(headingText).forEach(letter => {
    const span = document.createElement('span');
    span.innerText = letter;
    span.style.display = 'inline-block';
    span.style.transition = 'all 0.4s ease';

    // Add hover effects
    span.addEventListener('mouseover', function() {
        // Skew transformation
        const skewX = (Math.random() - 0.5) * 20;
        const skewY = (Math.random() - 0.5) * 20;

        // Random soft color palette
        const colors = ['#FFB6C1', '#FFD700', '#FF6347', '#98FB98', '#ADD8E6', '#FF69B4'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Apply styles
        this.style.color = color;
        this.style.transform = `skew(${skewX}deg, ${skewY}deg) translateY(-10px)`;
    });

    span.addEventListener('mouseout', function() {
        this.style.color = '';
        this.style.transform = '';
    });

    heading.appendChild(span);
});

sidePanel.appendChild(heading);

// Function to apply effects on the heading
function applyHeadingEffects() {
    Array.from(heading.children).forEach(span => {
        // Skew transformation
        const skewX = (Math.random() - 0.5) * 20;
        const skewY = (Math.random() - 0.5) * 20;

        // Random soft color palette
        const colors = ['#FFB6C1', '#FFD700', '#FF6347', '#98FB98', '#ADD8E6', '#FF69B4'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Apply styles
        span.style.color = color;
        span.style.transform = `skew(${skewX}deg, ${skewY}deg) translateY(-10px)`;

        // Reset styles after a delay
        setTimeout(() => {
            span.style.transitionDuration = `${Math.random() * 1 + 0.75}s`;  // Random duration
            span.style.color = '';
            span.style.transform = '';
        }, 3000);  // 3 seconds delay
    });
}
//This project, hosted under bg-neural on GitHub is our original work
//DROP-DOWN
// Function to add QuickGuide to panel
function addQuickGuideToPanel(panel) {
  const quickGuideContainer = document.createElement('div');
  quickGuideContainer.style.fontSize = '12px';
  quickGuideContainer.style.border = '1px solid #dcdcdc';
  quickGuideContainer.style.padding = '15px';
  quickGuideContainer.style.margin = '8px 0';
  quickGuideContainer.style.backgroundColor = '#555';
  quickGuideContainer.style.borderRadius = '8px';
  quickGuideContainer.innerHTML = 'Copy the text in the links below and place them in your custom instruction panel (bottom left).<br><br>';

  const createHyperlink = (href, text) => {
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.innerText = text;
    link.style.border = '1px solid #dcdcdc';
    link.style.padding = '5px';
    link.style.borderRadius = '5px';
    link.style.transition = 'all 0.4s ease';

    link.addEventListener('mouseover', function() {
      this.style.backgroundColor = '#555';
      this.style.color = 'white';
    });
    link.addEventListener('mouseout', function() {
      this.style.backgroundColor = '';
      this.style.color = '';
    });

    return link;
  };

  const userLink = createHyperlink('https://hastebin.com/share/icupocohaf.markdown', 'Custom Instruction - User');
  const modelLink = createHyperlink('https://hastebin.com/share/amoxexoliv.vbnet', 'Custom Instruction - Model');

  quickGuideContainer.appendChild(userLink);
  quickGuideContainer.appendChild(document.createElement('br'));
  quickGuideContainer.appendChild(document.createElement('br'));
  quickGuideContainer.appendChild(modelLink);

  panel.appendChild(quickGuideContainer);
}

const dropdown = document.createElement('div');
dropdown.style.width = '100%';

const dropdownBtn = document.createElement('button');
dropdownBtn.innerHTML = 'Starting Guide <span id="arrow">&#x25BC;</span>';
dropdownBtn.style.width = '100%';
dropdownBtn.style.padding = '14px 20px';
dropdownBtn.style.margin = '8px 0';
dropdownBtn.style.border = 'none';
dropdownBtn.style.cursor = 'pointer';

dropdownBtn.addEventListener('mouseover', function() {
  this.style.backgroundColor = '#d15a5a';
  this.style.color = 'white';
});
dropdownBtn.addEventListener('mouseout', function() {
  this.style.backgroundColor = '';
  this.style.color = '';
});
dropdownBtn.style.transition = 'all 0.4s ease';

const dropdownContent = document.createElement('div');
dropdownContent.style.display = 'none';
dropdownContent.style.overflow = 'hidden';
dropdownContent.style.maxHeight = '0';
dropdownContent.style.transition = 'max-height 0.4s ease-in-out';

dropdownBtn.addEventListener('click', function() {
  const arrowSpan = document.getElementById('arrow');
  if (dropdownContent.style.display === 'none') {
    dropdownContent.style.display = 'block';
    dropdownContent.style.maxHeight = '500px';  // Set to the approximate max height
    arrowSpan.innerHTML = '&#x25B2;';
  } else {
    dropdownContent.style.display = 'none';
    dropdownContent.style.maxHeight = '0';
    arrowSpan.innerHTML = '&#x25BC;';
  }
});

addQuickGuideToPanel(dropdownContent);

dropdown.appendChild(dropdownBtn);
dropdown.appendChild(dropdownContent);

// Assuming sidePanel is already defined
sidePanel.appendChild(dropdown);

//DROP-DOWN

// Create buttons with specified text
const buttonsText = [
    'Generate Questions',       // More action-oriented
    'Formulate Answers',        // Emphasizes the act of formulation
	'Explore Additional Topics', // Gives a sense of diving deeper without repetition
	'Fun Brain Challenges',      // "Fun" emphasizes the lighter nature, "Challenges" covers teasers, riddles, etc.
];


// Add the corresponding predefined texts
const predefinedTexts = [
    `# **Context Understanding and Question Generation (Stage 2)**

📝 **Instructions:** Follow the steps in sequence. You are tasked to build upon the "Curriculum Mapping" stage. **It's imperative to complete the table first** before moving on to question formation. **Under no circumstances should you provide answers to these questions. Your role is solely to generate questions.**

## Table Formation
Create a Markdown-formatted table as follows:

| **Column 1**                            | **Column 2** |
|:----------------------------------------|:-------------|
| **Experts**                             | Identify 3-4 expert roles specializing in question formulation in academia, exam-setting, and question design |
| **Context Understanding**               | A CSV of a condensed list of only the most important modules from the curriculum map created in Stage 1. Emphasize only on the academic topics related to the learning objective. Avoid using lists; instead separate each term with semicolons (;).|
| **Potential Types of Questions** | A CSV of question parameters best suited for evaluating the chosen modules using Bloom's taxonomy as comma seperated values. Specify the parameters of the questions (types and number of questions) best suited for evaluating the user. e.g., 3 MCQs, 2 true-or-false questions, 3 Calculation-based questions, etc.|

## 📝 **Question Formation**
After completing the table, generate EXTENSIVELY DETAILED questions based on the 'Identify Potential Spots for Questions' section. Align the questions with the condensed modules and learning objectives from Stage 1.
`,
`# **Validation & Answer Key Creation (Stage 3)**

📝 **Instructions:** This stage is a continuation from the previous stage. Follow the steps in sequence, ensuring to build upon your work from the previous stages. **Complete the table first**, then proceed to Validation/Quality Assurance and finally, Answer Key Creation. **Under no circumstances should you provide answers to these questions.**

## Table Formation
Create a Markdown-formatted table as follows:

| **Column 1**                         | **Column 2** |
|:-------------------------------------|:-------------|
| **Experts**                          | Identify 3-4 expert roles specializing in assessment validation, answer key creation, and educational quality assurance |
| **Framework** | Outline the types of answers that will be used for creating a robust answer key. For example, for MCQs and True-or-False questions: correct answer + rationale; For Calculation-based questions: step-by-step solution + result; For Open-ended questions: key points. |
| **Validation/Quality Assurance Metrics** | Propose how you plan to ensure that the answer key is accurate and well-reasoned |

## 📊 **Validation/Quality Assurance**
1. **Reiterate Learning Objective:** Re-state the Learning Objective from Stage 1 briefly.
  
## 🗝️ **Answer Key Creation**
Generate an answer key for each of the questions proposed in the last stage (whatever that might be). The answer key should be EXTENSIVELY DETAILED, lengthy, and make use of proper notation, aligning closely with the learning objectives from Stage 1 and the frameworks clarified in this stage. Use VERBOSITY V=3.
For Multiple-Choice Questions and Short Answer Questions, provide the correct answer along with a brief explanation.For Essay and Open-Ended Questions, only outline the key points that a well-reasoned answer should include. No need for a full answer unless the user asks it.
Follow the above instructions explicitly.
`,
`
# **Advanced Question Exploration (Stage 4)**

📝 **Instructions:**

- **Continuation:** This stage builds upon both "Context Understanding and Question Generation" (Stage 2) and "Validation & Answer Key Creation" (Stage 3). The objective is to explore further dimensions of the learning goal through new, diverse, and unasked questions.
- **Table First:** As always, complete the table below as your initial step.

## 📝 Table Formation

Create a Markdown-formatted table as follows:

| **Column 1**                              | **Column 2**                                                      |
|:------------------------------------------|:------------------------------------------------------------------|
| **Experts**                               | Identify 3-4 expert roles focusing on advanced question formulation and learning pathway design that weren't mentioned before. |
| **Context Understanding**        | Use a CSV to provide a refined list of additional important modules that could be explored further. Separate each term with semicolons (;). |
| **Types of Questions**           | In CSV format, list potential types and number of questions that could offer a deeper understanding of the topic. For example, 2 true-or-false questions, 4 MCQs, etc. |

## 🎯 Reiterate Learning Objective

Concisely restate the learning objective from Stage 1 to ensure alignment with the new questions you are about to generate.

## 📝 **Advanced Question Formation**

After completing the table and restating the learning objective, generate questions that are EXTENSIVELY DETAILED and unasked in previous stages. Ensure these questions align closely with the original learning objective and could potentially open up new avenues for learning.
Follow the above instructions explicitly.
`,
`

# **Brain Teasers (Stage X)**

📝 **Instructions:**

- **Detour:** This stage serves as an enjoyable yet insightful detour from the main instructional path. The objective here is to create quirky, interesting, and maybe even bizarre questions that are aligned with unexplored topics from the curriculum mapped in Stage 1 (if there is no preceding Stage 1, align with user's current question).
- **Table First:** Complete the table below first.

## 📝 Table Formation

Create a Markdown-formatted table as follows:

| **Column 1**                          | **Column 2**                                                      |
|:--------------------------------------|:------------------------------------------------------------------|
| **Experts**                           | Identify 3-4 expert roles that specialize in trivia, puzzles, or educational games. |
| **Unexplored Topics**                 | Use a CSV to jot down a list of topics from the Stage 1 curriculum that haven't been covered yet. Separate each term with semicolons (;). |
| **Types of Brain Teasers**            | Specify the kind and number of brain teasers you plan to create. For example, 3 puzzles, 2 Did You Knows, 1 riddle, 1 paradox, etc. |

## 🎯 Reiterate Learning Objective

Briefly restate the unexplored learning objectives from Stage 1 that you aim to touch upon through these brain teasers.

## 🧠 **Brain Teaser Formation**

After completing the table and revisiting the unexplored learning objectives, proceed to formulate brain teasers. These should be short yet thought-provoking and align closely with the topics identified in Stage 1. Maintain a professional tone and language in your formulations.

`
];

buttonsText.forEach((text, index) => {
    const button = document.createElement('button');
    button.id = `myButton${index + 1}`;
    button.innerText = text;
    button.style.width = '85%';  // The buttons will automatically adjust to the new side panel width
    button.style.padding = '14px 14px';
    button.style.margin = '8px 0px 8px 15px';
	button.style.fontSize = '14px';
    button.style.border = '1px solid #dcdcdc'; // Added thin grey outline
    button.style.borderRadius = '10px'; // Added rounded corners
    button.style.cursor = 'pointer';

    // Add hover effects
    button.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#555';
        this.style.color = 'white';
        this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
        this.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', function() {
        this.style.backgroundColor = '';
        this.style.color = '';
        this.style.boxShadow = '';
        this.style.transform = '';
    });
    // Add hover effects with smoother transitions
    button.style.transition = 'all 0.4s ease';

    // Apply the heading effects inside the button click event
    button.addEventListener('click', function() {
        applyHeadingEffects();
        
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.value = predefinedTexts[index];
            textarea.dispatchEvent(new Event('input', { bubbles: true }));

            // Simulate Enter key press
            const enterEvent = new KeyboardEvent('keydown', {
                bubbles: true,
                cancelable: true,
                keyCode: 13  // Enter key code
            });
            textarea.dispatchEvent(enterEvent);
        }
    });

    // Append button to side panel
    sidePanel.appendChild(button);
});

// Append side panel to body
document.body.appendChild(sidePanel);
