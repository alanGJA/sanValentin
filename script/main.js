// ==============================
// 🔥 CONFIGURACIÓN
// ==============================

// ✅ Cambia esto a false cuando lo subas final
const DEBUG_MODE = true;

// Fecha real de desbloqueo (California)
const unlockDate = new Date("2026-02-14T00:00:00");


// ==============================
// 🎬 ANIMACIÓN PRINCIPAL
// ==============================

const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span>`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })

    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")

    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")

    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })

    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)

    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)",
    })

    .to(".four", 0.5, {
      scale: 0.2,
      opacity: 0,
      y: -150,
    }, "+=0.7")

    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-5", 0.7, {
      rotationX: 15,
      rotationZ: -10,
      skewY: "-5deg",
      y: 50,
      opacity: 0,
    }, "+=0.5")

    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=0.4")

    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")

    .staggerFrom(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: 15,
      ease: Expo.easeOut,
    }, 0.2)

    .staggerTo(".idea-6 span", 0.8, {
      scale: 3,
      opacity: 0,
      rotation: -15,
      ease: Expo.easeOut,
    }, 0.2, "+=1")

    .staggerFromTo(".baloons img", 2.5,
      { opacity: 0.9, y: 1400 },
      { opacity: 1, y: -1000 },
      0.2
    )

    .from(".girl-dp", 0.5, {
      scale: 3.5,
      opacity: 0,
      x: 25,
      y: -25,
      rotationZ: -45,
    }, "-=2")

    .staggerFrom(".wish-hbd span", 0.7, {
      opacity: 0,
      y: -50,
      rotation: 150,
      skewX: "30deg",
      ease: Elastic.easeOut.config(1, 0.5),
    }, 0.1)

    .from(".wish h5", 0.5, {
      opacity: 0,
      y: 10,
      skewX: "-15deg",
    })

    .staggerTo(".eight svg", 1.5, {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4,
    }, 0.3)

    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })

    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)

    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  // Replay
  document.getElementById("replay").addEventListener("click", () => {
    tl.restart();
  });
};


// ==============================
// 🎨 CUSTOM DATA
// ==============================

const fetchData = () => {
  fetch("customize.json")
    .then((data) => data.json())
    .then((data) => {
      Object.keys(data).forEach((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document.getElementById(customData).src = data[customData];
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
    resolve();
  });
};


// ==============================
// 🔒 BLOQUEO POR FECHA
// ==============================

function startValentine() {
  document.getElementById("lockScreen").style.display = "none";
  document.querySelector(".container").style.visibility = "visible";

  resolveFetch().then(animationTimeline);
}

function checkUnlock() {
  const now = new Date();
  const diff = unlockDate - now;

  const countdown = document.getElementById("countdown");

  if (diff <= 0) {
    startValentine();
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerText =
    `Se desbloquea en ${hours}h ${minutes}m ${seconds}s`;
}


// ==============================
// 🚀 INICIO
// ==============================

if (DEBUG_MODE) {
  // 🔥 VERLO YA MISMO
  startValentine();
} else {
  // 🔒 MODO REAL (14 Feb)
  setInterval(checkUnlock, 1000);
  checkUnlock();
}
