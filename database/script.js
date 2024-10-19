const modules = {
    module1: {
        title: "Introduction to Databases and Cybersecurity",
        sections: {
            "What is a Database?": `
                A database is an organized collection of data, generally stored and accessed electronically. 
                Databases are managed by Database Management Systems (DBMS).
                <br><br>
                <strong>Advantages of a Database:</strong>
                <ul>
                    <li>Data consistency and integrity</li>
                    <li>Efficient data retrieval</li>
                    <li>Centralized management of data</li>
                    <li>Reduced data redundancy</li>
                </ul>
                <br>
                <strong>Quiz:</strong> 
                What is a key advantage of using a database?<br><br>
                <button class="option" onclick="checkAnswer('correct')">A) Data consistency</button>
                <button class="option" onclick="checkAnswer('incorrect')">B) Data loss</button>
                <button class="option" onclick="checkAnswer('incorrect')">C) Data duplication</button>
            `,
            "Types of Databases (Relational, NoSQL, etc.)": `
            There are different types of databases:
            <ul>
                <li><strong>Relational Databases:</strong> MySQL, PostgreSQL</li>
                <li><strong>NoSQL Databases:</strong> MongoDB, Cassandra</li>
            </ul>
            <br>
            <strong>Quiz:</strong>
            Which is an example of a NoSQL database?<br><br>
            <button class="option" onclick="checkAnswer('incorrect', 'Types of Databases')">A) MySQL</button>
            <button class="option" onclick="checkAnswer('correct', 'Types of Databases')">B) MongoDB</button>
            <button class="option" onclick="checkAnswer('incorrect', 'Types of Databases')">C) PostgreSQL</button>
        `,
           "Introduction to Cybersecurity Principles": `
                Cybersecurity protects data and systems from attacks.
                <ul>
                    <li><strong>Confidentiality:</strong> Data access restricted to authorized users.</li>
                    <li><strong>Integrity:</strong> Data accuracy and consistency.</li>
                    <li><strong>Availability:</strong> Data accessible when needed.</li>
                </ul>
                <br>
                <strong>Quiz:</strong>
                What is the principle of ensuring data is only accessible to authorized users?<br><br>
                <button class="option" onclick="checkAnswer('correct', 'Introduction to Cybersecurity Principles')">A) Confidentiality</button>
                <button class="option" onclick="checkAnswer('incorrect', 'Introduction to Cybersecurity Principles')">B) Integrity</button>
                <button class="option" onclick="checkAnswer('incorrect', 'Introduction to Cybersecurity Principles')">C) Availability</button>
            `,
            "Quiz Section": `
            <h2>Quiz</h2>
            <div id="quizTimer">Time Remaining: <span id="time">5:00</span></div>
            <div id="quizContent"></div>
            <button onclick="submitQuiz()">Submit Quiz</button>
        `
        }
    },
    module2: {
        title: "Database Management Systems",
        sections: {
            "Overview of DBMS": "A Database Management System (DBMS) is software that interacts with end users, applications, and the database itself to capture and analyze data.",
            "User Roles and Permissions": "DBMS provides various user roles and permissions to ensure that only authorized users can access or modify the data."
        }
    },
    module3: {
        title: "Common Database Vulnerabilities",
        sections: {
            "SQL Injection Attacks": "SQL injection is a code injection technique that attackers use to exploit vulnerabilities in an application's software by manipulating SQL queries.",
            "Unauthorized Access": "Unauthorized access occurs when an individual gains access to a database without permission, leading to potential data breaches."
        }
    },
    module4: {
        title: "Securing Databases",
        sections: {
            "Encryption Techniques": "Encryption techniques are methods used to secure data by converting it into a format that can only be read by someone with the decryption key.",
            "Regular Security Audits": "Regular security audits help identify vulnerabilities in database security and ensure compliance with security policies."
        }
    },
    module5: {
        title: "Data Privacy Regulations and Compliance",
        sections: {
            "Overview of GDPR": "The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy in the European Union and the European Economic Area.",
            "Consequences of Non-compliance": "Non-compliance with data privacy regulations can result in significant fines and damage to an organization's reputation."
        }
    }
};

document.querySelectorAll('.circle').forEach(module => {
    module.addEventListener('click', () => {
        const moduleId = module.parentElement.id; // Get the parent module ID
        const moduleInfo = modules[moduleId];

        document.getElementById('module-header').innerText = moduleInfo.title;
        const sectionsDiv = document.getElementById('sections');
        sectionsDiv.innerHTML = ''; // Clear previous sections

        for (let section in moduleInfo.sections) {
            const sectionElement = document.createElement('div');
            sectionElement.classList.add('section');
            sectionElement.innerText = section;
            sectionElement.addEventListener('click', () => {
                const contentDiv = document.createElement('div');
                contentDiv.innerHTML = moduleInfo.sections[section]; // Updated to use innerHTML
                contentDiv.classList.add('section-content');
                
                // Clear previous content
                sectionsDiv.innerHTML = '';
                sectionsDiv.appendChild(contentDiv);
            });
            sectionsDiv.appendChild(sectionElement);
        }

        document.querySelector('.modules').style.display = 'none'; // Hide modules
        document.getElementById('module-content').style.display = 'block'; // Show module content
    });
});

