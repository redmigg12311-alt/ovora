/* ============ EDIT YOUR CONTENT HERE ============ */
const CONFIG = {
    friendName: "Janvi",
    yourName: "Harit",
    sharedMemory:
        "The longest running inside joke in history. Nobody remembers how it started. Nobody is allowed to stop it.",
    /* Optional: paste real photo URLs (https:// links or data: URIs) to replace the emoji placeholders.
   Leave any entry as "" to keep the emoji. */
    photos: {
        curtain: "",
        timeline: ["", "", "", "", ""],
        cleanup: ["https://i.ibb.co/b55CCvjg/97455524-f734-4117-8cb2-0ce472e327ed.webp",
            "https://i.ibb.co/Xfg4zV1H/2-E12-C8-F0-378-F-4-BB4-8040-FD445712-B42-A.webp",
            "https://i.ibb.co/8nrHtGCx/d071281c-6bd8-4903-b000-cb9b4ad58053.webp",
            "https://i.ibb.co/49sgWZ7/f096ff1a-4c45-456d-bf86-0c7f3af9cb86.webp",
            "https://i.ibb.co/SX6NYj5t/03dee96b-ecbf-4b03-86e7-396908aa488e.webp"],
    },
    /* Optional: edit these to your own "guess my pick" rounds. mine = 'a' or 'b', whichever you'd actually choose. */
    quizPairs: null,
    emailjs: {
        serviceId: "service_8jfmhk9",
        templateId: "template_9vsuit4",
        publicKey: "LhqUFNTgKsXFNNx0q",
        toEmail: "ultrawebs.2024@gmail.com",
    },
};
/* ================================================== */
if (CONFIG.emailjs && CONFIG.emailjs.publicKey && window.emailjs) {
    emailjs.init({ publicKey: CONFIG.emailjs.publicKey });
}

document.querySelectorAll("[data-bind]").forEach(function (el) {
    const key = el.getAttribute("data-bind");
    if (CONFIG[key]) el.textContent = CONFIG[key];
});

/* ---------- optional real-photo swap ---------- */
function setPhoto(el, url) {
    if (!el || !url) return;
    el.style.backgroundImage = "url('" + url + "')";
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.textContent = "";
}
if (CONFIG.photos) {
    setPhoto(
        document.getElementById("curtainPhotoEl"),
        CONFIG.photos.curtain,
    );
    (CONFIG.photos.timeline || []).forEach(function (url, i) {
        setPhoto(document.getElementById("tlPhoto" + i), url);
    });
}

/* ---------- audio & haptics ---------- */
let soundOn = true;
let actx = null;
function ctx() {
    if (!actx)
        actx = new (window.AudioContext || window.webkitAudioContext)();
    return actx;
}
function tone(freq, dur, type, vol, delay, glideTo) {
    type = type || "sine";
    vol = vol === undefined ? 0.16 : vol;
    delay = delay || 0;
    if (!soundOn) return;
    const c = ctx();
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo)
        osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
}
function vibe(pattern) {
    if (soundOn && navigator.vibrate) navigator.vibrate(pattern);
}
function sClick() {
    tone(560, 0.06, "square", 0.1);
    vibe(12);
}
function sOpen() {
    tone(300, 0.35, "sine", 0.14, 0, 900);
    vibe([15, 40, 15]);
}
function sPop() {
    tone(700, 0.09, "triangle", 0.15);
    vibe(20);
}
function sSuccess() {
    [523, 659, 784, 1046].forEach(function (f, i) {
        tone(f, 0.18, "sine", 0.12, i * 0.09);
    });
    vibe([10, 30, 10, 30, 10]);
}
function sThud() {
    tone(90, 0.22, "square", 0.18);
    vibe(40);
}
function sSweep() {
    tone(220, 0.5, "sawtooth", 0.09, 0, 60);
}
function sTick() {
    tone(880, 0.04, "square", 0.07);
    vibe(6);
}
function sTypeKey() {
    tone(1500, 0.018, "square", 0.05, 0, 850);
    tone(230, 0.05, "sine", 0.075, 0.004);
    vibe(4);
}
function sCheckPop() {
    tone(700, 0.05, "sine", 0.12);
    tone(1100, 0.09, "sine", 0.13, 0.05);
    vibe([8, 20, 14]);
}
function sSwipe() {
    tone(400, 0.12, "sine", 0.1, 0, 650);
    vibe(10);
}
function sKeyTurn() {
    tone(880, 0.08, "square", 0.13);
    tone(660, 0.09, "square", 0.11, 0.09);
    vibe([10, 25]);
}
function sDoorCreak() {
    tone(160, 0.6, "sawtooth", 0.11, 0, 90);
    vibe([15, 10, 15, 10, 35]);
}
function sZoomWhoosh() {
    tone(220, 0.75, "sine", 0.13, 0, 1000);
    vibe([25, 20, 45]);
}

document.getElementById("soundToggle").onclick = function () {
    soundOn = !soundOn;
    this.innerHTML =
        '<span class="micon" style="font-size:18px;">' +
        (soundOn ? "volume_up" : "volume_off") +
        "</span>";
    if (soundOn) sClick();
};
document.getElementById("gbInput").addEventListener("input", function () {
    document.getElementById("gbCount").textContent = this.value.length;
    this.style.borderColor = "var(--ink)";
});

/* ---------- navigation ---------- */
const order = [
    "sDoor",
    "s0",
    "s1",
    "s2",
    "sStats",
    "sQuiz",
    "sTimeline",
    "sCleanup",
    "sPress",
    "sDiag",
    "sResult",
    "sTrans",
    "sLetter",
    "sSearch",
    "sAgreement",
    "sSong",
    "sGuestbook",
    "sFinale",
];
let hist = ["s0"];

function bgFor(id) {
    return document.getElementById(id).getAttribute("data-bg");
}
function applyBg(id) {
    const phone = document.getElementById("phone");
    const map = {
        pink: "#FFC2DA",
        amber: "#F5B93B",
        cream: "#F3EEDE",
        lilac: "#C9AEF2",
        mint: "#43D2A6",
        teal: "var(--teal)",
        dark: "linear-gradient(160deg,#241a35,#2e2650)",
        finale: "linear-gradient(160deg,#C9AEF2,#FFC2DA)",
    };
    phone.style.background = map[bgFor(id)] || "#F3EEDE";
}
function updateProgress(id) {
    const idx = order.indexOf(id);
    const pct = idx < 0 ? 0 : Math.round(((idx + 1) / order.length) * 100);
    document.getElementById("progressFill").style.width = pct + "%";
}
function goTo(id, push) {
    push = push === undefined ? true : push;
    sClick();
    const wasLetter = document
        .getElementById("sLetter")
        .classList.contains("active");
    if (wasLetter && id !== "sLetter") {
        letterTypingToken++;
    }
    document.querySelectorAll(".screen").forEach(function (s) {
        s.classList.remove("active");
    });
    const target = document.getElementById(id);
    target.classList.add("active");
    target.classList.remove("revealed");
    void target.offsetWidth;
    target.classList.add("revealed");
    applyBg(id);
    updateProgress(id);
    if (push) hist.push(id);
    document
        .getElementById("backBtn")
        .classList.toggle("show", hist.length > 1);
    runScreenLogic(id);
}
document.getElementById("backBtn").onclick = function () {
    if (hist.length > 1) {
        hist.pop();
        const prev = hist[hist.length - 1];
        goTo(prev, false);
    }
};

