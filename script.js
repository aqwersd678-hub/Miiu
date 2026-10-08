document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     GOOGLE APPS SCRIPT
  ===================================================== */

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxrp8dpTqUYlt8OFPcKp2rXsR20Z5zTNbs_MfuXTSq67vtiuS0P9ljHwGhK_Ng6o4xV9g/exec";


  /* =====================================================
     ELEMENTS
  ===================================================== */

  const loadingScreen =
    document.getElementById("loadingScreen");

  const envelope =
    document.getElementById("envelope");

  const hint =
    document.getElementById("hint");

  const flowerLayer =
    document.getElementById("flowerLayer");

  const viewer =
    document.getElementById("viewer");

  const videoViewer =
    document.getElementById("videoViewer");

  const videoViewer2 =
    document.getElementById("videoViewer2");

  const questionBox =
    document.getElementById("questionBox");

  const yesBtn =
    document.getElementById("yesBtn");

  const noBtn =
    document.getElementById("noBtn");

  const image7Message =
    document.getElementById("image7Message");

  const oneMoreBox =
    document.getElementById("oneMoreBox");

  const oneMoreBtn =
    document.getElementById("oneMoreBtn");

  const endBox =
    document.getElementById("endBox");

  const confessionBox =
    document.getElementById("confessionBox");

  const answerBtn =
    document.getElementById("answerBtn");

  const answerBox =
    document.getElementById("answerBox");

  const answerInput =
    document.getElementById("answerInput");

  const sendAnswerBtn =
    document.getElementById("sendAnswerBtn");

  const answerStatus =
    document.getElementById("answerStatus");

  const bgMusic =
    document.getElementById("bgMusic");

  const bgMusic2 =
    document.getElementById("bgMusic2");

  const bgMusic3 =
    document.getElementById("bgMusic3");


  /* =====================================================
     IMAGES
  ===================================================== */

  const preVideoImages = [
    "./1.png",
    "./2.png",
    "./3.png"
  ];

  const postQuestionImages = [
    "./7.png",
    "./4.png",
    "./5.png",
    "./8.png",
    "./9.png",
    "./10.png"
  ];


  /* =====================================================
     STATE
  ===================================================== */

  let stage = "cat";

  let preIndex = 0;

  let postIndex = 0;

  let music3Started = false;


  /* =====================================================
     BACKGROUND
  ===================================================== */

  function setPageBackground(type) {

    document.body.classList.remove(
      "bg-pink",
      "bg-blue",
      "bg-black"
    );

    document.body.classList.add(
      `bg-${type}`
    );
  }


  /* =====================================================
     LOADING
  ===================================================== */

  setTimeout(() => {

    loadingScreen.classList.add("hidden");

  }, 700);


  /* =====================================================
     MUSIC HELPERS
  ===================================================== */

  function stopMusic(audio) {

    if (!audio) return;

    audio.pause();

    try {
      audio.currentTime = 0;
    } catch (error) {}
  }


  function startMusic1() {

    if (!bgMusic) return;

    bgMusic.loop = true;

    bgMusic.volume = 1;

    bgMusic.play().catch(() => {
      console.log("Music 1 waiting for interaction.");
    });
  }


  function stopMusic1() {

    stopMusic(bgMusic);
  }


  function startMusic2() {

    if (!bgMusic2) return;

    bgMusic2.loop = true;

    bgMusic2.volume = 1;

    bgMusic2.play().catch(() => {
      console.log("Music 2 waiting for interaction.");
    });
  }


  function stopMusic2() {

    stopMusic(bgMusic2);
  }


  /*
    IMPORTANT:

    Music 3 is started when the user clicks IMAGE 10.

    This is a real user interaction, so mobile browsers
    are much more likely to allow the audio.
  */

  function startMusic3() {

    if (!bgMusic3) return;

    if (!music3Started) {

      music3Started = true;

      bgMusic3.loop = true;

      bgMusic3.volume = 1;

      bgMusic3.currentTime = 0;

      bgMusic3.play().catch(() => {

        console.log(
          "Music 3 was blocked. Waiting for another tap."
        );

        music3Started = false;

      });

    } else {

      bgMusic3.volume = 1;

      if (bgMusic3.paused) {

        bgMusic3.play().catch(() => {

          console.log(
            "Music 3 play retry blocked."
          );

        });

      }

    }

  }


  function stopMusic3() {

    if (!bgMusic3) return;

    bgMusic3.pause();

    try {
      bgMusic3.currentTime = 0;
    } catch (error) {}

    music3Started = false;
  }


  function stopAllMusic() {

    stopMusic1();

    stopMusic2();

    stopMusic3();

  }


  /* =====================================================
     ENVELOPE
  ===================================================== */

  let envelopeClicks = 0;

  envelope.addEventListener("click", () => {

    envelopeClicks++;

    if (envelopeClicks === 1) {

      envelope.classList.add("open");

      hint.classList.add("hide");

      return;
    }


    if (envelopeClicks === 2) {

      createFlowers();

      setTimeout(() => {

        stage = "preImages";

        preIndex = 0;

        setPageBackground("pink");

        showPreVideoImage(0);

        startMusic1();

      }, 900);

    }

  });


  /* =====================================================
     FLOWERS
  ===================================================== */

  function createFlowers() {

    const flowerCount = 80;

    for (let i = 0; i < flowerCount; i++) {

      const flower =
        document.createElement("div");

      flower.className = "flower";

      const size =
        Math.random() * 12 + 8;

      flower.style.width =
        `${size}px`;

      flower.style.height =
        `${size}px`;

      flower.style.left =
        `${Math.random() * 100}%`;

      flower.style.top =
        `${Math.random() * 25}%`;

      flower.style.background =
        Math.random() > 0.5
          ? "#f3a8c4"
          : "#ffffff";

      flower.style.animationDelay =
        `${Math.random() * 0.8}s`;

      flowerLayer.appendChild(flower);

      setTimeout(() => {

        flower.remove();

      }, 3500);

    }

  }


  /* =====================================================
     IMAGE DISPLAY
  ===================================================== */

  function showViewer() {

    viewer.classList.add("show");

  }


  function hideViewer() {

    viewer.classList.remove("show");

  }


  function showPreVideoImage(index) {

    if (!preVideoImages[index]) return;

    viewer.src =
      preVideoImages[index];

    setPageBackground("pink");

    showViewer();

  }


  function showPostQuestionImage(index) {

    if (!postQuestionImages[index]) return;

    viewer.src =
      postQuestionImages[index];


    /*
      7, 4, 5 = blue
      8, 9, 10 = black
    */

    if (index <= 2) {

      setPageBackground("blue");

    } else {

      setPageBackground("black");

    }

    showViewer();

  }


  /* =====================================================
     MAIN VIEWER CLICK
  ===================================================== */

  viewer.addEventListener("click", () => {


    /* ---------------------------------------------
       PRE VIDEO
    --------------------------------------------- */

    if (stage === "preImages") {

      if (preIndex < preVideoImages.length - 1) {

        preIndex++;

        showPreVideoImage(preIndex);

        return;

      }

      startVideo1();

      return;

    }


    /* ---------------------------------------------
       POST QUESTION
    --------------------------------------------- */

    if (stage === "postImages") {

      /*
        7 -> 4
      */

      if (postIndex === 0) {

        showOneMore();

        return;

      }


      /*
        4 -> 5
      */

      if (postIndex < postQuestionImages.length - 1) {

        postIndex++;

        showPostQuestionImage(postIndex);

        return;

      }


      /*
        10 -> CONFESSION

        THIS IS THE IMPORTANT PART.

        The click on image 10 is the user gesture
        that starts music3.
      */

      if (postIndex === postQuestionImages.length - 1) {

        showConfession();

        startMusic3();

        return;

      }

    }

  });


  /* =====================================================
     VIDEO 1
  ===================================================== */

  function startVideo1() {

    stage = "video1";

    hideViewer();

    setPageBackground("black");

    videoViewer.currentTime = 0;

    videoViewer.classList.add("video-show");

    videoViewer.play().catch(() => {

      console.log(
        "Video 1 waiting for interaction."
      );

    });

  }


  videoViewer.addEventListener(
    "ended",
    () => {

      stopMusic1();

      videoViewer.classList.remove(
        "video-show"
      );

      showQuestion();

    }
  );


  /* =====================================================
     QUESTION
  ===================================================== */

  function showQuestion() {

    stage = "question";

    setPageBackground("blue");

    questionBox.classList.add("show");

  }


  /* =====================================================
     YES BUTTON
  ===================================================== */

  yesBtn.addEventListener("click", () => {

    questionBox.classList.remove("show");

    stage = "postImages";

    postIndex = 0;

    setPageBackground("blue");

    viewer.src =
      postQuestionImages[0];

    showViewer();

    image7Message.classList.add("show");

  });


  /* =====================================================
     NO BUTTON
  ===================================================== */

  function moveNoButton() {

    const maxX =
      Math.max(
        40,
        window.innerWidth / 2 - 100
      );

    const maxY =
      Math.max(
        40,
        window.innerHeight / 2 - 100
      );

    const x =
      (Math.random() * maxX * 2) - maxX;

    const y =
      (Math.random() * maxY * 2) - maxY;

    noBtn.style.transform =
      `translate(${x}px, ${y}px)`;

  }


  noBtn.addEventListener(
    "mouseenter",
    moveNoButton
  );

  noBtn.addEventListener(
    "touchstart",
    (event) => {

      event.preventDefault();

      moveNoButton();

    },
    {
      passive: false
    }
  );


  /* =====================================================
     ONE MORE
  ===================================================== */

  function showOneMore() {

    stage = "oneMore";

    hideViewer();

    image7Message.classList.remove(
      "show"
    );

    setPageBackground("pink");

    oneMoreBox.classList.add("show");

  }


  oneMoreBtn.addEventListener(
    "click",
    () => {

      oneMoreBox.classList.remove(
        "show"
      );

      stage = "postImages";

      postIndex = 1;

      setPageBackground("blue");

      showPostQuestionImage(
        postIndex
      );

      startMusic2();

    }
  );


  /* =====================================================
     VIDEO 2
  ===================================================== */

  function startVideo2() {

    stage = "video2";

    hideViewer();

    setPageBackground("black");

    videoViewer2.currentTime = 0;

    videoViewer2.classList.add(
      "video-show"
    );

    /*
      Music 2 CONTINUES through video2.

      It is intentionally NOT stopped here.
    */

    videoViewer2.play().catch(() => {

      console.log(
        "Video 2 waiting for interaction."
      );

    });

  }


  /*
    When image 10 is clicked we currently show
    confession instead of video2.

    Therefore video2 is reached from image 9
    only if needed by the flow.

    This handler remains here for the existing
    video2 section.
  */

  videoViewer2.addEventListener(
    "ended",
    () => {

      videoViewer2.classList.remove(
        "video-show"
      );

      /*
        Music 2 continues while "Hết..." appears.
      */

      showEnd();

    }
  );


  /* =====================================================
     END
  ===================================================== */

  function showEnd() {

    stage = "end";

    setPageBackground("black");

    endBox.classList.add("show");

    setTimeout(() => {

      endBox.classList.remove(
        "show"
      );

      /*
        In the current new flow the confession
        is reached from image 10.

        This fallback keeps the old video2 -> end
        route functional.
      */

      showConfession();

      startMusic3();

    }, 2200);

  }


  /* =====================================================
     CONFESSION
  ===================================================== */

  function showConfession() {

    stage = "confession";

    hideViewer();

    setPageBackground("pink");

    /*
      Music 2 ends exactly when confession begins.
    */

    stopMusic2();

    confessionBox.classList.add(
      "show"
    );

  }


  /* =====================================================
     ANSWER PAGE
  ===================================================== */

  answerBtn.addEventListener(
    "click",
    () => {

      stage = "answer";

      confessionBox.classList.remove(
        "show"
      );

      setPageBackground("pink");

      answerBox.classList.add(
        "show"
      );

      /*
        Music 3 is ALREADY playing.

        We simply make sure it continues.
      */

      startMusic3();

      setTimeout(() => {

        answerInput.focus();

      }, 500);

    }
  );


  /* =====================================================
     SEND ANSWER
  ===================================================== */

  sendAnswerBtn.addEventListener(
    "click",
    sendAnswer
  );


  answerInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.ctrlKey &&
        event.key === "Enter"
      ) {

        sendAnswer();

      }

    }
  );


  async function sendAnswer() {

    const answer =
      answerInput.value.trim();


    if (!answer) {

      answerStatus.textContent =
        "Em chưa viết gì kìa... 💗";

      answerInput.focus();

      return;

    }


    sendAnswerBtn.disabled = true;

    answerStatus.textContent =
      "Đang gửi...";


    /*
      Stop music3 when submitting.
    */

    stopMusic3();


    try {

      const data =
        new URLSearchParams();

      data.append(
        "answer",
        answer
      );

      data.append(
        "time",
        new Date().toLocaleString(
          "vi-VN"
        )
      );


      await fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "POST",

          mode: "no-cors",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded"
          },

          body: data.toString()
        }
      );


      answerStatus.textContent =
        "Đã gửi câu trả lời 💗";


      setTimeout(() => {

        leavePage();

      }, 1200);


    } catch (error) {

      console.error(error);

      answerStatus.textContent =
        "Có lỗi xảy ra, thử lại nhé.";

      sendAnswerBtn.disabled =
        false;

    }

  }


  /* =====================================================
     LEAVE PAGE
  ===================================================== */

  function leavePage() {

    stopAllMusic();

    try {

      videoViewer.pause();

      videoViewer2.pause();

    } catch (error) {}


    /*
      Try closing the tab.
    */

    try {

      window.open(
        "",
        "_self"
      );

      window.close();

    } catch (error) {}


    /*
      If browser refuses to close the tab,
      replace the page with a blank screen.
    */

    setTimeout(() => {

      document.body.innerHTML = "";

      document.body.style.background =
        "#000";

    }, 300);

  }


  /* =====================================================
     MOBILE VIDEO SETTINGS
  ===================================================== */

  videoViewer.playsInline = true;

  videoViewer2.playsInline = true;

  videoViewer.setAttribute(
    "playsinline",
    ""
  );

  videoViewer.setAttribute(
    "webkit-playsinline",
    ""
  );

  videoViewer2.setAttribute(
    "playsinline",
    ""
  );

  videoViewer2.setAttribute(
    "webkit-playsinline",
    ""
  );


});