/* =====================================================
   STATE
===================================================== */

let stage = 0;
let index = 0;
let canNext = false;

let videoCheckTimer = null;
let videoFinished = false;


/* =====================================================
   IMAGES
===================================================== */

/*
  Ảnh trước video:
  1 → 2 → 3
*/

const preVideoImages = [
  "1.png",
  "2.png",
  "3.png"
];


/*
  Ảnh sau câu hỏi:
  7 → 4 → 5 → 8
*/

const postQuestionImages = [
  "7.png",
  "4.png",
  "5.png",
  "8.png"
];


/* =====================================================
   ELEMENTS
===================================================== */

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


/* =====================================================
   PRELOAD
===================================================== */

function preloadEverything() {

  const allImages = [
    ...preVideoImages,
    ...postQuestionImages,
    "6.png"
  ];

  const imagePromises =
    allImages.map(function(src) {

      return new Promise(function(resolve) {

        const img = new Image();

        img.onload = resolve;
        img.onerror = resolve;

        img.src = src;

      });

    });


  videoViewer.load();

  bgMusic.load();

  bgMusic2.load();


  Promise.all(imagePromises)
    .then(function() {

      setTimeout(function() {

        loadingScreen.classList.add(
          "hide"
        );

      }, 500);

    });

}


/* =====================================================
   MUSIC 1
===================================================== */

function startMusic1() {

  bgMusic.volume = 0.65;

  bgMusic.currentTime = 0;

  const playPromise =
    bgMusic.play();

  if (playPromise !== undefined) {

    playPromise.catch(function() {

      console.log(
        "Music 1 bị trình duyệt chặn."
      );

    });

  }

}


/* =====================================================
   MUSIC 2
===================================================== */

function startMusic2() {

  bgMusic2.volume = 0.65;

  bgMusic2.currentTime = 0;

  const playPromise =
    bgMusic2.play();

  if (playPromise !== undefined) {

    playPromise.catch(function() {

      console.log(
        "Music 2 bị trình duyệt chặn."
      );

    });

  }

}


/* =====================================================
   CAT CLICK
===================================================== */

envelope.addEventListener(
  "click",
  function() {

    /*
      Lần 1:
      mở mèo
    */

    if (stage === 0) {

      envelope.classList.add(
        "open"
      );

      stage = 1;

      return;
    }


    /*
      Lần 2:
      hoa + nhạc 1
    */

    if (stage === 1) {

      stage = 2;

      envelope.style.pointerEvents =
        "none";

      hint.classList.add(
        "hide"
      );


      /*
        Nhạc 1 bắt đầu
      */

      startMusic1();


      /*
        Hoa
      */

      startFlowerTransition();

    }

  }
);


/* =====================================================
   FLOWER TRANSITION
===================================================== */

function startFlowerTransition() {

  flowerLayer.innerHTML = "";

  flowerLayer.classList.add(
    "active"
  );


  const flowers = [
    "🌸",
    "🌷",
    "🌺",
    "🌹",
    "💐",
    "🌼",
    "🌸"
  ];


  for (
    let i = 0;
    i < 75;
    i++
  ) {

    const flower =
      document.createElement(
        "div"
      );

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
      1.4;


    const y =
      (Math.random() - 0.5) *
      window.innerHeight *
      1.4;


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
      Math.random() * 0.35 +
      "s";


    flowerLayer.appendChild(
      flower
    );

  }


  /*
    Hoa phủ màn hình
  */

  setTimeout(function() {

    flowerLayer.style.transition =
      "opacity .8s ease";

    flowerLayer.style.opacity =
      "0";

  }, 2300);


  /*
    Sau hoa:
    ảnh 1
  */

  setTimeout(function() {

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

  }, 3200);

}


/* =====================================================
   SHOW PRE VIDEO IMAGE
===================================================== */

function showPreVideoImage(
  newIndex
) {

  index = newIndex;

  canNext = false;


  viewer.classList.remove(
    "show"
  );

  viewer.style.visibility =
    "hidden";

  viewer.style.display =
    "block";


  viewer.onload = function() {

    viewer.style.left =
      "50%";

    viewer.style.top =
      "50%";

    viewer.style.filter =
      "none";

    viewer.style.visibility =
      "visible";


    requestAnimationFrame(
      function() {

        requestAnimationFrame(
          function() {

            viewer.classList.add(
              "show"
            );

          }
        );

      }
    );


    setTimeout(function() {

      canNext = true;

    }, 450);

  };


  viewer.src =
    preVideoImages[index];


  stage = 3;

}


