
const params = new URLSearchParams(window.location.search);
const numberOfTeams = Number(params.get("teams")) || 1;

const teamsContainer = document.getElementById("teams");

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

    teamsContainer.appendChild(team);
}
