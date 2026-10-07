/* =====================================================
   STATE
===================================================== */

let stage = 0;

let index = 0;

let canNext = false;

let messageStep = 0;

let noMoveTimer = null;


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

const imageCaption =
  document.getElementById("imageCaption");

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

const messageBox =
  document.getElementById("messageBox");

const messageText =
  document.getElementById("messageText");

const messageNext =
  document.getElementById("messageNext");

const bgMusic =
  document.getElementById("bgMusic");

const bgMusic2 =
  document.getElementById("bgMusic2");


/* =====================================================
   IMAGES
===================================================== */

const preVideoImages = [
  "1.png",
  "2.png",
  "3.png"
];

const postQuestionImages = [
  "7.png",
  "4.png",
  "5.png"
];


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

        loadingScreen.classList.add("hide");

      }, 500);

    });

}


/* =====================================================
   MUSIC
===================================================== */

/*
  MUSIC 1:
  bắt đầu ở click thứ 2 vào mèo
  chạy:
  hoa → ảnh 1 → ảnh 2 → ảnh 3 → video

  Video kết thúc:
  music 1 dừng hoàn toàn.
*/


function startMusic1() {

  bgMusic.volume = 0.65;

  bgMusic.currentTime = 0;

  const playPromise =
    bgMusic.play();

  if (playPromise !== undefined) {

    playPromise.catch(function() {

      console.log(
        "Trình duyệt chặn autoplay music 1."
      );

    });

  }

}


/*
  MUSIC 2:
  chỉ bắt đầu khi ảnh 4 xuất hiện.
*/

function startMusic2() {

  bgMusic2.volume = 0.65;

  bgMusic2.currentTime = 0;

  const playPromise =
    bgMusic2.play();

  if (playPromise !== undefined) {

    playPromise.catch(function() {

      console.log(
        "Không thể phát music 2."
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

      envelope.classList.add("open");

      stage = 1;

      return;
    }


    /*
      Lần 2:
      hoa xuất hiện
      + bắt đầu nhạc 1
    */

    if (stage === 1) {

      stage = 2;

      envelope.style.pointerEvents = "none";

      hint.classList.add("hide");

      startMusic1();

      startFlowerTransition();

    }

  }
);


/* =====================================================
   FLOWER TRANSITION
===================================================== */

function startFlowerTransition() {

  flowerLayer.innerHTML = "";

  flowerLayer.classList.add("active");


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
      document.createElement("div");

    flower.className = "flower";

    flower.innerText =
      flowers[
        Math.floor(
          Math.random() *
          flowers.length
        )
      ];


    const x =
      (Math.random() - .5) *
      window.innerWidth *
      1.4;

    const y =
      (Math.random() - .5) *
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
      Math.random() * .35 + "s";


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

    flowerLayer.style.opacity = "0";

  }, 2300);


  /*
    Sau khi hoa biến mất:
    ảnh 1
  */

  setTimeout(function() {

    flowerLayer.classList.remove(
      "active"
    );

    flowerLayer.style.opacity = "";

    flowerLayer.style.transition = "";

    envelope.classList.add("hide");

    showPreVideoImage(0);

  }, 3200);

}


/* =====================================================
   PRE VIDEO IMAGE
===================================================== */

function showPreVideoImage(newIndex) {

  index = newIndex;

  canNext = false;

  imageCaption.classList.remove("show");

  viewer.classList.remove("show");

  viewer.style.visibility = "hidden";

  viewer.style.display = "block";


  viewer.onload =
    function() {

      viewer.style.left = "50%";

      viewer.style.top = "50%";

      viewer.style.filter = "none";

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


      setTimeout(
        function() {

          canNext = true;

        },
        450
      );

    };


  viewer.src =
    preVideoImages[index];


  stage = 3;
}


/* =====================================================
   POST QUESTION IMAGE
===================================================== */

