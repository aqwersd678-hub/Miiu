/* =========================================================
   FOR MY PRINCESS
   COMPLETE SCRIPT
========================================================= */


/* =========================================================
   WAIT FOR HTML
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  console.log("✅ script.js đã chạy");


  /* =======================================================
     ELEMENTS
  ======================================================= */

  const loadingScreen =
    document.getElementById("loadingScreen");

  const envelope =
    document.getElementById("envelope");

  const hint =
    document.querySelector(".hint");

  const flowerLayer =
    document.getElementById("flowerLayer");

  const viewer =
    document.getElementById("viewer");

  const videoViewer =
    document.getElementById("videoViewer");

  const videoFade =
    document.getElementById("videoFade");

  const questionBox =
    document.getElementById("questionBox");

  const questionCard =
    document.querySelector(".question-card");

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

  const bgMusic =
    document.getElementById("bgMusic");

  const bgMusic2 =
    document.getElementById("bgMusic2");


  /* =======================================================
     CHECK ELEMENTS
  ======================================================= */

  if (!loadingScreen) {
    console.error("❌ Không tìm thấy #loadingScreen");
    return;
  }

  if (!envelope) {
    console.error("❌ Không tìm thấy #envelope");
    return;
  }

  if (!viewer) {
    console.error("❌ Không tìm thấy #viewer");
    return;
  }

  if (!videoViewer) {
    console.error("❌ Không tìm thấy #videoViewer");
    return;
  }


  /* =======================================================
     STATE
  ======================================================= */

  let stage = 0;

  let index = 0;

  let canNext = false;

  let videoFinished = false;

  let videoWatcher = null;


  /*
     STAGE

     0 = ban đầu
     1 = mèo đã mở
     2 = hoa
     3 = ảnh 1-2-3
     4 = câu hỏi
     5 = video
     6 = ảnh 7-4-5-8
  */


  /* =======================================================
     IMAGES
  ======================================================= */

  const preVideoImages = [
    "./1.png",
    "./2.png",
    "./3.png"
  ];


  const postQuestionImages = [
    "./7.png",
    "./4.png",
    "./5.png",
    "./8.png"
  ];


  /* =======================================================
     LOADING
  ======================================================= */

  /*
     Không chờ preload nữa.

     JS chạy → chờ 1 giây → tắt loading.
  */

  setTimeout(function () {

    console.log("✅ Loading hoàn tất");

    loadingScreen.classList.add("hide");

    /*
       Đảm bảo trong trường hợp CSS .hide
       không hoạt động.
    */

    setTimeout(function () {

      loadingScreen.style.opacity = "0";
      loadingScreen.style.pointerEvents = "none";

    }, 700);

  }, 1000);


  /* =======================================================
     PRELOAD ẢNH
  ======================================================= */

  const preloadList = [
    ...preVideoImages,
    ...postQuestionImages,
    "./6.png"
  ];


  preloadList.forEach(function (src) {

    const img = new Image();

    img.src = src;

  });


  /* =======================================================
     PRELOAD VIDEO
  ======================================================= */

  videoViewer.load();


  /* =======================================================
     MUSIC 1
  ======================================================= */

  function startMusic1() {

    console.log("🎵 Bắt đầu music.mp3");

    bgMusic.volume = 0.65;

    try {
      bgMusic.currentTime = 0;
    } catch (error) {}

    const promise =
      bgMusic.play();

    if (promise) {

      promise.catch(function (error) {

        console.log(
          "⚠️ Không thể tự phát music.mp3:",
          error
        );

      });

    }

  }


  function stopMusic1() {

    console.log("⏹ Dừng music.mp3");

    bgMusic.pause();

    try {
      bgMusic.currentTime = 0;
    } catch (error) {}

  }


  /* =======================================================
     MUSIC 2
  ======================================================= */

  function startMusic2() {

    console.log("🎵 Bắt đầu music2.mp3");

    bgMusic2.volume = 0.65;

    const promise =
      bgMusic2.play();

    if (promise) {

      promise.catch(function (error) {

        console.log(
          "⚠️ Không thể phát music2.mp3:",
          error
        );

      });

    }

  }


  /* =======================================================
     CAT
  ======================================================= */

  envelope.addEventListener(
    "click",
    function () {

      console.log(
        "🐱 Click mèo - stage:",
        stage
      );


      /* ---------------------------------------------------
         LẦN 1
         MỞ MÈO
      --------------------------------------------------- */

      if (stage === 0) {

        envelope.classList.add("open");

        stage = 1;

        return;
      }


      /* ---------------------------------------------------
         LẦN 2
         HOA + MUSIC
      --------------------------------------------------- */

      if (stage === 1) {

        stage = 2;

        envelope.style.pointerEvents =
          "none";

        if (hint) {
          hint.classList.add("hide");
        }

        startMusic1();

        startFlowerTransition();

      }

    }
  );


  /* =======================================================
     FLOWER TRANSITION
  ======================================================= */

  function startFlowerTransition() {

    console.log("🌸 Flower transition");

    flowerLayer.innerHTML = "";

    flowerLayer.classList.add("active");


    const flowers = [
      "🌸",
      "🌷",
      "🌺",
      "🌹",
      "💐",
      "🌼"
    ];


    for (
      let i = 0;
      i < 75;
      i++
    ) {

      const flower =
        document.createElement("div");


      flower.className =
        "flower";


      flower.innerText =
        flowers[
          Math.floor(
            Math.random() *
            flowers.length
          )
        ];


      const x =
        (Math.random() - 0.5) *
        window.innerWidth *
        1.5;


      const y =
        (Math.random() - 0.5) *
        window.innerHeight *
        1.5;


      const size =
        18 +
        Math.random() * 30;


      const rotation =
        -180 +
        Math.random() * 360;


      flower.style.setProperty(
        "--x",
        x + "px"
      );


      flower.style.setProperty(
        "--y",
        y + "px"
      );


      flower.style.setProperty(
        "--size",
        size + "px"
      );


      flower.style.setProperty(
        "--r",
        rotation + "deg"
      );


      flower.style.animationDelay =
        Math.random() *
        0.35 +
        "s";


      flowerLayer.appendChild(
        flower
      );

    }


    /* ---------------------------------------------------
       FADE HOA
    --------------------------------------------------- */

    setTimeout(function () {

      flowerLayer.style.transition =
        "opacity 0.8s ease";

      flowerLayer.style.opacity =
        "0";

    }, 2200);


    /* ---------------------------------------------------
       ẨN HOA + HIỆN ẢNH 1
    --------------------------------------------------- */

    setTimeout(function () {

      flowerLayer.classList.remove(
        "active"
      );

      flowerLayer.style.opacity =
        "";

      flowerLayer.style.transition =
        "";

      envelope.classList.add(
        "hide"
      );

      showPreVideoImage(0);

    }, 3100);

  }


  /* =======================================================
     SHOW ẢNH 1-2-3
  ======================================================= */

  function showPreVideoImage(newIndex) {

    index = newIndex;

    canNext = false;

    viewer.classList.remove(
      "show"
    );


    viewer.style.display =
      "block";


    viewer.style.visibility =
      "hidden";


    /*
       Xóa onload cũ
    */

    viewer.onload = null;


    viewer.onload = function () {

      viewer.style.visibility =
        "visible";


      requestAnimationFrame(function () {

        requestAnimationFrame(function () {

          viewer.classList.add(
            "show"
          );

        });

      });


      setTimeout(function () {

        canNext = true;

      }, 500);

    };


    viewer.onerror = function () {

      console.error(
        "❌ Không tải được ảnh:",
        preVideoImages[index]
      );

      canNext = true;

    };


    viewer.src =
      preVideoImages[index];


    stage = 3;


    console.log(
      "🖼️ Hiện ảnh:",
      preVideoImages[index]
    );

  }


  /* =======================================================
     SHOW ẢNH SAU QUESTION
  ======================================================= */

  function showPostQuestionImage(
    newIndex
  ) {

    index = newIndex;

    canNext = false;

    viewer.classList.remove(
      "show"
    );


    viewer.style.display =
      "block";


    viewer.style.visibility =
      "hidden";


    viewer.onload = null;


    viewer.onload = function () {

      viewer.style.visibility =
        "visible";


      requestAnimationFrame(function () {

        requestAnimationFrame(function () {

          viewer.classList.add(
            "show"
          );

        });

      });


      setTimeout(function () {

        canNext = true;

      }, 500);

    };


    viewer.onerror = function () {

      console.error(
        "❌ Không tải được ảnh:",
        postQuestionImages[index]
      );

      canNext = true;

    };


    viewer.src =
      postQuestionImages[index];


    stage = 6;


    /*
       Chỉ ảnh 7 mới có dòng cảm ơn.
    */

    if (index === 0) {

      image7Message.classList.add(
        "show"
      );

    } else {

      image7Message.classList.remove(
        "show"
      );

    }


    console.log(
      "🖼️ Hiện ảnh:",
      postQuestionImages[index]
    );

  }


  /* =======================================================
     CLICK ẢNH
  ======================================================= */

  viewer.addEventListener(
    "click",
    function () {

      if (!canNext) {
        return;
      }


      /* =================================================
         ẢNH 1 → 2 → 3 → VIDEO
      ================================================= */

      if (stage === 3) {

        canNext = false;

        viewer.classList.remove(
          "show"
        );


        setTimeout(function () {

          index++;


          if (
            index <
            preVideoImages.length
          ) {

            showPreVideoImage(
              index
            );

          } else {

            viewer.style.display =
              "none";

            playVideo();

          }

        }, 450);


        return;
      }


      /* =================================================
         ẢNH 7 → CÒN 1 ĐIỀU NỮA
      ================================================= */

      if (
        stage === 6 &&
        index === 0
      ) {

        canNext = false;

        viewer.classList.remove(
          "show"
        );

        image7Message.classList.remove(
          "show"
        );


        setTimeout(function () {

          viewer.style.display =
            "none";

          oneMoreBox.classList.add(
            "show"
          );

        }, 500);


        return;
      }


      /* =================================================
         ẢNH 4 → ẢNH 5
      ================================================= */

      if (
        stage === 6 &&
        index === 1
      ) {

        canNext = false;

        viewer.classList.remove(
          "show"
        );


        setTimeout(function () {

          showPostQuestionImage(
            2
          );

        }, 450);


        return;
      }


      /* =================================================
         ẢNH 5 → ẢNH 8
      ================================================= */

      if (
        stage === 6 &&
        index === 2
      ) {

        canNext = false;

        viewer.classList.remove(
          "show"
        );


        setTimeout(function () {

          showPostQuestionImage(
            3
          );

        }, 450);


        return;
      }


      /* =================================================
         ẢNH 8 → HẾT
      ================================================= */

      if (
        stage === 6 &&
        index === 3
      ) {

        canNext = false;

        viewer.classList.remove(
          "show"
        );


        setTimeout(function () {

          viewer.style.display =
            "none";


          endBox.classList.add(
            "show"
          );


          /*
             QUAN TRỌNG:

             KHÔNG DỪNG music2.

             music2 vẫn loop.
          */

        }, 600);


        return;
      }

    }
  );


  /* =======================================================
     VIDEO
  ======================================================= */

  function playVideo() {

    console.log("🎬 Bắt đầu video");

    stage = 5;

    canNext = false;

    videoFinished = false;


    if (videoWatcher) {

      clearInterval(
        videoWatcher
      );

      videoWatcher = null;

    }


    videoViewer.style.display =
      "block";


    videoViewer.classList.remove(
      "video-show"
    );


    videoViewer.controls =
      false;


    try {

      videoViewer.currentTime =
        0;

    } catch (error) {}


    requestAnimationFrame(function () {

      videoViewer.classList.add(
        "video-show"
      );

    });


    const playPromise =
      videoViewer.play();


    if (playPromise) {

      playPromise.catch(
        function (error) {

          console.error(
            "❌ Video không phát được:",
            error
          );

        }
      );

    }


    startVideoWatcher();

  }


  /* =======================================================
     VIDEO WATCHER
  ======================================================= */

  function startVideoWatcher() {

    if (videoWatcher) {

      clearInterval(
        videoWatcher
      );

    }


    videoWatcher =
      setInterval(function () {

        if (
          stage !== 5 ||
          videoFinished
        ) {

          return;

        }


        const duration =
          videoViewer.duration;


        const currentTime =
          videoViewer.currentTime;


        if (
          Number.isFinite(duration) &&
          duration > 0
        ) {

          const remaining =
            duration -
            currentTime;


          if (
            remaining <= 0.25
          ) {

            clearInterval(
              videoWatcher
            );

            videoWatcher =
              null;


            goToQuestion();

          }

        }

      }, 100);

  }


  /* =======================================================
     VIDEO ENDED
  ======================================================= */

  videoViewer.addEventListener(
    "ended",
    function () {

      console.log(
        "🎬 Video đã kết thúc"
      );

      goToQuestion();

    }
  );


  /* =======================================================
     VIDEO ERROR
  ======================================================= */

  videoViewer.addEventListener(
    "error",
    function () {

      console.error(
        "❌ Không thể tải video.mp4"
      );

    }
  );


  /* =======================================================
     VIDEO → QUESTION
  ======================================================= */

  function goToQuestion() {

    if (videoFinished) {
      return;
    }


    videoFinished = true;


    console.log(
      "➡️ Chuyển sang câu hỏi"
    );


    if (videoWatcher) {

      clearInterval(
        videoWatcher
      );

      videoWatcher =
        null;

    }


    /* ---------------------------------------------------
       DỪNG MUSIC 1
    --------------------------------------------------- */

    stopMusic1();


    /* ---------------------------------------------------
       FADE
    --------------------------------------------------- */

    videoFade.classList.add(
      "active"
    );


    setTimeout(function () {

      videoViewer.pause();


      videoViewer.classList.remove(
        "video-show"
      );


      videoViewer.style.display =
        "none";


      try {

        videoViewer.currentTime =
          0;

      } catch (error) {}


      /* -------------------------------------------------
         HIỆN QUESTION
      ------------------------------------------------- */

      questionBox.classList.add(
        "show"
      );


      stage = 4;


      setTimeout(function () {

        videoFade.classList.remove(
          "active"
        );

      }, 400);

    }, 700);

  }


  /* =======================================================
     YES BUTTON
  ======================================================= */

  yesBtn.addEventListener(
    "click",
    function () {

      console.log(
        "💗 YESN'T"
      );


      questionBox.classList.remove(
        "show"
      );


      resetNoButton();


      setTimeout(function () {

        showPostQuestionImage(
          0
        );

      }, 600);

    }
  );


  /* =======================================================
     NO BUTTON
  ======================================================= */

  function moveNoButton() {

    const cardRect =
      questionCard.getBoundingClientRect();


    const buttonRect =
      noBtn.getBoundingClientRect();


    const padding = 15;


    const maxX =
      Math.max(
        0,
        cardRect.width -
        buttonRect.width -
        padding * 2
      );


    const maxY =
      Math.max(
        0,
        cardRect.height -
        buttonRect.height -
        padding * 2
      );


    const x =
      padding +
      Math.random() *
      maxX;


    const y =
      padding +
      Math.random() *
      maxY;


    noBtn.style.position =
      "absolute";


    noBtn.style.left =
      x + "px";


    noBtn.style.top =
      y + "px";


    noBtn.style.transform =
      "none";

  }


  noBtn.addEventListener(
    "mouseenter",
    function () {

      moveNoButton();

    }
  );


  noBtn.addEventListener(
    "touchstart",
    function (event) {

      event.preventDefault();

      moveNoButton();

    },
    {
      passive: false
    }
  );


  noBtn.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      moveNoButton();

    }
  );


  function resetNoButton() {

    noBtn.style.position =
      "";

    noBtn.style.left =
      "";

    noBtn.style.top =
      "";

    noBtn.style.transform =
      "";

  }


  /* =======================================================
     ONE MORE BUTTON
  ======================================================= */

  oneMoreBtn.addEventListener(
    "click",
    function () {

      console.log(
        "➡️ Xem tiếp"
      );


      oneMoreBox.classList.remove(
        "show"
      );


      setTimeout(function () {

        /*
           HIỆN ẢNH 4
        */

        showPostQuestionImage(
          1
        );


        /*
           MUSIC 2 BẮT ĐẦU
        */

        startMusic2();

      }, 600);

    }
  );


  /* =======================================================
     INITIAL
  ======================================================= */

  console.log(
    "✅ Website đã sẵn sàng"
  );

});