/* ---------- draggable key ---------- */
let keyDrag = null;
let keyDragUsed = false;
function keyPointerDown(e) {
    const keyWrap = document.getElementById("keyWrap");
    if (keyDragUsed || keyWrap.classList.contains("used")) return;
    const scene = document.getElementById("doorScene");
    const sceneRect = scene.getBoundingClientRect();
    const keyRect = keyWrap.getBoundingClientRect();
    const startLeft = keyRect.left - sceneRect.left;
    const startTop = keyRect.top - sceneRect.top;
    keyWrap.classList.remove("snapping", "returning");
    keyWrap.style.left = startLeft + "px";
    keyWrap.style.top = startTop + "px";
    keyWrap.style.bottom = "auto";
    keyWrap.style.transform = "none";
    keyWrap.classList.add("dragging");
    keyDrag = {
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        homeLeft: startLeft,
        homeTop: startTop,
    };
    keyWrap.setPointerCapture(e.pointerId);
    sClick();
    e.preventDefault();
}
function keyPointerMove(e) {
    if (!keyDrag || e.pointerId !== keyDrag.pointerId) return;
    const keyWrap = document.getElementById("keyWrap");
    const dx = e.clientX - keyDrag.startClientX;
    const dy = e.clientY - keyDrag.startClientY;
    keyWrap.style.left = keyDrag.homeLeft + dx + "px";
    keyWrap.style.top = keyDrag.homeTop + dy + "px";

    const lockEl = document.getElementById("doorLock");
    const lockRect = lockEl.getBoundingClientRect();
    const keyRect = keyWrap.getBoundingClientRect();
    const dist = Math.hypot(
        keyRect.left +
        keyRect.width / 2 -
        (lockRect.left + lockRect.width / 2),
        keyRect.top +
        keyRect.height / 2 -
        (lockRect.top + lockRect.height / 2),
    );
    lockEl.classList.toggle("hover-ready", dist < 60);
}
function keyPointerUp(e) {
    if (!keyDrag || e.pointerId !== keyDrag.pointerId) return;
    const keyWrap = document.getElementById("keyWrap");
    keyWrap.releasePointerCapture(e.pointerId);
    keyWrap.classList.remove("dragging");
    document.getElementById("doorLock").classList.remove("hover-ready");

    const scene = document.getElementById("doorScene");
    const sceneRect = scene.getBoundingClientRect();
    const lockRect = document
        .getElementById("doorLock")
        .getBoundingClientRect();
    const keyRect = keyWrap.getBoundingClientRect();
    const dist = Math.hypot(
        keyRect.left +
        keyRect.width / 2 -
        (lockRect.left + lockRect.width / 2),
        keyRect.top +
        keyRect.height / 2 -
        (lockRect.top + lockRect.height / 2),
    );

    if (dist < 60) {
        keyDragUsed = true;
        const targetLeft =
            lockRect.left -
            sceneRect.left +
            lockRect.width / 2 -
            keyWrap.offsetWidth / 2;
        const targetTop =
            lockRect.top -
            sceneRect.top +
            lockRect.height / 2 -
            keyWrap.offsetHeight / 2;
        keyWrap.classList.add("snapping");
        keyWrap.style.left = targetLeft + "px";
        keyWrap.style.top = targetTop + "px";
        sKeyTurn();
        setTimeout(function () {
            unlockDoorSequence();
        }, 240);
    } else {
        keyWrap.classList.add("returning");
        keyWrap.style.left = keyDrag.homeLeft + "px";
        keyWrap.style.top = keyDrag.homeTop + "px";
        sClick();
        setTimeout(function () {
            keyWrap.classList.remove("returning");
            keyWrap.style.left = "";
            keyWrap.style.top = "";
            keyWrap.style.bottom = "";
            keyWrap.style.transform = "";
        }, 420);
    }
    keyDrag = null;
}
function unlockDoorSequence() {
    const keyWrap = document.getElementById("keyWrap");
    keyWrap.classList.add("used");
    document.getElementById("doorLock").classList.add("unlocked");
    document
        .getElementById("doorLock")
        .querySelector(".micon").textContent = "lock_open";
    setTimeout(function () {
        sDoorCreak();
        document.getElementById("doorEl").classList.add("open");
        document.getElementById("doorGlow").classList.add("show");
    }, 260);
    setTimeout(function () {
        sZoomWhoosh();
        document.getElementById("doorZoomWrap").classList.add("zooming");
        document.getElementById("doorFlash").classList.add("show");
    }, 1300);
    setTimeout(function () {
        goTo("s0");
    }, 2200);
}
function initKeyDrag() {
    const keyWrap = document.getElementById("keyWrap");
    keyWrap.addEventListener("pointerdown", keyPointerDown);
    keyWrap.addEventListener("pointermove", keyPointerMove);
    keyWrap.addEventListener("pointerup", keyPointerUp);
    keyWrap.addEventListener("pointercancel", keyPointerUp);
}
initKeyDrag();

function openEnvelope() {
    sOpen();
    document.getElementById("phone").classList.add("opened");
    setTimeout(function () {
        goTo("s1");
    }, 550);
}

/* museum exhibits */
let exhibitsSeen = new Set();
const exhibitData = [
    {
        icon: "folder",
        color: "var(--pink)",
        title: "THE ARCHIVE",
        body: "247 unsent messages, 40 rants about nothing, and one deeply concerning theory about pigeons.",
    },
    {
        icon: "lock",
        color: "var(--mint)",
        title: "CLASSIFIED",
        body: "Every embarrassing secret you've ever told me. Filed, locked, never repeated. Mostly.",
    },
    {
        icon: "festival",
        color: "var(--lilac)",
        title: "THE CIRCUS",
        body: "A full highlight reel of plans that sounded genius at midnight and insane by morning.",
    },
    {
        icon: "trophy",
        color: "var(--amber)",
        title: "THE TROPHY CASE",
        body: CONFIG.sharedMemory,
    },
];
function tapExhibit(el, i) {
    const wasNew = !exhibitsSeen.has(i);
    if (wasNew) {
        el.classList.add("done");
        exhibitsSeen.add(i);
    }
    if (wasNew && exhibitsSeen.size >= 4) {
        document.getElementById("museumNext").classList.remove("disabled");
        sSuccess();
    } else {
        sPop();
    }
    openExhibitOverlay(i);
}
function openExhibitOverlay(i) {
    const item = exhibitData[i];
    const overlay = document.getElementById("exhibitOverlay");
    document.getElementById("eoIcon").innerHTML =
        '<span class="micon">' + item.icon + "</span>";
    document.getElementById("eoTitle").textContent = item.title;
    document.getElementById("eoBody").textContent = item.body;
    overlay.style.background = item.color;
    overlay.classList.add("show");
}
function closeExhibitOverlay() {
    document.getElementById("exhibitOverlay").classList.remove("show");
    sClick();
}

function openCurtain() {
    const box = document.getElementById("curtainBox");
    if (box.classList.contains("open")) return;
    sSweep();
    box.classList.add("open");
}

/* stats count-up */
let statsAnimated = false;
function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    document.querySelectorAll(".stat-num").forEach(function (el, idx) {
        const target = parseInt(el.getAttribute("data-target"), 10);
        const dur = 1100;
        const start = performance.now();
        function frame(now) {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if (p < 1) requestAnimationFrame(frame);
            else {
                el.textContent = target;
            }
        }
        setTimeout(function () {
            requestAnimationFrame(frame);
            sTick();
        }, idx * 140);
    });
}