/* =====================================================
   SHOW POST QUESTION IMAGE
===================================================== */

function showPostQuestionImage(
  newIndex
) {

  index = newIndex;

  canNext = false;


  viewer.classList.remove(
    "show"
  );

  viewer.style.visibility =
    "hidden";

  viewer.style.display =
    "block";


  viewer.onload = function() {

    viewer.style.left =
      "50%";

    viewer.style.top =
      "50%";

    viewer.style.filter =
      "none";

    viewer.style.visibility =
      "visible";


    requestAnimationFrame(
      function() {

        requestAnimationFrame(
          function() {

            viewer.classList.add(
              "show"
            );

          }
        );

      }
    );


    setTimeout(function() {

      canNext = true;

    }, 450);

  };


  viewer.src =
    postQuestionImages[index];


  stage = 6;


  /*
    Nếu là ảnh 7
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

}


/* =====================================================
   IMAGE CLICK
===================================================== */

viewer.addEventListener(
  "click",
  function() {

    if (!canNext) {
      return;
    }


    /* ===============================================
       1 → 2 → 3
    =============================================== */

    if (stage === 3) {

      canNext = false;

      viewer.classList.remove(
        "show"
      );


      setTimeout(function() {

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


          /*
            Ảnh 3 → video
          */

          playVideo();

        }

      }, 420);


      return;
    }


    /* ===============================================
       ẢNH 7
       → CÒN 1 ĐIỀU NỮA
    =============================================== */

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


      setTimeout(function() {

        viewer.style.display =
          "none";

        oneMoreBox.classList.add(
          "show"
        );

      }, 500);


      return;
    }


    /* ===============================================
       ẢNH 4
       → ẢNH 5
    =============================================== */

    if (
      stage === 6 &&
      index === 1
    ) {

      canNext = false;

      viewer.classList.remove(
        "show"
      );


      setTimeout(function() {

        showPostQuestionImage(
          2
        );

      }, 420);


      return;
    }


    /* ===============================================
       ẢNH 5
       → ẢNH 8
    =============================================== */

    if (
      stage === 6 &&
      index === 2
    ) {

      canNext = false;

      viewer.classList.remove(
        "show"
      );


      setTimeout(function() {

        showPostQuestionImage(
          3
        );

      }, 420);


      return;
    }


    /* ===============================================
       ẢNH 8
       → HẾT...
    =============================================== */

    if (
      stage === 6 &&
      index === 3
    ) {

      canNext = false;

      viewer.classList.remove(
        "show"
      );


      /*
        Music 2 KHÔNG dừng
      */

      setTimeout(function() {

        viewer.style.display =
          "none";

        endBox.classList.add(
          "show"
        );

      }, 600);


      return;
    }

  }
);


/* =====================================================
   VIDEO
===================================================== */

function playVideo() {

  stage = 5;

  canNext = false;

  videoFinished = false;


  /*
    Xóa timer cũ
  */

  if (
    videoCheckTimer !== null
  ) {

    clearInterval(
      videoCheckTimer
    );

    videoCheckTimer = null;

  }


  /*
    Hiện video
  */

  videoViewer.style.display =
    "block";

  videoViewer.classList.remove(
    "video-show"
  );


  /*
    Reset video
  */

  try {

    videoViewer.currentTime = 0;

  } catch (error) {

    console.log(error);

  }


  /*
    Hiệu ứng hiện video
  */

  requestAnimationFrame(
    function() {

      videoViewer.classList.add(
        "video-show"
      );

    }
  );


  /*
    Không có controls
  */

  videoViewer.controls = false;


  /*
    Đợi metadata
  */

  if (
    videoViewer.readyState >= 1
  ) {

    startVideoWatcher();

  } else {

    videoViewer.addEventListener(
      "loadedmetadata",
      startVideoWatcher,
      {
        once: true
      }
    );

  }


  /*
    Phát video
  */

  const playPromise =
    videoViewer.play();


  if (
    playPromise !== undefined
  ) {

    playPromise
      .then(function() {

        startVideoWatcher();

      })
      .catch(function(error) {

        console.log(
          "Không thể tự phát video:",
          error
        );

      });

  }

}


/* =====================================================
   VIDEO WATCHER
===================================================== */

