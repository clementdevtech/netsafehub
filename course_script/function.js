// Initialize variables
let totalAttempts = parseInt(localStorage.getItem('totalAttempts')) || 0;
let maxAttempts = 3; 
let heartResetTimeout = 10 * 60 * 1000;
let hintsUsed = parseInt(localStorage.getItem('hintsUsed')) || 0;
const hearts = document.querySelectorAll('#hearts .heart');
const crushSound = new Audio('../sounds/wah-wah-sad-trombone-6347.mp3');
const successSound = new Audio('../sounds/applause-sound-effect-240470.mp3');
let points = 0;
let courseID = '';
let current_level = '';
let rewardsection = document.querySelector('#rewards span').textContent;











 

let currentState = {};
let previousState = {};
const initialState = window.location.hash.substr(1);

// Manual scroll restoration to avoid unexpected scrolling
if ('history' in window && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Handling browser back/forward buttons
window.addEventListener('popstate', function (event) {
    event.preventDefault();
    const state = event.state;
    if (state) {
        previousState = currentState;
        currentState = state;

        if (currentState && currentState.pageId) {
            showPage(currentState.pageId);
        } else {
            Initialpage();
        }
    } else {
        Initialpage();
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    courseid();
    setupCourseNavigation();
    setupTaskNavigation();
    hint_section();
    submit_ans();
    nextsection();
    
    if (history.state) {
        showPage(history.state.pageId);
    } else {
        Initialpage();
    }
});

// Function to display the appropriate page based on pageId
function showPage(pageId) {
    switch (pageId) {
        case 'sections':
            openCourse();
            break;
        case 'tasks':
            openTasks();
            break;
        default:
            Initialpage();
            break;
    }
}

// Initial view when there’s no specific page selected
function Initialpage(){
const elements = document.querySelectorAll('h2,h3');
    elements.forEach(element=>{
        element.style.display='flex';
    });
  document.querySelectorAll('.theory').forEach(section=>{section.style.display='none';});
}

// Handle course section navigation
function setupCourseNavigation() {
    document.querySelectorAll('h3').forEach(h3 => {
        h3.addEventListener('click', function () {
            const courseclass = this.getAttribute('course-id');
            courseID = courseclass;
            const course = document.querySelector(`.${courseclass}`);
            const elements = document.querySelectorAll('h2,h3');
            elements.forEach(element => {
                element.style.display = 'none';
            });
            course.style.display = 'block';
            const currentState = history.state;
            if (!currentState || currentState.pageId !== 'sections'){
            const path = `#section/${courseclass}`;
            history.pushState({ pageId: 'sections' }, '', path);
            }
        });
    });
}

// Handle task navigation
function setupTaskNavigation() {
    document.querySelectorAll('.next').forEach(button => {
        button.addEventListener('click', (e) => {
            const parentshell = e.target.closest('div');
            const parentElement = parentshell.parentNode;
            parentElement.parentNode.querySelector('.task').style.display = 'block';
            parentElement.style.display = 'none';
            const taskid = parentElement.parentNode.querySelector('.task').getAttribute('task-id');
            const currentState = history.state;
            if (!currentState || currentState.pageId !== 'tasks'){
            const path = `#Task/${taskid}`;
            history.pushState({ pageId: 'tasks' }, '', path);
            }
        });
    });
}



//getting course id 
function courseid(){
    courseID = location.hash.split('/').pop();
    //console.log(courseID);
}





// Open tasks (when navigating from tasks to sections)
function openTasks() {
    const task = location.hash.split('/').pop();
    const elements = document.querySelectorAll('h2,h3');
    elements.forEach(element=>{
        element.style.display='none';
    });
    const hint_section = document.querySelector(`.${courseID}`).querySelector('.hint-content');
    if (hint_section){
        hint_section.style.display="none";
        hint_section.innerHTML="";
    }
    const section= document.querySelector(`.${task}`);
    section.style.display = 'block';
    section.querySelector('.course-container').style.display = 'none';
        document.querySelectorAll('.task').forEach(task => {
        task.style.display = 'block';
    });
}

// Open course sections (when navigating back from tasks)
function openCourse() {

    document.querySelectorAll(`.${courseID}`).forEach(section => {
        console.log(section);
        section.querySelector('.course-container').style.display = 'block';
        section.style.display = 'block';
    });
    const elements = document.querySelectorAll('h2,h3');
    elements.forEach(element=>{
        element.style.display='none';
    });
    const hint_section = document.querySelector(`.${courseID}`).querySelector('.hint-content');
    if (hint_section){
        hint_section.style.display="none";
        hint_section.innerHTML="";
    }
    document.querySelectorAll('.task').forEach(task => {
        task.style.display = 'none';
    });
}



//...................................quiz ................. section.............................................
document.addEventListener('DOMContentLoaded', () => {
    gettinprogress();
    totalAttempts = parseInt(localStorage.getItem('totalAttempts')) || 0;
    const remainingAttempts = maxAttempts - totalAttempts;

    
    updateHearts(); 

    const id = location.hash.split('/').pop();
    const parentElement = document.querySelector(`div.theory.${courseID}`);
    const resultDiv = parentElement.querySelector(`.feedback`);
    //console.log(parentElement);
    if (!resultDiv) {
        console.error('Feedback element not found!');
        return;
    }

    
    //resultDiv.textContent = `You have ${remainingAttempts} attempts remaining.`;
    resultDiv.style.color = remainingAttempts > 0 ? 'black' : 'red'; 

    
    if (totalAttempts >= maxAttempts) {
        const endTime = localStorage.getItem('endTime');
        const remainingTime = endTime ? Math.max(0, endTime - Date.now()) : 0;

        
        if (remainingTime > 0) {
            startCountdown(resultDiv, remainingTime);
            parentElement.querySelector('.check').disabled = true;
            hearts.forEach(heart => heart.textContent = '🖤');
        } else {
            resetAttempts(); 
        }
    } else {
        updateHearts();
    }
});

function submit_ans() {
    document.querySelectorAll('.check').forEach(check => {
        check.addEventListener('click', (e) => {
            const course = document.querySelector(`.${courseID}`);
            const form = course.querySelector('form');
            const resultDiv = document.querySelector(`#${form.getAttribute('id')}-feedback`);
            const checkboxes = form.querySelectorAll('input');

            if (totalAttempts >= maxAttempts) {
                resultDiv.textContent = 'You have reached the maximum number of attempts. Please wait for 10 minutes to try again.<div id="restore">Restore Hearts</div>';
                resultDiv.style.color = 'red';
                course.querySelector('.check').disabled = true;
                startCountdown(resultDiv);
                return;
            }

            let allCorrect = true;
            let hasSelectedCorrect = false; 
            let selectedAnswers = 0;
            let correctCount = 0;
            let selectedCorrectCount = 0;

            
            checkboxes.forEach(input => {
                const isCorrect = input.getAttribute('value') === 'correct';
                if (isCorrect) {
                    correctCount++;
                }
            });

            
            checkboxes.forEach(input => {
                const isCorrect = input.getAttribute('value') === 'correct';
                const isChecked = input.checked;

                if (isChecked) {
                    selectedAnswers++;
                    if (isCorrect) {
                        hasSelectedCorrect = true;
                        selectedCorrectCount++; 
                    } else {
                        allCorrect = false; 
                    }
                } else if (isCorrect) {
                    allCorrect = false; 
                }
            });

            if (selectedAnswers === 0) {
                resultDiv.textContent = 'Please select at least one answer 🤔!';
                resultDiv.style.color = 'red';
                return;
            }

            
            if (selectedCorrectCount < correctCount) {
                resultDiv.textContent = 'You have not selected all the correct answers. Keep trying!';
                resultDiv.style.color = 'orange';
                totalAttempts++;
                checkboxes.forEach(input => {
                    input.checked = false;
                });
                updateAttempts(resultDiv);
                return;
            }

           
            if (allCorrect && hasSelectedCorrect && selectedCorrectCount === correctCount) {
                course.querySelector('.check').disabled = true;
                resultDiv.textContent = getCongratulatoryMessage(points);
                resultDiv.style.color = 'green';
                awardPoints(); 
                nextsection(); 
            } else {
                
                resultDiv.textContent = 'Incorrect 😥! Give it another go!';
                totalAttempts++;
                checkboxes.forEach(input => {
                    input.checked = false;
                });
                updateAttempts(resultDiv);
            }
        });
    });
}

// Helper function to update attempts and handle attempts logic
function updateAttempts(resultDiv) {
    localStorage.setItem('totalAttempts', totalAttempts);
    if (totalAttempts <= maxAttempts) {
        const heartIndex = maxAttempts - totalAttempts;
        if (hearts[heartIndex]) {
            hearts[heartIndex].textContent = '🖤';
            crushSound.play();
        }
    }
    if (totalAttempts >= maxAttempts) {
        resultDiv.textContent += ` You have used all your attempts. Please wait for 30 minutes to try again.`;
        const endTime = Date.now() + heartResetTimeout; 
        localStorage.setItem('endTime', endTime);
        startCountdown(resultDiv);
    } else {
        resultDiv.textContent += ` You have ${maxAttempts - totalAttempts} attempts left.`;
    }
    updatePoints();
}



function startCountdown(resultDiv, remainingTime) {
   // console.log(resultDiv+""+""+ remainingTime)
    if (!remainingTime) return; 
    const interval = setInterval(() => {
        remainingTime -= 1000; 
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        
        if (resultDiv) {
            resultDiv.textContent = `You have used all your attempts. Please wait ${minutes}m ${seconds}s to try again.`;
        }

        if (remainingTime <= 0) {
            clearInterval(interval); 
            resetAttempts();
        }
    }, 1000); 
}

function updateHearts() {
    hearts.forEach((heart, index) => {
        
        if (index < (maxAttempts - totalAttempts)) {
            heart.textContent = '❤️'; 
        } else {
            heart.textContent = '🖤'; 
        }
    });
}

function resetAttempts() {
    totalAttempts = 0;
    hintsUsed = 0; 
    localStorage.removeItem('totalAttempts');
    localStorage.removeItem('endTime');
    hearts.forEach(heart => heart.textContent = '❤️');
    const resultDivs = document.querySelectorAll('.feedback');
    resultDivs.forEach(div => div.textContent = '');
    document.querySelectorAll('.task-form button[type="submit"]').forEach(btn => btn.disabled = false);
}



function getCongratulatoryMessage(points) {
    if (points >= 60) {
        return 'Amazing! 🌟 You are a superstar! Keep it up!';
        successSound.play();
    } else if (points >= 50) {
        return 'Great job! 🎉 You’re really nailing this!';
    } else if (points >= 40) {
        return 'Well done! 👍 You’re making progress!';
    } else if (points >= 25) {
        return 'Good effort! Keep trying! 😊';
    } else {
        return 'Congrats! 🥳 Every little step counts!';
    }
}


function nextsection(){
    console.log(courseID);
    unlockLevels();
}

function unlockLevels(){

}

// ...................................................................Function to award points based on attempt and hint usage
function awardPoints() {
    let pointsAwarded = 60 - (totalAttempts * 2) - (hintsUsed * 5); 
    points = Math.max(0, pointsAwarded);
    updatePoints();
    document.getElementById('points').textContent = points;
}



 function updatePoints(pointsEarned) {
            const currentPoints = parseInt(document.getElementById('points').textContent);
            const newPoints = currentPoints + pointsEarned;
            const result = separateString(courseID);
            const gameId = result[0];
            const level = result[0];
            console.log(result);


            fetch('/api/progress/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({game_id: gameId, level_id: level, points: newPoints })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('points').textContent = newPoints;
                }
            })
            .catch(error => console.error('Error updating points:', error));
        }