/* timeline reveal */
let timelineAnimated = false;
function animateTimeline() {
    if (timelineAnimated) return;
    timelineAnimated = true;
    document.querySelectorAll(".tl-row").forEach(function (row, i) {
        setTimeout(
            function () {
                row.classList.add("show");
                sTick();
            },
            200 + i * 220,
        );
    });
}

/* this-or-that quiz */
const DEFAULT_QUIZ = [
    {
        aIcon: "local_pizza",
        a: "Pizza",
        bIcon: "lunch_dining",
        b: "Tacos",
        mine: "a",
        correctMsg: "Yes! Pizza, always.",
        wrongMsg: "Wrong. It's pizza. It's always been pizza.",
    },
    {
        aIcon: "beach_access",
        a: "Beach",
        bIcon: "landscape",
        b: "Mountains",
        mine: "b",
        correctMsg: "Correct — mountains, obviously.",
        wrongMsg: "Nope. Mountains. I contain multitudes.",
    },
    {
        aIcon: "wb_twilight",
        a: "Early bird",
        bIcon: "bedtime",
        b: "Night owl",
        mine: "b",
        correctMsg: "Duh. Night owl for life.",
        wrongMsg: "Absolutely not. I text you at 1am for a reason.",
    },
    {
        aIcon: "live_tv",
        a: "Movie night",
        bIcon: "celebration",
        b: "Going out",
        mine: "a",
        correctMsg: "Yes. Blanket, snacks, done.",
        wrongMsg: "Wrong — I peaked at movie-night energy.",
    },
    {
        aIcon: "pets",
        a: "Dogs",
        bIcon: "pets",
        b: "Cats",
        mine: "a",
        correctMsg: "Correct. Dog person, no debate.",
        wrongMsg: "Incorrect. Dogs. This is not up for discussion.",
    },
];
const quizPairs =
    CONFIG.quizPairs && CONFIG.quizPairs.length
        ? CONFIG.quizPairs
        : DEFAULT_QUIZ;
let quizIndex = 0;
let quizCorrect = 0;
function quizScoreLine(score, total) {
    const pct = score / total;
    if (pct === 1) return "You actually know me. Unsettling.";
    if (pct >= 0.6) return "Pretty solid. Impressive.";
    if (pct >= 0.3) return "...we should talk more.";
    return "Concerning. We need to hang out.";
}
function quizRender() {
    const p = quizPairs[quizIndex];
    document.getElementById("quizProgress").textContent =
        quizIndex + 1 + " / " + quizPairs.length;
    const pairEl = document.getElementById("quizPair");
    pairEl.innerHTML = "";
    ["a", "b"].forEach(function (side) {
        const d = document.createElement("div");
        d.className = "quiz-opt";
        d.dataset.side = side;
        const iconName = side === "a" ? p.aIcon : p.bIcon;
        const label = p[side];
        d.innerHTML =
            (iconName
                ? '<span class="micon" style="font-size:26px; display:block; margin-bottom:6px;">' +
                iconName +
                "</span>"
                : "") + label;
        d.onclick = function () {
            quizPick(side);
        };
        pairEl.appendChild(d);
    });
    const result = document.getElementById("quizResult");
    result.classList.remove("show");
    result.textContent = "";
}
function quizPick(side) {
    const p = quizPairs[quizIndex];
    const opts = document.querySelectorAll(".quiz-opt");
    opts.forEach(function (o) {
        o.classList.add("dim");
        o.onclick = null;
    });
    const chosen = document.querySelector(
        '.quiz-opt[data-side="' + side + '"]',
    );
    const isCorrect = side === p.mine;
    chosen.classList.remove("dim");
    chosen.classList.add(isCorrect ? "correct" : "wrong");
    const result = document.getElementById("quizResult");
    if (isCorrect) {
        quizCorrect++;
        result.textContent = p.correctMsg || "Yes! Called it.";
        sSuccess();
    } else {
        result.textContent =
            p.wrongMsg || "Nope — it's actually " + p[p.mine] + ".";
        sThud();
    }
    result.classList.add("show");
    setTimeout(function () {
        quizIndex++;
        if (quizIndex < quizPairs.length) {
            quizRender();
        } else {
            document.getElementById("quizScore").textContent =
                quizCorrect +
                " / " +
                quizPairs.length +
                " — " +
                quizScoreLine(quizCorrect, quizPairs.length);
            document.getElementById("quizNext").classList.remove("disabled");
        }
    }, 1200);
}

/* cleanup / delete-keep */
const cuData = [
    {
        icon: "bedtime",
        bg: "linear-gradient(160deg,#12294a,#1b3a63)",
        keepMsg: "That randomly planned walk in the park. Definitely keeping that one.",
        overruleMsg: "Nice try. Some things don't get deleted.",
    },
    {
        icon: "call",
        bg: "linear-gradient(160deg,#5a2a1e,#8a4630)",
        keepMsg: "A two-hour call that somehow lasted forever. Worth keeping.",
        overruleMsg: "Denied. That call is staying in the archive.",
    },
    {
        icon: "cake",
        bg: "linear-gradient(160deg,#7a2350,#b23e73)",
        keepMsg: "Another memory that's too sweet to let go.",
        overruleMsg: "Non-negotiable. You showed up exhausted anyway.",
    },
    {
        icon: "mood",
        bg: "linear-gradient(160deg,#7a5a12,#c99a2c)",
        keepMsg: "Makes absolutely no sense to anyone else. That's exactly why it belongs here.",
        overruleMsg: "Nice try. This one's too funny to disappear.",
    },
    {
        icon: "handshake",
        bg: "linear-gradient(160deg,#154a3c,#2a9678)",
        keepMsg: "It all started with \"Hii, Janvi here.\" Look where we are now.",
        overruleMsg: "Overruled. No chance I'm deleting where it all began.",
    },
];
let cuIndex = 0;
function cuRenderCard() {
    const photo = document.getElementById("cuPhoto");
    const item = cuData[cuIndex];
    const realPhoto =
        CONFIG.photos &&
        CONFIG.photos.cleanup &&
        CONFIG.photos.cleanup[cuIndex];
    photo.classList.remove("shake", "fly");
    photo.style.transform = "";
    photo.style.opacity = "";
    photo.style.boxShadow = "";
    if (realPhoto) {
        setPhoto(photo, realPhoto);
    } else {
        photo.style.backgroundImage = "";
        photo.style.background = item.bg;
        photo.innerHTML =
            '<span class="micon" style="font-size:60px; color:#fff;">' +
            item.icon +
            "</span>";
    }
    document.getElementById("cuCounter").textContent =
        cuIndex + 1 + " / " + cuData.length;
    document.getElementById("cuOverrule").classList.remove("show");
    document.getElementById("cuDelete").style.pointerEvents = "auto";
    document.getElementById("cuKeep").style.pointerEvents = "auto";
}
function cuChoose(action) {
    const photo = document.getElementById("cuPhoto");
    const overrule = document.getElementById("cuOverrule");
    document.getElementById("cuDelete").style.pointerEvents = "none";
    document.getElementById("cuKeep").style.pointerEvents = "none";
    const item = cuData[cuIndex];
    if (action === "delete") {
        sThud();
        photo.classList.add("shake");
        overrule.textContent = item.overruleMsg;
    } else {
        sSwipe();
        overrule.textContent = item.keepMsg;
    }
    overrule.classList.add("show");
    setTimeout(function () {
        if (action === "keep") {
            photo.classList.add("fly");
        }
        cuIndex++;
        if (cuIndex < cuData.length) {
            setTimeout(
                function () {
                    cuRenderCard();
                },
                action === "keep" ? 350 : 250,
            );
        } else {
            setTimeout(
                function () {
                    const btn = document.getElementById("cuNext");
                    btn.classList.remove("disabled");
                    photo.classList.remove("fly", "shake");
                    photo.style.transform = "";
                    photo.style.opacity = "";
                    photo.style.backgroundImage = "";
                    photo.innerHTML =
                        '<span class="micon" style="font-size:60px; color:#fff;">favorite</span>';
                    photo.style.background =
                        "linear-gradient(160deg,#F5B93B,#FF5B45)";
                    document.getElementById("cuCounter").textContent = "done";
                    overrule.textContent =
                        "Turns out we don't delete anything. Ever.";
                    sSuccess();
                },
                action === "keep" ? 350 : 250,
            );
        }
    }, 900);
}