function startVideoWatcher() {

  if (stage !== 5) {
    return;
  }


  /*
    Nếu đã có timer
    thì không tạo thêm
  */

  if (
    videoCheckTimer !== null
  ) {

    return;

  }


  videoCheckTimer =
    setInterval(
      function() {

        /*
          Không còn ở video
        */

        if (stage !== 5) {

          clearInterval(
            videoCheckTimer
          );

          videoCheckTimer = null;

          return;

        }


        const duration =
          videoViewer.duration;

        const currentTime =
          videoViewer.currentTime;


        /*
          Chưa biết duration
        */

        if (
          !duration ||
          !isFinite(duration)
        ) {

          return;

        }


        /*
          Video đã chạy gần hết
        */

        if (
          currentTime >=
          duration - 0.25
        ) {

          goToQuestion();

        }

      },
      100
    );

}


/* =====================================================
   VIDEO END
===================================================== */

/*
  Nếu browser phát event ended
*/

videoViewer.addEventListener(
  "ended",
  function() {

    goToQuestion();

  }
);


/* =====================================================
   VIDEO → QUESTION
===================================================== */

function goToQuestion() {

  /*
    Chống chạy nhiều lần
  */

  if (videoFinished) {
    return;
  }

  videoFinished = true;


  /*
    Dừng timer
  */

  if (
    videoCheckTimer !== null
  ) {

    clearInterval(
      videoCheckTimer
    );

    videoCheckTimer = null;

  }


  /*
    Dừng nhạc 1
  */

  bgMusic.pause();

  bgMusic.currentTime = 0;


  /*
    Fade
  */

  videoFade.classList.add(
    "active"
  );


  /*
    Chuyển sang câu hỏi
  */

  setTimeout(function() {

    videoViewer.pause();

    videoViewer.classList.remove(
      "video-show"
    );

    videoViewer.style.display =
      "none";

    videoViewer.currentTime = 0;


    /*
      Hiện câu hỏi
    */

    questionBox.classList.add(
      "show"
    );

    stage = 4;


    /*
      Bỏ fade
    */

    setTimeout(function() {

      videoFade.classList.remove(
        "active"
      );

    }, 400);

  }, 700);

}


/* =====================================================
   YES BUTTON
===================================================== */

yesBtn.addEventListener(
  "click",
  function() {

    /*
      Đóng câu hỏi
    */

    questionBox.classList.remove(
      "show"
    );


    stopNoButtonMovement();


    /*
      Ảnh 7
    */

    setTimeout(function() {

      showPostQuestionImage(
        0
      );

    }, 600);

  }
);


/* =====================================================
   NO BUTTON
===================================================== */

function moveNoButton() {

  const card =
    questionCard.getBoundingClientRect();

  const button =
    noBtn.getBoundingClientRect();

  const padding = 15;


  const maxX =
    Math.max(
      0,
      card.width -
      button.width -
      padding * 2
    );


  const maxY =
    Math.max(
      0,
      card.height -
      button.height -
      padding * 2
    );


  const x =
    padding +
    Math.random() * maxX;


  const y =
    padding +
    Math.random() * maxY;


  noBtn.style.position =
    "absolute";

  noBtn.style.left =
    x + "px";

  noBtn.style.top =
    y + "px";

  noBtn.style.transform =
    "none";

}


/*
  Desktop:
  rê chuột tới → né
*/

noBtn.addEventListener(
  "mouseenter",
  function() {

    moveNoButton();

  }
);


/*
  Mobile:
  chạm → né
*/

noBtn.addEventListener(
  "touchstart",
  function(event) {

    event.preventDefault();

    moveNoButton();

  },
  {
    passive: false
  }
);


/*
  Nếu click được
  → vẫn né
*/

noBtn.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    moveNoButton();

  }
);


/* =====================================================
   RESET NO BUTTON
===================================================== */

function stopNoButtonMovement() {

  noBtn.style.position = "";

  noBtn.style.left = "";

  noBtn.style.top = "";

  noBtn.style.transform = "";

}


/* =====================================================
   ONE MORE
===================================================== */

oneMoreBtn.addEventListener(
  "click",
  function() {

    /*
      Đóng:
      "Còn 1 điều nữa..."
    */

    oneMoreBox.classList.remove(
      "show"
    );


    /*
      ẢNH 4 + NHẠC 2
    */

    setTimeout(function() {

      showPostQuestionImage(
        1
      );


      /*
        Music 2 bắt đầu
        đúng lúc ảnh 4 hiện
      */

      startMusic2();

    }, 600);

  }
);


/* =====================================================
   INITIALIZE
===================================================== */

preloadEverything();