function separateString(str) {
    const match = str.match(/^([a-zA-Z]+)(\d+)$/);
     if (match) {
        return [match[1], match[2]];
        } else {
            return null;
            }
        }

/***************loading page points and level*******************/

async function gettinprogress() {
    document.getElementById('rewards').querySelector('span').textContent="";
    const ids = separateString(location.hash.split('/').pop());
    const gameId = ids[0];
    const level_id = ids[1];
    console.log(level_id);
    fetch(`/api/progress/${gameId}/${level_id}`)
          .then(response => response.json())
            .then(data => {
                console.log(data)
                 data.forEach(level => {
                    console.log(data)
                    document.getElementById('rewards').querySelector('span').textContent = level.points;
                 });
                })
                .catch(error => console.error('Error fetching progress:', error));
        
}







function unlockNextLevel(currentLevelIndex) {
  const nextLevelIndex = currentLevelIndex + 1;
  if (nextLevelIndex < levels.length) {
    unlockAndOpenNextLevel(levels[currentLevelIndex], levels[nextLevelIndex]);
  }
}



//.................................................hint section.............................................

function hint_section() {
    document.querySelectorAll('.hint-image').forEach(hintIcon => {
        hintIcon.addEventListener('click', function(event) {
            
            if (points <= 5) {
                alert("You need more than 5 points to use the hint section.");
                return;
            }

            hintsUsed++; 

            
            points = Math.max(0, points - 5); 
            updatePoints(); 

            const section = document.querySelector(`.${courseID}`);
            const questionLabel = section.querySelector('label');
            const question_section = section.querySelector('.task');
            const sectionContent = section.querySelector('.course-container').innerText;
            const hintText = generateSummaryHint(sectionContent, questionLabel);
            const hint_section = document.querySelector(`.${courseID}`).querySelector('.hint-content');
            question_section.style.display = "none";

            if (!hint_section) {
                const hintContent = document.createElement('div');
                hintContent.classList.add('hint-content');
                hintContent.style.display = 'block';
                hintContent.innerHTML = `<div>
                                         <h4 class="go-back" onclick="go_back()">Go back</h4>
                                         <p>${hintText}</P>
                                         </Div>`;
                section.appendChild(hintContent);
            } else {
                hint_section.style.display = 'block';
                hint_section.innerHTML = `<div>
                                         <h4 class="go-back" onclick="go_back()">Go back</h4>
                                         <p>${hintText}</P>
                                         </Div>`;
            }
        });
    });
}