/* swipe gesture for cleanup card */
let cuDrag = null;
function cuPointerDown(e) {
    if (document.getElementById("cuDelete").style.pointerEvents === "none")
        return;
    cuDrag = { startX: e.clientX, dragging: false };
    const photo = document.getElementById("cuPhoto");
    photo.setPointerCapture(e.pointerId);
}
function cuPointerMove(e) {
    if (!cuDrag) return;
    const dx = e.clientX - cuDrag.startX;
    if (!cuDrag.dragging && Math.abs(dx) < 6) return;
    cuDrag.dragging = true;
    const photo = document.getElementById("cuPhoto");
    photo.style.transition = "none";
    photo.style.transform =
        "translateX(" + dx + "px) rotate(" + dx / 18 + "deg)";
    const pct = Math.min(Math.abs(dx) / 110, 1);
    photo.style.boxShadow =
        dx > 0
            ? "0 0 0 5px rgba(67,210,166," + pct * 0.85 + ") inset"
            : "0 0 0 5px rgba(255,91,69," + pct * 0.85 + ") inset";
}
function cuPointerUp(e) {
    if (!cuDrag) return;
    const photo = document.getElementById("cuPhoto");
    const dx = e.clientX - cuDrag.startX;
    const wasDragging = cuDrag.dragging;
    cuDrag = null;
    photo.style.transition = "";
    photo.style.boxShadow = "";
    if (!wasDragging) return;
    photo.style.transform = "";
    if (Math.abs(dx) > 90) {
        cuChoose(dx > 0 ? "keep" : "delete");
    }
}
function initCuDrag() {
    const photo = document.getElementById("cuPhoto");
    photo.addEventListener("pointerdown", cuPointerDown);
    photo.addEventListener("pointermove", cuPointerMove);
    photo.addEventListener("pointerup", cuPointerUp);
    photo.addEventListener("pointercancel", cuPointerUp);
}
initCuDrag();

/* guestbook */
function showGuestbookError(msg) {
    const err = document.getElementById("gbError");
    err.textContent = msg;
    err.classList.add("show");
}
function hideGuestbookError() {
    document.getElementById("gbError").classList.remove("show");
}
function sealGuestbook() {
    const input = document.getElementById("gbInput");
    const text = input.value.trim();
    hideGuestbookError();
    if (!text) {
        input.style.borderColor = "var(--coral)";
        input.placeholder = "Type something first...";
        sThud();
        return;
    }
    const btn = document.getElementById("gbSealBtn");
    const label = document.getElementById("gbSealBtnLabel");
    if (btn.classList.contains("sending")) return;

    const ej = CONFIG.emailjs;
    if (
        !ej ||
        !ej.serviceId ||
        !ej.templateId ||
        !ej.publicKey ||
        !window.emailjs
    ) {
        showGuestbookError(
            "Email isn't set up yet — add your EmailJS Service ID, Template ID, and Public Key in CONFIG.emailjs near the top of the script.",
        );
        sThud();
        return;
    }

    btn.classList.add("sending");
    label.textContent = "SENDING…";
    sTick();

    emailjs
        .send(ej.serviceId, ej.templateId, {
            from_name: CONFIG.friendName || "A friend",
            to_name: CONFIG.yourName || "You",
            to_email: ej.toEmail || "",
            message: text,
        })
        .then(function () {
            document.getElementById("gbSealedText").textContent = text;
            document.getElementById("gbFormCard").style.display = "none";
            document.getElementById("gbSealedCard").classList.add("show");
            document
                .getElementById("gbContinueBtn")
                .classList.remove("disabled");
            sSuccess();
        })
        .catch(function () {
            showGuestbookError(
                "Couldn't send — check your internet connection and try again.",
            );
            sThud();
        })
        .finally(function () {
            btn.classList.remove("sending");
            label.textContent = "SEAL & SEND";
        });
}

function pressButton() {
    sThud();
    goTo("sDiag");
}

function runScreenLogic(id) {
    if (id === "sStats") {
        animateStats();
    }
    if (id === "sQuiz") {
        quizIndex = 0;
        quizCorrect = 0;
        document.getElementById("quizNext").classList.add("disabled");
        document.getElementById("quizScore").textContent = "";
        quizRender();
    }
    if (id === "sTimeline") {
        animateTimeline();
    }
    if (id === "sCleanup") {
        cuIndex = 0;
        cuRenderCard();
    }
    if (id === "sGuestbook") {
        document.getElementById("gbInput").value = "";
        document.getElementById("gbInput").style.borderColor = "var(--ink)";
        document.getElementById("gbInput").placeholder =
            "Write your reply here...";
        document.getElementById("gbCount").textContent = "0";
        document.getElementById("gbFormCard").style.display = "";
        document.getElementById("gbSealedCard").classList.remove("show");
    }
    if (id === "sDiag") {
        document.querySelectorAll(".diag-row").forEach(function (r) {
            r.classList.remove("show");
        });
        document.getElementById("diagFill").style.width = "0%";
        const rows = document.querySelectorAll(".diag-row");
        rows.forEach(function (r, i) {
            setTimeout(
                function () {
                    r.classList.add("show");
                    sTick();
                },
                350 + i * 450,
            );
        });
        setTimeout(
            function () {
                document.getElementById("diagFill").style.width = "100%";
            },
            350 + rows.length * 450,
        );
        setTimeout(
            function () {
                sSuccess();
                goTo("sResult");
            },
            350 + rows.length * 450 + 1600,
        );
    }
    if (id === "sResult") {
        const st = document.getElementById("stamp");
        st.classList.remove("show");
        setTimeout(function () {
            st.classList.add("show");
            sThud();
        }, 400);
    }
    if (id === "sTrans") {
        document.querySelectorAll(".trans-line").forEach(function (l) {
            l.classList.remove("show");
        });
        document.querySelectorAll(".trans-line").forEach(function (l, i) {
            setTimeout(
                function () {
                    l.classList.add("show");
                    sPop();
                },
                400 + i * 650,
            );
        });
        setTimeout(
            function () {
                goTo("sLetter");
            },
            400 + 3 * 650 + 900,
        );
    }
    if (id === "sLetter") {
        typeLetter();
    }
    if (id === "sSearch") {
        buildWordSearch();
    }
    if (id === "sAgreement") {
        document.querySelectorAll(".item").forEach(function (it) {
            it.classList.remove("show");
            it.querySelector(".check").classList.remove("on");
        });
        document.querySelectorAll(".item").forEach(function (it, i) {
            const stepDelay = 260;
            const base = 250 + i * stepDelay;
            setTimeout(function () {
                it.classList.add("show");
                sClick();
            }, base);
            setTimeout(function () {
                it.querySelector(".check").classList.add("on");
                sCheckPop();
            }, base + 220);
        });
    }
    if (id === "sFinale") {
        setTimeout(function () {
            sSuccess();
            burstConfetti();
        }, 200);
    }
}

