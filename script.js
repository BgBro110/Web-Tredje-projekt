
const params = new URLSearchParams(window.location.search);
const numberOfTeams = Number(params.get("teams")) || 1;

const teamsContainer = document.getElementById("teams");

const questions = {
    "Brainrot": {
        "100": {
            question: "Hvem er dette på billedet?",
            answer: "Tung Tung Tung Sahur",
            image: "img/3t.png"
        },
        "200": {
            question: "Hvem er dette på billedet?",
            answer: "Tralalero Tralala",
            image: "img/tralalero.png"
        },
        "300": {
            question: "Hvem er dette på billedet?",
            answer: "Bombardino Crocodilo",
            image: "img/bombardino.png"
        },
        "400": {
            question: "Hvem er dette på billedet?",
            answer: "Bombombini Gusini",
            image: "img/bombombini.png"
        },
        "500": {
            question: "Hvem er dette på billedet?",
            answer: "Garamaraman dan Madudungdung tak tuntung perkuntung",
            image: "img/garamaraman.png"
        }
    },
    "Memes": {
        "100": {
            question: "Hvad hedder dette meme?",
            answer: "This is fine",
            image: "img/this-is-fine.png"
        },
        "200": {
            question: "Hvad hedder dette meme?",
            answer: "Pepe the frog",
            image: "img/pepe.png"
        },
        "300": {
            question: "Hvad hedder dette meme?",
            answer: "The rock eyebrow meme",
            image: "img/rock.png"
        },
        "400": {
            question: "Hvad hedder dette meme?",
            answer: "HeHe Boi",
            image: "img/hehe-boi.png"
        },
        "500": {
            question: "Hvad hedder dette meme?",
            answer: "Okay",
            image: "img/okay.png"
        }
    },
    "Games": {
        "100": {
            question: "Hvad hedder det grønne monster i Minecraft, som eksploderer, når det kommer tæt på dig?",
            answer: "Creeper",
            image: null
        },
        "200": {
            question: "Hvad hedder den populære Fortnite token som alle leder efter lige nu?",
            answer: "Pirate token",
            image: null
        },
        "300": {
            question: "Hvad hedder de tre hovedpersoner, man kan spille som i GTA 5?",
            answer: "Michael, Franklin og Trevor",
            image: null
        },
        "400": {
            question: "Hvad hedder hovedpersonen i GTA 5, som er tidligere bankrøver og bor i Los Santos?",
            answer: "Michael De Santa",
            image: null
        },
        "500": {
            question: "Før deepslate updaten i Minecraft hvilket lag var så bedst at finde diamonds på?",
            answer: "Lag 11",
            image: null
        }
    },
    "Movies": {
        "100": {
            question: "Hvad hedder denne film?",
            answer: "Titanic",
            image: "img/titanic.png"
        },
        "500": {
            question: "Hvad hedder denne film?",
            answer: "The Hobbit: The Desolation of Smaug",
            image: "img/hobbit.png"
        },
        "200": {
            question: "Hvad hedder denne film?",
            answer: "Pulp Fiction",
            image: "img/pulp-fiction.png"
        },
        "400": {
            question: "Hvad hedder denne film?",
            answer: "Forrest Gump",
            image: "img/forrest-gump.png"
        },
        "300": {
            question: "Hvad hedder denne film?",
            answer: "The Hunchback of Notre Dame eller Klokkerne fra Notre Dame",
            image: "img/hunch-back.png"
        }
    },
    "Songs": {
        "100": {
            question: "Hvilken artist står bag sangen Shape of You?",
            answer: "Ed Sheeran",
            image: null
        },
        "200": {
            question: "Hvilket band står bag sangen Bohemian Rhapsody?",
            answer: "Queen",
            image: null
        },
        "300": {
            question: "Hvad hedder den danske sanger, der har lavet sangen 7 Years?",
            answer: "Lukas Graham",
            image: null
        },
        "400": {
            question: "Hvad er den mest streamede sang nogensinde på Spotify?",
            answer: "Blinding Lights af The Weeknd",
            image: null
        },
        "500": {
            question: "Hvilken artist har vundet flest Grammy Awards gennem tiden?",
            answer: "Beyoncé",
            image: null
        }
    }
};

const questionDialog = document.getElementById("question-dialog");
const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const questionImage = document.getElementById("question-image");
const questionAnswer = document.getElementById("question-answer");
const cells = document.querySelectorAll(".cell");
const continueButton = document.getElementById("continue-button");
const revealButton = document.getElementById("reveal-button");
let currentQuestionValue = 0;

const gameMessage = document.getElementById("game-message");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const category = cell.dataset.category;
        const value = cell.dataset.value;
        const selectedQuestion = questions[category][value];
        currentQuestionValue = Number(value);
        cell.disabled = true; // Disable the clicked cell

        questionCategory.textContent = category;
        questionText.textContent = selectedQuestion.question;
        questionAnswer.textContent = selectedQuestion.answer;
        questionAnswer.style.display = "none"; // Hide the answer

        if (selectedQuestion.image) {
            questionImage.src = selectedQuestion.image;
            questionImage.style.display = "block";
        } else {
            questionImage.removeAttribute("src");
            questionImage.style.display = "none";
        }
        questionDialog.show();
        revealButton.focus();
    });
});

continueButton.addEventListener("click", () => {
    questionDialog.close();
});

revealButton.addEventListener("click", () => {
    questionAnswer.style.display = "block";
});

document.addEventListener("keydown", (event) => {
    if (questionDialog.open && event.key === "Escape") {
        event.preventDefault();
        questionDialog.close();
    }
    else if (questionDialog.open && event.code === "Space" && !event.repeat && !(event.target instanceof HTMLButtonElement)) {
        event.preventDefault();
        questionAnswer.style.display = "block";
    }
});



for (let i = 1; i <= numberOfTeams; i++) {
    const team = document.createElement("div");
    team.classList.add("team");

    team.innerHTML = `
        <div class="team-name">Team ${i}</div>
        <div class="score">0</div>
        <div class="buttons">
            <button type="button">+</button>
            <button type="button">-</button>
        </div>
    `;

    const scoreDisplay = team.querySelector(".score");
    const addButton = team.querySelector(".buttons button:first-child");
    const subtractButton = team.querySelector(".buttons button:last-child");

    addButton.addEventListener("click", () => {
        scoreDisplay.textContent = Number(scoreDisplay.textContent) + currentQuestionValue;
    });

    subtractButton.addEventListener("click", () => {
        scoreDisplay.textContent = Number(scoreDisplay.textContent) - currentQuestionValue;
    });

    teamsContainer.appendChild(team);
}

function checkForGameOver() {
    if (document.querySelector(".cell:not(:disabled)")) {
        return;
    }

    const teams = teamsContainer.querySelectorAll(".team");
    let highestScore = -Infinity;
    let winners = [];

    teams.forEach(team => {
        const name = team.querySelector(".team-name").textContent;
        const score = Number(team.querySelector(".score").textContent);

        if (score > highestScore) {
            highestScore = score;
            winners = [name];
        } else if (score === highestScore) {
            winners.push(name);
        }
    });

    if (winners.length === 1) {
        gameMessage.textContent = `${winners[0]} wins with ${highestScore} points!`;
    } else {
        gameMessage.textContent = `It's a tie between ${winners.join(" and ")} with ${highestScore} points!`;
    }
}
questionDialog.addEventListener("close", checkForGameOver);