function generateSummaryHint(content, questionLabel) {
    const question = questionLabel.innerText.replace('Question:', '').toLowerCase();
    const keyPhrases = extractKeyPhrases(content);

    let hint = `Based on the content: ${keyPhrases.join(', ')}.`;


    if (question.includes("what") || question.includes("which")) {
        hint += " Focus on the definitions, main concepts, or options discussed.";
    } else if (question.includes("how")) {
        hint += " Consider the process or steps mentioned in the content.";
    } else if (question.includes("why")) {
        hint += " Think about the reasons or causes described.";
    } else if (question.includes("when")) {
        hint += " Focus on the timing or sequence of events.";
    } else if (question.includes("where")) {
        hint += " Pay attention to the locations or places discussed.";
    } else if (question.includes("who")) {
        hint += " Consider the key individuals or groups mentioned.";
    } else if (question.includes("compare")) {
        hint += " Look for any similarities or differences highlighted.";
    } else if (question.includes("advantage") || question.includes("benefit")) {
        hint += " Think about the positive outcomes or advantages mentioned.";
    } else if (question.includes("disadvantage") || question.includes("limitation")) {
        hint += " Focus on the challenges or drawbacks discussed.";
    } else {
        hint += " Review the main ideas and try to relate them to the question.";
    }

    return hint;
}