let letterManualOverride = false;
let letterTypingToken = 0;
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function letterSegments() {
    return [
        { text: 'Dear ' + (CONFIG.friendName || "[Friend's Name]") + ',', type: 'p' },

        { text: 'You came into my life through a mutual friend, just because you needed some help with something small.', type: 'p' },
        { text: "Little did you know, you were accidentally signing up for unlimited nicknames for life.", type: 'p' },
        { text: 'Over time, I promoted you from Janvi to Capsicum, Trouble Maker, Hippo, Motu, Suar, and my personal favorite — "My Suar."', type: 'signblock' },
        { text: "Don't worry, it's a title of honor... at least according to me.", type: 'p', icon: 'mood', iconColor: 'var(--amber)' },

        { text: 'When you first texted me, you were the sweetest, most innocent girl ever. Ask anyone who knew you back then.', type: 'p' },
        { text: "But look at you now! No more innocent. These days you act expensive, play hard to get, and carry more attitude than an actual celebrity.", type: 'p' },
        { text: 'And yet, no matter how much drama you bring, you\'re still such a genuinely good person underneath it all — so I let it slide, every single time.', type: 'highlight' },

        { text: "I have plenty of female friends, but you're the only one I've talked to this much. There's just something different about you.", type: 'p' },
        { text: 'You came looking for help, and somewhere along the way you became one of my closest friends — maybe even more than that, if I\'m not wrong.', type: 'highlight' },
        { text: 'According to you, "haq jatane wali"', type: 'signblock' },
        { text: "You're someone I can talk to without thinking twice, and that's rarer than people realize.", type: 'p' },

        { text: 'One thing I genuinely admire about you is how you always push me to see the positive side of things, even when I don\'t want to.', type: 'p' },
        { text: "You also know more about faith and spirituality than most people I know, and you've taught me a lot without even trying.", type: 'p' },
        { text: 'So thank you for being my part-time life coach and full-time headache.', type: 'highlight' },

        { text: "You've heard almost every good, bad, weird, and embarrassing story I have. At this point, you know me from A to Z.", type: 'p' },
        { text: "The funny thing is, we hadn't even met in person until about a year ago — yet somehow you already understood exactly the kind of person I am.", type: 'p' },
        { text: "It's honestly a little scary how well you read me without ever having met me. Either you're a mind reader... or you've secretly hired detectives.", type: 'p', icon: 'mood', iconColor: 'var(--amber)' },

        { text: 'I know no two people should ever be compared, and I don\'t compare you to anyone else. To me, you\'re simply my Cutie Pie... my Dukar. 🤍', type: 'highlight' },

        { text: "And as if all that wasn't enough coincidence already — turns out you're actually my schoolmate, just one batch junior to me.", type: 'p' },
        { text: 'We were even born in the same month, our birthdays just two days apart.', type: 'p' },
        { text: 'Either the universe has a strange sense of humor, or it was quietly trying to build this friendship long before we knew it.', type: 'p' },

        { text: 'So thank you, my dear Capsicum, Trouble Maker, Hippo, Motu, and especially My Suar, for showing up in my life the way you did.', type: 'signblock' },
        { text: 'You can be expensive, dramatic, and impossible to deal with sometimes... but life is genuinely more fun with you in it.', type: 'p' },
        { text: 'Stay exactly the same, keep annoying me, and remember — you\'ll always be My Suar, whether you like it or not.', type: 'highlight', icon: 'favorite' },

        { text: '— ' + (CONFIG.yourName || '[Your Name]'), type: 'signature' }
    ];
}

function typeIntoElement(el, text, cursorEl, screen, token) {
    return new Promise(function (resolve) {
        let i = 0;
        function step() {
            if (token !== letterTypingToken) return;
            if (i >= text.length) {
                resolve();
                return;
            }
            const ch = text[i];
            el.insertBefore(document.createTextNode(ch), cursorEl);
            i++;
            if (ch === " " || i === text.length) sTypeKey();
            if (!letterManualOverride) {
                const cRect = cursorEl.getBoundingClientRect();
                const sRect = screen.getBoundingClientRect();
                if (cRect.bottom > sRect.bottom - 44) {
                    screen.scrollTop += cRect.bottom - (sRect.bottom - 64);
                }
            }
            let delay = 17 + Math.random() * 22;
            if (",.!?—".includes(ch)) delay += 150;
            setTimeout(step, delay);
        }
        step();
    });
}

async function typeLetter() {
    const token = ++letterTypingToken;
    letterManualOverride = false;
    const screen = document.getElementById("sLetter");
    const paper = document.getElementById("paperFull");
    screen.scrollTop = 0;
    paper.innerHTML = "";
    paper.classList.remove("show");
    requestAnimationFrame(function () {
        paper.classList.add("show");
    });
    await wait(350);

    const segs = letterSegments();
    for (let s = 0; s < segs.length; s++) {
        if (token !== letterTypingToken) return;
        const seg = segs[s];
        let container, target;
        if (seg.type === "signblock") {
            container = document.createElement("div");
            container.className = "sign-block";
            target = document.createElement("p");
            container.appendChild(target);
            paper.appendChild(container);
            requestAnimationFrame(function () {
                container.classList.add("show");
            });
            await wait(200);
        } else {
            container = document.createElement("p");
            if (seg.type === "signature") {
                container.style.textAlign = "right";
                container.style.marginTop = "14px";
                container.style.color = "#ff5b45";
            }
            if (seg.type === "highlight") {
                target = document.createElement("span");
                target.className = "hl";

                // Force highlight text to black
                target.style.color = "#000";
                target.style.webkitTextFillColor = "#000";

                container.appendChild(target);
            } else {
                target = container;
            }
            paper.appendChild(container);
        }
        const cursor = document.createElement("span");
        cursor.className = "letter-cursor";
        target.appendChild(cursor);
        await typeIntoElement(target, seg.text, cursor, screen, token);
        if (token !== letterTypingToken) return;
        if (seg.icon) {
            const icon = document.createElement("span");
            icon.className = "micon";
            icon.style.cssText =
                "font-size:18px;color:" +
                (seg.iconColor || "var(--coral)") +
                ";vertical-align:-3px;margin-left:4px;";
            icon.textContent = seg.icon;
            target.insertBefore(icon, cursor);
        }
        cursor.remove();
        await wait(seg.type === "p" ? 240 : 420);
    }
}
function stopLetterAutoScroll() {
    letterManualOverride = true;
}
(function () {
    const screen = document.getElementById("sLetter");
    ["wheel", "touchstart", "pointerdown"].forEach(function (evt) {
        screen.addEventListener(evt, stopLetterAutoScroll, { passive: true });
    });
})();

function acceptAgreement() {
    sSuccess();
    goTo("sSong");
}