function showPostQuestionImage(
  newIndex
) {

  index = newIndex;

  canNext = false;

  imageCaption.classList.remove(
    "show"
  );

  viewer.classList.remove(
    "show"
  );

  viewer.style.visibility =
    "hidden";

  viewer.style.display =
    "block";


  viewer.onload =
    function() {

      viewer.style.left = "50%";

      viewer.style.top = "50%";

      viewer.style.filter = "none";

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


      setTimeout(
        function() {

          canNext = true;

        },
        450
      );

    };


  viewer.src =
    postQuestionImages[index];


  stage = 6;
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


    /*
      ẢNH 1 → 2 → 3
    */

    if (stage === 3) {

      canNext = false;

      viewer.classList.remove(
        "show"
      );

      imageCaption.classList.remove(
        "show"
      );

      setTimeout(
        function() {

          index++;

          if (
            index <
            preVideoImages.length
          ) {

            showPreVideoImage(
              index
            );

          } else {

            /*
              Đã qua ảnh 3
              → video
            */

            viewer.style.display =
              "none";

            playVideo();

          }

        },
        420
      );

      return;
    }


    /*
      SAU YES:
      ẢNH 7 → message
    */

    if (
      stage === 6 &&
      index === 0
    ) {

      canNext = false;

      viewer.classList.remove(
        "show"
      );

      setTimeout(
        function() {

          viewer.style.display =
            "none";

          showMessageStep1();

        },
        420
      );

      return;
    }


    /*
      ẢNH 4 → ẢNH 5
    */

    if (
      stage === 6 &&
      index === 1
    ) {

      canNext = false;

      viewer.classList.remove(
        "show"
      );

      setTimeout(
        function() {

          showPostQuestionImage(
            2
          );

        },
        420
      );

      return;
    }


    /*
      ẢNH 5
      → kết thúc
    */

    if (
      stage === 6 &&
      index === 2
    ) {

      canNext = false;

      /*
        Giữ ảnh 5 trên màn hình.
        Nhạc 2 vẫn tiếp tục.
      */

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


  /*
    Đảm bảo nhạc 1 đang chạy
    thì vẫn chạy trong video.
  */

  videoViewer.currentTime = 0;

  videoViewer.style.display =
    "block";


  requestAnimationFrame(
    function() {

      videoViewer.classList.add(
        "video-show"
      );

    }
  );


  const playPromise =
    videoViewer.play();

  if (
    playPromise !== undefined
  ) {

    playPromise.catch(
      function(error) {

        console.log(
          "Không thể tự phát video:",
          error
        );

      }
    );

  }


  /*
    Thử fullscreen trên thiết bị
    hỗ trợ.
  */

  setTimeout(
    function() {

      if (
        videoViewer.requestFullscreen
      ) {

        videoViewer
          .requestFullscreen()
          .catch(
            function() {}
          );

      }

    },
    200
  );

}


/* =====================================================
   VIDEO END
===================================================== */

videoViewer.addEventListener(
  "ended",
  function() {

    /*
      NHẠC 1 DỪNG NGAY
    */

    bgMusic.pause();

    bgMusic.currentTime = 0;


    /*
      Fade video
    */

    videoFade.classList.add(
      "active"
    );


    /*
      Thoát fullscreen
    */

    if (
      document.fullscreenElement
    ) {

      document
        .exitFullscreen()
        .catch(
          function() {}
        );

    }


    setTimeout(
      function() {

        videoViewer.pause();

        videoViewer.currentTime = 0;

        videoViewer.classList.remove(
          "video-show"
        );

        videoViewer.style.display =
          "none";


        /*
          Hiện câu hỏi
        */

        questionBox.classList.add(
          "show"
        );

        stage = 4;


        setTimeout(
          function() {

            videoFade.classList.remove(
              "active"
            );

          },
          500
        );

      },
      850
    );

  }
);


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


    /*
      Dừng việc chạy nút NON'T
    */

    stopNoButtonMovement();


    /*
      Hiện ảnh 7
    */

    setTimeout(
      function() {

        showPostQuestionImage(
          0
        );

      },
      650
    );

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


  /*
    Khoảng cách an toàn
    để nút không bay khỏi màn hình
  */

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


  /*
    Đổi sang absolute
    để nó chạy trong card
  */

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
  Nếu rê chuột đến:
  nó cũng né luôn :))
*/

noBtn.addEventListener(
  "mouseenter",
  function() {

    moveNoButton();

  }
);


/*
  Mobile:
  chạm vào là nó chạy.
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
  Nếu bằng cách nào đó vẫn click được:
  nó tiếp tục chạy.
*/

noBtn.addEventListener(
  "click",
  function(event) {

    event.preventDefault();

    moveNoButton();

  }
);


/* =====================================================
   MESSAGE
===================================================== */

function showMessageStep1() {

  messageStep = 1;

  messageText.innerText =
    "Cảm ơn công chúa đã tham gia 💗";

  messageNext.innerText =
    "Tiếp tục ✨";

  messageBox.classList.add(
    "show"
  );

}


/*
  Sau khi bấm:
  "Cảm ơn công chúa đã tham gia"
  → hiện:
  "Còn 1 điều nữa..."
*/

messageNext.addEventListener(
  "click",
  function() {

    if (messageStep === 1) {

      messageStep = 2;

      messageText.innerText =
        "Còn 1 điều nữa...";

      messageNext.innerText =
        "Xem tiếp 💗";

      return;
    }


    /*
      Sau "Còn 1 điều nữa..."
      → ảnh 4
      → NHẠC 2 BẮT ĐẦU
    */

    if (messageStep === 2) {

      messageBox.classList.remove(
        "show"
      );


      setTimeout(
        function() {

          /*
            Ảnh 4 là index 1
            trong postQuestionImages

            [0] = 7.png
            [1] = 4.png
            [2] = 5.png
          */

          showPostQuestionImage(
            1
          );


          /*
            NHẠC 2 CHỈ BẮT ĐẦU
            TẠI ĐÂY
          */

          startMusic2();

        },
        600
      );

    }

  }
);


/* =====================================================
   STOP NO BUTTON MOVEMENT
===================================================== */

function stopNoButtonMovement() {

  noBtn.style.position = "";

  noBtn.style.left = "";

  noBtn.style.top = "";

  noBtn.style.transform = "";

}


/* =====================================================
   INITIALIZE
===================================================== */

preloadEverything();