// Function to extract key phrases from content
function extractKeyPhrases(content) {
    const sentences = content.split('\n').map(sentence => sentence.trim()).filter(Boolean);

    
    const keyPhrases = [];

    sentences.forEach(sentence => {
        // Extract sentences that contain important keywords or punctuation
        if (sentence.includes('define') || sentence.includes('means') || sentence.includes(':')) {
            keyPhrases.push(sentence.split(':')[0]);  // Take the part before the colon
        } else if (sentence.includes('step') || sentence.includes('process')) {
            keyPhrases.push(sentence);  // Add full step or process descriptions
        } else if (sentence.includes('because') || sentence.includes('due to')) {
            keyPhrases.push(sentence);  // Add sentences explaining reasons
        } else if (sentence.includes('example') || sentence.includes('such as')) {
            keyPhrases.push(sentence);  
        } else if (sentence.includes('advantage') || sentence.includes('benefit')) {
            keyPphrases.push(sentence);  // Capture advantages and benefits
        } else if (sentence.includes('disadvantage') || sentence.includes('limitation')) {
            keyPhrases.push(sentence);  // Capture disadvantages or limitations
        }
    });

    return keyPhrases.slice(0, 5);
}


function go_back() {

    document.querySelector(`.${courseID}`).querySelector('.task').style.display = "block";
    const hint_section = document.querySelector(`.${courseID}`).querySelector('.hint-content');
    hint_section.style.display = "none";
}