/* ---------- word search ---------- */
let wsBuilt = false;
function buildWordSearch() {
    if (wsBuilt) return;
    wsBuilt = true;
    const cols = 11,
        rows = 9;
    const letters = [];
    for (let r = 0; r < rows; r++) {
        letters.push(Array(cols).fill(null));
    }
    const placements = [
        {
            word: "FRIENDSHIP",
            row: 1,
            col: 0,
            dir: "H",
            color: "var(--coral)",
        },
        { word: "HAPPY", row: 3, col: 1, dir: "H", color: "var(--lilac)" },
        { word: "DAY", row: 3, col: 8, dir: "V", color: "var(--mint)" },
        { word: "YOU", row: 5, col: 1, dir: "H", color: "var(--amber)" },
        { word: "FOOL", row: 6, col: 4, dir: "H", color: "var(--pink)" },
    ];
    placements.forEach(function (p) {
        for (let i = 0; i < p.word.length; i++) {
            const r = p.dir === "H" ? p.row : p.row + i;
            const c = p.dir === "H" ? p.col + i : p.col;
            letters[r][c] = p.word[i];
        }
    });
    const rand = "FRUZADCVJKQXWTGMHIPBNSLEOY";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!letters[r][c])
                letters[r][c] = rand[Math.floor(Math.random() * rand.length)];
        }
    }

    const grid = document.getElementById("wsGrid");
    grid.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";
    grid.innerHTML = "";
    const cellSize = 30;
    const gridW = cellSize * cols,
        gridH = cellSize * rows;
    grid.style.width = gridW + "px";
    grid.style.height = gridH + "px";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const d = document.createElement("div");
            d.className = "cell";
            d.style.width = cellSize + "px";
            d.style.height = cellSize + "px";
            d.textContent = letters[r][c];
            grid.appendChild(d);
        }
    }
    const wrap = grid.parentElement;
    document
        .querySelectorAll(".hlbar, .confetti-bit")
        .forEach(function (b) {
            b.remove();
        });
    const padX = grid.offsetLeft;
    const padY = grid.offsetTop;

    const confBits = [];

    /* word highlight pills */
    placements.forEach(function (p, i) {
        const bar = document.createElement("div");
        bar.className = "hlbar";
        bar.style.background = p.color;
        if (p.dir === "H") {
            bar.style.width = cellSize * p.word.length + "px";
            bar.style.height = cellSize + "px";
            bar.style.left = padX + p.col * cellSize + "px";
            bar.style.top = padY + p.row * cellSize + "px";
        } else {
            bar.style.width = cellSize + "px";
            bar.style.height = cellSize * p.word.length + "px";
            bar.style.left = padX + p.col * cellSize + "px";
            bar.style.top = padY + p.row * cellSize + "px";
            bar.style.transformOrigin = "top center";
        }
        wrap.appendChild(bar);
        setTimeout(
            function () {
                bar.classList.add("show");
                sTick();
            },
            350 + i * 380,
        );
    });

    /* used cells so confetti never sits on top of a word or its letters */
    const usedCells = new Set();
    placements.forEach(function (p) {
        for (let i = 0; i < p.word.length; i++) {
            const r = p.dir === "H" ? p.row : p.row + i;
            const c = p.dir === "H" ? p.col + i : p.col;
            usedCells.add(r + "-" + c);
        }
    });
    const freeCells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!usedCells.has(r + "-" + c)) freeCells.push([r, c]);
        }
    }
    for (let i = freeCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = freeCells[i];
        freeCells[i] = freeCells[j];
        freeCells[j] = t;
    }

    const confColors = [
        "#F5B93B",
        "#FF5B45",
        "#43D2A6",
        "#C9AEF2",
        "#FFC2DA",
    ];
    const picks = freeCells.slice(0, 9);
    picks.forEach(function (cellPos, i) {
        const bit = document.createElement("div");
        bit.className = "confetti-bit";
        bit.style.background = confColors[i % confColors.length];
        bit.style.width = "6px";
        bit.style.height = "6px";
        bit.style.borderRadius = "50%";
        const cx = cellPos[1] * cellSize + cellSize / 2 - 3;
        const cy = cellPos[0] * cellSize + cellSize / 2 - 3;
        bit.style.left = padX + cx + "px";
        bit.style.top = padY + cy + "px";
        bit.style.transform = "scale(.3)";
        wrap.appendChild(bit);
        confBits.push(bit);
        setTimeout(
            function () {
                bit.classList.add("show");
                bit.style.transform = "scale(1)";
            },
            350 + placements.length * 380 + 200 + i * 70,
        );
    });

    document.getElementById("wsCaption").classList.remove("show");
    setTimeout(
        function () {
            document.getElementById("wsCaption").classList.add("show");
            sSuccess();
        },
        350 + placements.length * 380 + 700,
    );
}

/* ---------- confetti ---------- */
const cv = document.getElementById("confetti");
const cctx = cv.getContext("2d");
function sizeCanvas() {
    const stage = document.querySelector(".stage");
    cv.width = stage.clientWidth;
    cv.height = stage.clientHeight;
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);
let particles = [];
function burstConfetti() {
    const colors = ["#F5B93B", "#FF5B45", "#43D2A6", "#C9AEF2", "#FFC2DA"];
    particles = [];
    for (let i = 0; i < 90; i++) {
        particles.push({
            x: cv.width / 2,
            y: cv.height * 0.35,
            vx: (Math.random() - 0.5) * 10,
            vy: Math.random() * -9 - 3,
            g: 0.28,
            size: 5 + Math.random() * 5,
            rot: Math.random() * 360,
            vr: (Math.random() - 0.5) * 14,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 120 + Math.random() * 40,
        });
    }
    requestAnimationFrame(animateConfetti);
}
function animateConfetti() {
    cctx.clearRect(0, 0, cv.width, cv.height);
    let alive = false;
    particles.forEach(function (p) {
        if (p.life <= 0) return;
        alive = true;
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life--;
        cctx.save();
        cctx.translate(p.x, p.y);
        cctx.rotate((p.rot * Math.PI) / 180);
        cctx.fillStyle = p.color;
        cctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        cctx.restore();
    });
    if (alive) requestAnimationFrame(animateConfetti);
}

/* ---------- shareable card ---------- */
let currentShareDesign = 0;
function openShare() {
    sClick();
    document.getElementById("shareOverlay").classList.add("show");
    drawShareCard(currentShareDesign);
}
function closeShare() {
    sClick();
    document.getElementById("shareOverlay").classList.remove("show");
}
function pickDesign(i) {
    currentShareDesign = i;
    document.querySelectorAll(".shareDesigns .dbtn").forEach(function (b) {
        b.classList.toggle("active", parseInt(b.dataset.d, 10) === i);
    });
    sClick();
    drawShareCard(i);
}
function drawShareCard(designIndex) {
    const canvas = document.getElementById("shareCanvas");
    const c = canvas.getContext("2d");
    const w = canvas.width,
        h = canvas.height;
    function paint() {
        c.clearRect(0, 0, w, h);
        if (designIndex === 1) drawPolaroidCard(c, w, h);
        else if (designIndex === 2) drawReceiptCard(c, w, h);
        else drawCertificateCard(c, w, h);
    }
    if (document.fonts && document.fonts.ready) {
        document.fonts
            .load("700 34px Fredoka")
            .then(function () {
                return document.fonts.ready;
            })
            .then(paint)
            .catch(paint);
    } else {
        paint();
    }
}

