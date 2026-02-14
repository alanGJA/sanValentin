// ===============================
// ⏳ DESBLOQUEO + CONTADOR
// Zona horaria: Monterey, California
// ===============================

// Fecha objetivo: 14 Febrero 00:00 (California)
const unlockDate = new Date("2026-02-14T00:00:00-08:00");



// Obtener hora actual en California
function getCaliforniaNow() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles", // ✅ California
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  let obj = {};

  parts.forEach((p) => {
    if (p.type !== "literal") obj[p.type] = p.value;
  });

  return new Date(
    `${obj.year}-${obj.month}-${obj.day}T${obj.hour}:${obj.minute}:${obj.second}`
  );
}

// Actualizar contador y desbloquear
function updateCountdown() {
  const now = getCaliforniaNow();

  const lockScreen = document.getElementById("lockScreen");
  const container = document.querySelector(".container");
  const countdownText = document.getElementById("countdown");

  const diff = unlockDate - now;

  if (diff <= 0) {
    // ✅ Ya es hora → desbloquear
    lockScreen.style.display = "none";
    container.style.visibility = "visible";

    resolveFetch().then(animationTimeline);

    clearInterval(timer);
    return;
  }

  // ⏳ Tiempo restante
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownText.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// ===============================
// 🎬 ANIMACIÓN ORIGINAL
// ===============================

const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const tl = new TimelineMax();

  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 });

  // Replay
  const replyBtn = document.getElementById("replay");
  replyBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// ===============================
// 📦 Cargar customize.json
// ===============================

const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .getElementById(customData)
              .setAttribute("src", data[customData]);
          } else {
            document.getElementById(customData).innerText = data[customData];
          }
        }
      });
    });
};

const resolveFetch = () => {
  return new Promise((resolve) => {
    fetchData();
    resolve("Fetch done!");
  });
};

// ===============================
// 🚀 Ejecutar contador
// ===============================

const timer = setInterval(updateCountdown, 1000);
updateCountdown();
