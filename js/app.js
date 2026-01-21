async function loadRobots() {
  const response = await fetch("data/robots.json");
  return response.json();
}

// PAGE 1
async function loadRobotList() {
  const robots = await loadRobots();
  const table = document.getElementById("robotTable");

  robots.forEach(robot => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${robot.id}</td>
      <td>${robot.status}</td>
      <td class="${robot.uatResult === "Passed" ? "badge-pass" : "badge-fail"}">
        ${robot.uatResult}
      </td>
      <td>${robot.uatCompletedDate}</td>
    `;
    row.onclick = () => {
      localStorage.setItem("selectedRobot", robot.id);
      window.location.href = "pages/uat-summary.html";
    };
    table.appendChild(row);
  });
}

// PAGE 2
async function loadUATSummary() {
  const robots = await loadRobots();
  const robotId = localStorage.getItem("selectedRobot");
  const robot = robots.find(r => r.id === robotId);

  document.getElementById("robotName").innerText = robot.id;
  document.getElementById("summary").innerHTML = `
    <p><b>Tests Passed:</b> ${robot.testsPassed}</p>
    <p><b>Tests Failed:</b> ${robot.testsFailed}</p>
    <p><b>Conclusion:</b> ${robot.conclusion}</p>
    <p><b>Commencement Date:</b> ${robot.dates.commencement}</p>
    <p><b>Software Checklist Received:</b> ${robot.dates.softwareChecklist}</p>
    <p><b>Production Checklist Received:</b> ${robot.dates.productionChecklist}</p>
    <p><b>Materials Received:</b> ${robot.dates.materialsReceived}</p>
    <p><b>Materials:</b> ${robot.dates.materials}</p>
    <p><b>UAT Start:</b> ${robot.dates.uatStart}</p>
    <p><b>UAT End:</b> ${robot.dates.uatEnd}</p>
  `;
}

// PAGE 3
async function loadTimeline() {
  const robots = await loadRobots();
  const robotId = localStorage.getItem("selectedRobot");
  const robot = robots.find(r => r.id === robotId);

  const list = document.getElementById("timeline");
  robot.timeline.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.emailDate} – ${item.step}`;
    list.appendChild(li);
  });
}