/* design 1: certificate */
function drawCertificateCard(c, w, h) {
    const grad = c.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#C9AEF2");
    grad.addColorStop(1, "#FFC2DA");
    c.fillStyle = grad;
    c.fillRect(0, 0, w, h);

    c.fillStyle = "rgba(23,20,14,0.08)";
    for (let y = 20; y < h; y += 26) {
        for (let x = 20; x < w; x += 26) {
            c.beginPath();
            c.arc(x, y, 1.6, 0, Math.PI * 2);
            c.fill();
        }
    }

    const pad = 34;
    roundRect(c, pad, pad, w - pad * 2, h - pad * 2, 26);
    c.fillStyle = "#F3EEDE";
    c.fill();
    c.lineWidth = 6;
    c.strokeStyle = "#17140E";
    c.stroke();

    c.font = "700 20px Fredoka, sans-serif";
    const pillText = "FRIENDSHIP CERTIFIED";
    const pillW = c.measureText(pillText).width + 44;
    const pillX = w / 2 - pillW / 2,
        pillY = pad + 40;
    roundRect(c, pillX, pillY, pillW, 44, 22);
    c.fillStyle = "#F5B93B";
    c.fill();
    c.lineWidth = 3;
    c.strokeStyle = "#17140E";
    c.stroke();
    c.fillStyle = "#17140E";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(pillText, w / 2, pillY + 23);

    drawHandshake(c, w / 2 - 46, pillY + 108, 46, "#8a5a2a");
    drawHeart(c, w / 2 + 40, pillY + 108, 26, "#FF5B45");

    c.font = "700 34px Fredoka, sans-serif";
    c.fillStyle = "#17140E";
    const names =
        (CONFIG.yourName || "Me") + "  ×  " + (CONFIG.friendName || "You");
    wrapCenteredText(c, names, w / 2, pillY + 220, w - pad * 4, 40);

    c.font = "600 20px Fredoka, sans-serif";
    c.fillStyle = "rgba(23,20,14,0.65)";
    c.fillText("officially inseparable since forever", w / 2, pillY + 280);

    const dateStr = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    c.font = '600 16px "JetBrains Mono", monospace';
    c.fillStyle = "rgba(23,20,14,0.5)";
    c.fillText(dateStr.toUpperCase(), w / 2, pillY + 320);

    c.save();
    c.translate(w / 2, h - pad - 90);
    c.rotate(-0.12);
    c.font = "700 20px Fredoka, sans-serif";
    c.fillStyle = "#FF5B45";
    c.textAlign = "center";
    c.fillText("NO CANCELLATIONS", 0, -10);
    c.fillText("NO REFUNDS", 0, 20);
    c.lineWidth = 4;
    c.strokeStyle = "#FF5B45";
    roundRect(c, -140, -42, 280, 84, 12);
    c.stroke();
    c.restore();

    drawSparkle(c, pad + 40, pad + 70, 9, "#FF5B45");
    drawSparkle(c, w - pad - 40, pad + 90, 7, "#C9AEF2");
    drawSparkle(c, pad + 50, h - pad - 40, 8, "#43D2A6");
    drawSparkle(c, w - pad - 50, h - pad - 140, 6, "#F5B93B");
}

/* design 2: polaroid */
function drawPolaroidCard(c, w, h) {
    const grad = c.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#dff5ee");
    grad.addColorStop(1, "#c6ecdd");
    c.fillStyle = grad;
    c.fillRect(0, 0, w, h);
    c.fillStyle = "rgba(23,20,14,0.07)";
    for (let y = 20; y < h; y += 26) {
        for (let x = 20; x < w; x += 26) {
            c.beginPath();
            c.arc(x, y, 1.6, 0, Math.PI * 2);
            c.fill();
        }
    }

    c.save();
    c.translate(w / 2, h / 2 + 10);
    c.rotate(-0.035);
    const cw = w - 140,
        ch = h - 160;
    roundRect(c, -cw / 2, -ch / 2, cw, ch, 14);
    c.fillStyle = "#fff";
    c.fill();
    c.lineWidth = 5;
    c.strokeStyle = "#17140E";
    c.stroke();

    // tape
    c.save();
    c.rotate(-0.06);
    c.fillStyle = "rgba(245,185,59,0.85)";
    c.fillRect(-46, -ch / 2 - 16, 92, 26);
    c.restore();

    // photo area
    const photoW = cw - 56,
        photoH = ch - 190;
    const photoY = -ch / 2 + 28;
    roundRect(c, -photoW / 2, photoY, photoW, photoH, 8);
    const pgrad = c.createLinearGradient(0, photoY, 0, photoY + photoH);
    pgrad.addColorStop(0, "#FF5B45");
    pgrad.addColorStop(1, "#ff8a75");
    c.fillStyle = pgrad;
    c.fill();
    c.lineWidth = 2;
    c.strokeStyle = "#17140E";
    c.stroke();
    drawHandshake(c, -30, photoY + photoH / 2, 50, "rgba(255,255,255,0.9)");
    drawHeart(c, 42, photoY + photoH / 2, 30, "#fff");

    // caption
    c.textAlign = "center";
    c.textBaseline = "alphabetic";
    c.font = "700 26px Kalam, cursive";
    c.fillStyle = "#17140E";
    c.fillText(
        (CONFIG.yourName || "Me") + " + " + (CONFIG.friendName || "You"),
        0,
        photoY + photoH + 46,
    );
    c.font = "600 15px Kalam, cursive";
    c.fillStyle = "rgba(23,20,14,0.55)";
    c.fillText("friendship, still going strong", 0, photoY + photoH + 72);
    const dateStr = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    c.font = '600 13px "JetBrains Mono", monospace';
    c.fillStyle = "rgba(23,20,14,0.4)";
    c.fillText(dateStr.toUpperCase(), 0, photoY + photoH + 96);
    c.restore();

    drawSparkle(c, 50, 60, 8, "#F5B93B");
    drawSparkle(c, w - 50, h - 70, 9, "#FF5B45");
}