document.getElementById('back-button').addEventListener('click', () => {
    document.getElementById('module-content').style.display = 'none'; // Hide module content
    document.querySelector('.modules').style.display = 'flex'; // Show modules
});

function checkAnswer(answer) {
    const messageDiv = document.createElement('div');
    const sectionsDiv = document.getElementById('sections');
    
    if (answer === 'correct') {
        messageDiv.innerHTML = "<p style='color: green; font-size: 20px;'>Correct! ❤️</p>";
    } else {
        messageDiv.innerHTML = "<p style='color: red; font-size: 20px;'>Incorrect. Try again.</p>";
    }

    sectionsDiv.appendChild(messageDiv);
}
function startQuiz() {
    const quizDiv = document.getElementById('quizContent');
    quizDiv.innerHTML = ''; // Clear previous content
    quizScore = 0; // Reset quiz score
    currentQuestionIndex = 0; // Reset question index
    startTimer(); // Start the timer
    loadQuestion(); // Load the first question
}

// Function to load a question
function loadQuestion() {
    const questions = [
        {
            question: "What does DBMS stand for?",
            answers: ["A) Database Management System", "B) Data Base Management Software", "C) Data Base Management System"],
            correctAnswer: "A) Database Management System"
        },
        {
            question: "Which of these is a relational database?",
            answers: ["A) MongoDB", "B) MySQL", "C) Redis"],
            correctAnswer: "B) MySQL"
        },
        {
            question: "What is the main function of a database?",
            answers: ["A) Store Data", "B) Analyze Data", "C) Visualize Data"],
            correctAnswer: "A) Store Data"
        },
        {
            question: "What principle ensures data is accurate?",
            answers: ["A) Availability", "B) Integrity", "C) Confidentiality"],
            correctAnswer: "B) Integrity"
        },
        {
            question: "What is a primary key?",
            answers: ["A) A unique identifier for a record", "B) A foreign key", "C) A type of database"],
            correctAnswer: "A) A unique identifier for a record"
        },
        {
            question: "Which of these is an example of NoSQL?",
            answers: ["A) PostgreSQL", "B) MongoDB", "C) Oracle"],
            correctAnswer: "B) MongoDB"
        },
        {
            question: "What is SQL?",
            answers: ["A) A query language", "B) A type of database", "C) A programming language"],
            correctAnswer: "A) A query language"
        },
        {
            question: "What does a firewall do?",
            answers: ["A) Protects against unauthorized access", "B) Enhances database speed", "C) Increases data integrity"],
            correctAnswer: "A) Protects against unauthorized access"
        },
        {
            question: "Which type of database is suitable for large volumes of unstructured data?",
            answers: ["A) Relational", "B) Document-oriented", "C) Data warehouse"],
            correctAnswer: "B) Document-oriented"
        },
        {
            question: "What is a data breach?",
            answers: ["A) Loss of data", "B) Unauthorized access to data", "C) Data corruption"],
            correctAnswer: "B) Unauthorized access to data"
        },
    ];

    if (currentQuestionIndex < questions.length) {
        const questionDiv = document.createElement('div');
        const currentQuestion = questions[currentQuestionIndex];
        questionDiv.innerHTML = `
            <h3>${currentQuestion.question}</h3>
            ${currentQuestion.answers.map(answer => `<button class="option" onclick="checkQuizAnswer('${answer}', '${currentQuestion.correctAnswer}')">${answer}</button>`).join('')}
        `;
        const quizDiv = document.getElementById('quizContent');
        quizDiv.innerHTML = ''; // Clear previous question
        quizDiv.appendChild(questionDiv);
    } else {
        endQuiz();
    }
}

// Function to check the quiz answer
function checkQuizAnswer(answer, correctAnswer) {
    const messageDiv = document.createElement('div');
    const quizDiv = document.getElementById('quizContent');

    if (answer === correctAnswer) {
        messageDiv.innerHTML = `<p style='color: green;'>Correct! ❤️</p>`;
        quizScore++; // Increment score
    } else {
        messageDiv.innerHTML = `<p style='color: red;'>Incorrect. 💔</p>`;
        hearts--; // Reduce heart
    }
    
    updateHearts(); // Update heart display
    quizDiv.appendChild(messageDiv);
    
    currentQuestionIndex++; // Move to the next question
    loadQuestion(); // Load next question
}

// Function to start the timer
function startTimer() {
    let time = 300; // 5 minutes in seconds
    timer = setInterval(() => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('time').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        time--;

        if (time < 0) {
            clearInterval(timer);
            endQuiz(); // End quiz when timer runs out
        }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    const quizDiv = document.getElementById('quizContent');
    quizDiv.innerHTML = `<h3>Quiz Over!</h3><p>Your score: ${quizScore} out of ${totalQuestions}</p>`;
    
    // Check if user passed
    if (quizScore >= totalQuestions / 2) {
        quizDiv.innerHTML += "<p>You can proceed to Module 2!</p>";
    } else {
        quizDiv.innerHTML += "<p>You need to improve your score to proceed.</p>";
    }
}

// Initialize heart display when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateHearts();
});
