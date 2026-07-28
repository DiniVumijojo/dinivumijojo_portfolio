/* =========================================================
   PROJECT DATA
   To add a project: copy one object below and edit the fields.
   - status: "deployed" | "progress" | "planned" (controls the badge colour)
   - github: link to the repo (use "#" if you don't have one yet)
   - doc: path to a PDF/report — put the file in a /documents folder
          next to this site and point to it, e.g. "documents/my-report.pdf"
========================================================= */
const projects = [
  {
    status: "progress",
    statusLabel: "in progress",
    title: "AI-Powered Security Log Analyzer",
    summary: "An AI-assisted tool for spotting anomalies and suspicious patterns in security logs.",
    description: "A tool that applies AI to security log analysis — flagging anomalies and suspicious patterns automatically rather than relying purely on manual review. Builds on the log-analysis and querying skills from the Azure monitoring lab, aimed at making threat detection faster and less manual. Still being built out — check back for the finished write-up and repo.",
    tags: ["AI", "Log Analysis", "Anomaly Detection", "Security"],
    github: "#",
    doc: "documents/ai-security-log-analyzer.pdf"
  },
  {
    status: "deployed",
    statusLabel: "complete",
    title: "AI Student Application Assistant",
    summary: "An AI-powered assistant that helps prospective students navigate the application process.",
    description: "An assistant that guides prospective students through the application process — answering common questions and helping them understand requirements, reducing back-and-forth with admin staff. Built to make a often confusing process feel guided and clear.",
    tags: ["AI", "Assistant", "Automation"],
    github: "#",
    doc: "documents/ai-student-application-assistant.pdf"
  },
  {
    status: "deployed",
    statusLabel: "complete",
    title: "AI-Enhanced Residence Management Platform",
    summary: "A residence management platform with AI features layered in for smarter automation.",
    description: "A platform for managing student residence operations — bookings, maintenance requests, and communication — with AI features layered in to automate routine admin tasks and surface what needs attention first.",
    tags: ["AI", "Automation", "Web App"],
    github: "#",
    doc: "documents/ai-residence-management-platform.pdf"
  },
  {
    status: "deployed",
    statusLabel: "lab complete",
    title: "Azure Cloud Security Monitoring Lab",
    summary: "End-to-end monitoring build on Azure — from VM provisioning to automated alerting.",
    description: "Built a monitored, hardened environment on Azure for Students: provisioned a VM, locked it down with NSG rules, then wired up Azure Monitor and Log Analytics to collect and query logs with KQL. Configured automated alert rules so suspicious activity gets flagged without manual checking. Documented the full build as a professional report, including troubleshooting notes on VM size availability under a student subscription.",
    tags: ["Azure", "NSG", "Log Analytics", "KQL", "Azure Monitor"],
    github: "#",
    doc: "documents/azure-cloud-security-monitoring-lab.pdf"
  },
  {
    status: "deployed",
    statusLabel: "lab complete",
    title: "Network Security Assessment Lab",
    summary: "A hands-on network security assessment — scanning, identifying weaknesses, and hardening.",
    description: "A hands-on assessment of a network's security posture — scanning for open ports and misconfigurations, identifying vulnerabilities, and documenting hardening recommendations to close the gaps found.",
    tags: ["Network Security", "Vulnerability Assessment", "Hardening"],
    github: "#",
    doc: "documents/network-security-assessment-lab.pdf"
  }
];

const statusClassMap = {
  deployed: "project-status--deployed",
  progress: "project-status--progress",
  planned: "project-status--planned"
};

/* =========================================================
   RENDER PROJECT CARDS
========================================================= */
const grid = document.getElementById("projectGrid");

projects.forEach((project, index) => {
  const card = document.createElement("button");
  card.className = "project-card";
  card.type = "button";
  card.setAttribute("aria-haspopup", "dialog");

  card.innerHTML = `
    <span class="project-status ${statusClassMap[project.status]}">${project.statusLabel}</span>
    <h3>${project.title}</h3>
    <p>${project.summary}</p>
    <div class="project-tags">
      ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <span class="project-open">open case file →</span>
  `;

  card.addEventListener("click", () => openModal(index));
  grid.appendChild(card);
});

/* =========================================================
   MODAL LOGIC
========================================================= */
const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalGithub = document.getElementById("modalGithub");
const modalDoc = document.getElementById("modalDoc");
const modalClose = document.getElementById("modalClose");

let lastFocusedCard = null;

function openModal(index){
  const project = projects[index];
  modalStatus.textContent = project.statusLabel;
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.description;
  modalTags.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
  modalGithub.href = project.github;
  modalDoc.href = project.doc;

  lastFocusedCard = document.activeElement;
  modalBackdrop.classList.add("is-open");
  modalClose.focus();
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modalBackdrop.classList.remove("is-open");
  document.body.style.overflow = "";
  if (lastFocusedCard) lastFocusedCard.focus();
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalBackdrop.classList.contains("is-open")) closeModal();
});

/* =========================================================
   MOBILE NAV TOGGLE
========================================================= */
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   FOOTER YEAR
========================================================= */
document.getElementById("deployYear").textContent = new Date().getFullYear();