/* design 3: receipt */
function drawReceiptCard(c, w, h) {
    c.fillStyle = "#241a35";
    c.fillRect(0, 0, w, h);
    c.fillStyle = "rgba(255,255,255,0.05)";
    for (let y = 20; y < h; y += 26) {
        for (let x = 20; x < w; x += 26) {
            c.beginPath();
            c.arc(x, y, 1.6, 0, Math.PI * 2);
            c.fill();
        }
    }

    const pad = 46;
    const rw = w - pad * 2,
        rx = pad;
    const ry = 60,
        rh = h - 160;
    // receipt body with zigzag bottom
    c.beginPath();
    c.moveTo(rx, ry);
    c.lineTo(rx + rw, ry);
    c.lineTo(rx + rw, ry + rh);
    const teeth = 12,
        toothW = rw / teeth;
    for (let i = teeth; i > 0; i--) {
        const x1 = rx + i * toothW,
            x2 = rx + (i - 1) * toothW;
        c.lineTo(x1 - toothW / 2, ry + rh + 14);
        c.lineTo(x2, ry + rh);
    }
    c.closePath();
    c.fillStyle = "#F3EEDE";
    c.fill();
    c.lineWidth = 4;
    c.strokeStyle = "#17140E";
    c.stroke();

    let y = ry + 50;
    c.textAlign = "center";
    c.textBaseline = "alphabetic";
    c.fillStyle = "#17140E";
    c.font = '700 24px "JetBrains Mono", monospace';
    c.fillText("FRIENDSHIP RECEIPT", w / 2, y);
    y += 30;
    c.font = '600 13px "JetBrains Mono", monospace';
    c.fillStyle = "rgba(23,20,14,0.55)";
    const dateStr = new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
    c.fillText(dateStr.toUpperCase(), w / 2, y);
    y += 26;

    c.strokeStyle = "rgba(23,20,14,0.3)";
    c.lineWidth = 2;
    c.setLineDash([6, 6]);
    c.beginPath();
    c.moveTo(rx + 20, y);
    c.lineTo(rx + rw - 20, y);
    c.stroke();
    c.setLineDash([]);
    y += 34;

    const items = [
        ["Unnecessary memes", "UNLIMITED"],
        ["Emotional support", "INCLUDED"],
        ["Late-night texts", "ALWAYS ON"],
        ["Cancellations", "0"],
        ["Refunds", "0"],
    ];
    c.font = "600 15px Fredoka, sans-serif";
    c.fillStyle = "#17140E";
    items.forEach(function (item) {
        c.textAlign = "left";
        c.fillText(item[0], rx + 22, y);
        c.textAlign = "right";
        c.fillText(item[1], rx + rw - 22, y);
        y += 30;
    });

    y += 6;
    c.strokeStyle = "rgba(23,20,14,0.3)";
    c.lineWidth = 2;
    c.setLineDash([6, 6]);
    c.beginPath();
    c.moveTo(rx + 20, y);
    c.lineTo(rx + rw - 20, y);
    c.stroke();
    c.setLineDash([]);
    y += 36;

    c.font = "700 22px Fredoka, sans-serif";
    c.fillStyle = "#FF5B45";
    c.textAlign = "left";
    c.fillText("TOTAL", rx + 22, y);
    c.textAlign = "right";
    c.fillText("FOREVER", rx + rw - 22, y);
    y += 40;

    c.font = "700 17px Kalam, cursive";
    c.fillStyle = "#17140E";
    c.textAlign = "center";
    c.fillText(
        (CONFIG.yourName || "Me") + " × " + (CONFIG.friendName || "You"),
        w / 2,
        y,
    );

    // barcode
    const bY = ry + rh + 40;
    let bx = w / 2 - 90;
    for (let i = 0; i < 36; i++) {
        const bw = i % 3 === 0 ? 3 : 1.5;
        c.fillStyle = "#F3EEDE";
        c.fillRect(bx, bY, bw, 26);
        bx += bw + 3;
    }

    drawSparkle(c, pad, h - 40, 7, "#F5B93B");
    drawSparkle(c, w - pad, 36, 6, "#43D2A6");
}
function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();
}
function drawHeart(c, cx, cy, size, color) {
    c.save();
    c.translate(cx, cy);
    c.scale(size / 24, size / 24);
    c.beginPath();
    c.moveTo(0, 7);
    c.bezierCurveTo(-2, 2, -12, -3, -12, -10);
    c.bezierCurveTo(-12, -16, -5, -18, 0, -11);
    c.bezierCurveTo(5, -18, 12, -16, 12, -10);
    c.bezierCurveTo(12, -3, 2, 2, 0, 7);
    c.closePath();
    c.fillStyle = color;
    c.fill();
    c.restore();
}

const handshakeSVG = new Image();

handshakeSVG.onload = () => {
    renderShareCard(); // or whatever function redraws your canvas
};

handshakeSVG.src = "assets/handshake-svgrepo-com.svg";

function drawHandshake(ctx, cx, cy, size) {
    if (!handshakeSVG.complete || handshakeSVG.naturalWidth === 0) {
        return;
    }

    ctx.save();

    ctx.drawImage(handshakeSVG, cx - size / 2, cy - size / 2, size, size);

    ctx.restore();
}
function drawSparkle(c, cx, cy, r, color) {
    c.save();
    c.translate(cx, cy);
    c.fillStyle = color;
    c.beginPath();
    c.moveTo(0, -r);
    c.quadraticCurveTo(r * 0.28, -r * 0.28, r, 0);
    c.quadraticCurveTo(r * 0.28, r * 0.28, 0, r);
    c.quadraticCurveTo(-r * 0.28, r * 0.28, -r, 0);
    c.quadraticCurveTo(-r * 0.28, -r * 0.28, 0, -r);
    c.closePath();
    c.fill();
    c.restore();
}
function wrapCenteredText(c, text, cx, cy, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "",
        lines = [];
    words.forEach(function (word) {
        const test = line ? line + " " + word : word;
        if (c.measureText(test).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = test;
        }
    });
    lines.push(line);
    const startY = cy - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach(function (l, i) {
        c.fillText(l, cx, startY + i * lineHeight);
    });
}
function downloadShareCard() {
    sSuccess();
    const canvas = document.getElementById("shareCanvas");
    const link = document.createElement("a");
    link.download = "friendship-day-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

/* ---------- restart ---------- */
function restart() {
    sClick();
    hist = ["sDoor"];
    const zoomWrap = document.getElementById("doorZoomWrap");
    zoomWrap.querySelectorAll(":scope > *").forEach(function (el) {
        el.style.animation = "none";
        void el.offsetHeight;
        el.style.animation = "";
    });
    letterTypingToken++;
    letterManualOverride = false;
    document.getElementById("paperFull").innerHTML = "";
    document.getElementById("paperFull").classList.remove("show");
    keyDragUsed = false;
    const keyWrap = document.getElementById("keyWrap");
    keyWrap.classList.remove("used", "dragging", "snapping", "returning");
    keyWrap.style.left = "";
    keyWrap.style.top = "";
    keyWrap.style.bottom = "";
    keyWrap.style.transform = "";
    document
        .getElementById("doorLock")
        .classList.remove("unlocked", "hover-ready");
    document
        .getElementById("doorLock")
        .querySelector(".micon").textContent = "lock";
    document.getElementById("doorEl").classList.remove("open");
    document.getElementById("doorGlow").classList.remove("show");
    document.getElementById("doorZoomWrap").classList.remove("zooming");
    document.getElementById("doorFlash").classList.remove("show");
    exhibitsSeen = new Set();
    document.querySelectorAll(".exhibit-card").forEach(function (e) {
        e.classList.remove("done");
    });
    document.getElementById("exhibitOverlay").classList.remove("show");
    document.getElementById("museumNext").classList.add("disabled");
    document.getElementById("curtainBox").classList.remove("open");
    statsAnimated = false;
    document.querySelectorAll(".stat-num").forEach(function (el) {
        el.textContent = "0";
    });
    timelineAnimated = false;
    document.querySelectorAll(".tl-row").forEach(function (r) {
        r.classList.remove("show");
    });
    cuIndex = 0;
    document.getElementById("cuNext").classList.add("disabled");
    quizIndex = 0;
    quizCorrect = 0;
    document.getElementById("quizNext").classList.add("disabled");
    document.getElementById("quizScore").textContent = "";
    document.getElementById("gbInput").value = "";
    document.getElementById("gbCount").textContent = "0";
    document.getElementById("gbFormCard").style.display = "";
    document.getElementById("gbSealedCard").classList.remove("show");
    document.getElementById("shareOverlay").classList.remove("show");
    document.getElementById("phone").classList.remove("opened");
    wsBuilt = false;
    goTo("sDoor", false);
}

/* init */
applyBg("sDoor");
updateProgress("sDoor");