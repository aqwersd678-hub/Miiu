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
    document.querySelector(".hint");

  const flowerLayer =
    document.getElementById("flowerLayer");

  const viewer =
    document.getElementById("viewer");

  const videoViewer =
    document.getElementById("videoViewer");

  const videoViewer2 =
    document.getElementById("videoViewer2");

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

  /*
    Thứ tự sau câu hỏi:

    7 → 4 → 5 → 8 → 9
  */

  const postQuestionImages = [
    "./7.png",
    "./4.png",
    "./5.png",
    "./8.png",
    "./9.png"
  ];


  /* =====================================================
     STATE
  ===================================================== */

  let catClickCount = 0;

  let imageIndex = 0;

  let postImageIndex = 0;

  let flowerStarted = false;

  let video1Started = false;

  let video2Started = false;

  let answerSending = false;


  /* =====================================================
     BACKGROUND
  ===================================================== */

  function setPageBackground(type) {

    document.body.classList.remove(
      "bg-pink",
      "bg-blue",
      "bg-black"
    );

    if (type === "pink") {
      document.body.classList.add("bg-pink");
    }

    if (type === "blue") {
      document.body.classList.add("bg-blue");
    }

    if (type === "black") {
      document.body.classList.add("bg-black");
    }
  }


  /* =====================================================
     INITIAL BACKGROUND
  ===================================================== */

  setPageBackground("pink");


  /* =====================================================
     LOADING
  ===================================================== */

  window.addEventListener("load", () => {

    setTimeout(() => {

      if (loadingScreen) {
        loadingScreen.classList.add("hide");
      }

    }, 1000);

  });


  /* =====================================================
     PRELOAD
  ===================================================== */

  function preloadImages() {

    [
      ...preVideoImages,
      ...postQuestionImages,
      "./6.png"
    ].forEach(src => {

      const img =
        new Image();

      img.src = src;

    });

  }

  preloadImages();


  /* =====================================================
     PRELOAD VIDEOS
  ===================================================== */

  if (videoViewer) {

    videoViewer.preload = "auto";

  }

  if (videoViewer2) {

    videoViewer2.preload = "auto";

  }


  /* =====================================================
     MUSIC 1
  ===================================================== */

  function startMusic1() {

    if (!bgMusic) return;

    bgMusic.loop = true;

    bgMusic.currentTime = 0;

    const promise =
      bgMusic.play();

    if (promise) {

      promise.catch(() => {
        console.log(
          "Music 1 autoplay bị trình duyệt chặn."
        );
      });

    }

  }


  function stopMusic1() {

    if (!bgMusic) return;

    bgMusic.pause();

    bgMusic.currentTime = 0;

  }


  /* =====================================================
     MUSIC 2
  ===================================================== */

  function startMusic2() {

    if (!bgMusic2) return;

    bgMusic2.loop = true;

    bgMusic2.currentTime = 0;

    const promise =
      bgMusic2.play();

    if (promise) {

      promise.catch(() => {
        console.log(
          "Music 2 autoplay bị trình duyệt chặn."
        );
      });

    }

  }


  function stopMusic2() {

    if (!bgMusic2) return;

    bgMusic2.pause();

    bgMusic2.currentTime = 0;

  }


  /* =====================================================
     MUSIC 3
  ===================================================== */

  function startMusic3() {

    if (!bgMusic3) return;

    bgMusic3.loop = true;

    bgMusic3.currentTime = 0;

    const promise =
      bgMusic3.play();

    if (promise) {

      promise.catch(() => {

        console.log(
          "Music 3 autoplay bị trình duyệt chặn."
        );

      });

    }

  }


  function stopMusic3() {

    if (!bgMusic3) return;

    bgMusic3.pause();

    bgMusic3.currentTime = 0;

  }


  /* =====================================================
     STOP ALL MUSIC
  ===================================================== */

  function stopAllMusic() {

    stopMusic1();

    stopMusic2();

    stopMusic3();

  }


  /* =====================================================
     HIDE HINT
  ===================================================== */

  function hideHint() {

    if (!hint) return;

    hint.classList.add("hide");

  }


  /* =====================================================
     CAT
  ===================================================== */

  if (envelope) {

    envelope.addEventListener("click", () => {

      catClickCount++;

      /* -----------------------------------------------
         LẦN 1
         Mở phong bì
      ----------------------------------------------- */

      if (catClickCount === 1) {

        envelope.classList.add("open");

        hideHint();

        return;

      }


      /* -----------------------------------------------
         LẦN 2
         Hoa + music 1
      ----------------------------------------------- */

      if (catClickCount === 2) {

        startFlowerTransition();

      }

    });

  }


  /* =====================================================
     FLOWER TRANSITION
  ===================================================== */

  function startFlowerTransition() {

    if (flowerStarted) return;

    flowerStarted = true;

    hideHint();

    startMusic1();


    if (envelope) {
      envelope.classList.add("hide");
    }


    if (flowerLayer) {

      flowerLayer.innerHTML = "";

      flowerLayer.classList.add("active");


      const flowers = [
        "🌸",
        "🌷",
        "🌹",
        "🌺",
        "🌼",
        "💮",
        "🌸",
        "🌷",
        "🌺",
        "🌹",
        "🌼",
        "🌸",
        "🌷",
        "🌺",
        "💮",
        "🌸",
        "🌹",
        "🌼",
        "🌷",
        "🌸",
        "🌺",
        "🌹"
      ];


      flowers.forEach((flower, index) => {

        const element =
          document.createElement("div");

        element.className =
          "flower";

        element.textContent =
          flower;

        const angle =
          (Math.PI * 2 * index) /
          flowers.length;

        const distance =
          Math.max(
            window.innerWidth,
            window.innerHeight
          ) * 0.85;

        const x =
          Math.cos(angle) * distance;

        const y =
          Math.sin(angle) * distance;

        const size =
          22 +
          Math.random() * 35;

        const rotation =
          Math.random() * 360 - 180;

        element.style.setProperty(
          "--x",
          `${x}px`
        );

        element.style.setProperty(
          "--y",
          `${y}px`
        );

        element.style.setProperty(
          "--size",
          `${size}px`
        );

        element.style.setProperty(
          "--r",
          `${rotation}deg`
        );

        element.style.animationDelay =
          `${index * 0.035}s`;

        flowerLayer.appendChild(
          element
        );

      });

    }


    /* -----------------------------------------------
       Sau khi hoa bung xong → ảnh 1
    ----------------------------------------------- */

    setTimeout(() => {

      if (flowerLayer) {
        flowerLayer.classList.remove("active");
      }

      showPreVideoImage(0);

    }, 2200);

  }


  /* =====================================================
     SHOW IMAGE 1 - 2 - 3
  ===================================================== */

  function showPreVideoImage(newIndex) {

    setPageBackground("pink");

    imageIndex = newIndex;

    if (!viewer) return;


    /* Đảm bảo video không hiện */

    if (videoViewer) {

      videoViewer.pause();

      videoViewer.classList.remove(
        "video-show"
      );

      videoViewer.style.display =
        "none";

    }


    viewer.src =
      preVideoImages[imageIndex];

    viewer.style.display =
      "block";

    viewer.classList.add("show");

  }


  /* =====================================================
     IMAGE CLICK
  ===================================================== */

  if (viewer) {

    viewer.addEventListener("click", () => {

      /* -----------------------------------------------
         ẢNH 1 → 2
      ----------------------------------------------- */

      if (
        imageIndex <
        preVideoImages.length - 1
      ) {

        imageIndex++;

        showPreVideoImage(
          imageIndex
        );

        return;

      }


      /* -----------------------------------------------
         ẢNH 3 → VIDEO 1
      ----------------------------------------------- */

      startVideo1();

    });

  }


  /* =====================================================
     VIDEO 1
  ===================================================== */

  function startVideo1() {

    if (video1Started) return;

    video1Started = true;


    if (viewer) {

      viewer.classList.remove(
        "show"
      );

      viewer.style.display =
        "none";

    }


    if (!videoViewer) return;


    videoViewer.currentTime = 0;

    videoViewer.style.display =
      "block";

    videoViewer.classList.add(
      "video-show"
    );


    const promise =
      videoViewer.play();

    if (promise) {

      promise.catch(error => {

        console.log(
          "Video 1 không tự phát:",
          error
        );

      });

    }

  }


  /* =====================================================
     VIDEO 1 END
  ===================================================== */

  if (videoViewer) {

    videoViewer.addEventListener(
      "ended",
      () => {

        stopMusic1();

        videoViewer.classList.remove(
          "video-show"
        );

        setTimeout(() => {

          videoViewer.style.display =
            "none";

          showQuestion();

        }, 500);

      }
    );

  }


  /* =====================================================
     QUESTION
  ===================================================== */

  function showQuestion() {

    /*
      Ảnh 6 nằm trong questionBox
      → nền xanh pastel
    */

    setPageBackground("blue");


    if (questionBox) {

      questionBox.classList.add(
        "show"
      );

    }

  }


  /* =====================================================
     YES BUTTON
  ===================================================== */

  if (yesBtn) {

    yesBtn.addEventListener(
      "click",
      () => {

        setPageBackground("blue");

        if (questionBox) {

          questionBox.classList.remove(
            "show"
          );

        }


        /* -------------------------------------------
           Hiện ảnh 7
        ------------------------------------------- */

        postImageIndex = 0;

        showPostQuestionImage(
          postImageIndex
        );


        if (image7Message) {

          setTimeout(() => {

            image7Message.classList.add(
              "show"
            );

          }, 500);

        }

      }
    );

  }


  /* =====================================================
     NO BUTTON
  ===================================================== */

  function moveNoButton() {

    if (!noBtn) return;

    const card =
      questionCard ||
      document.body;


    const cardRect =
      card.getBoundingClientRect();


    const buttonRect =
      noBtn.getBoundingClientRect();


    const maxX =
      Math.max(
        0,
        cardRect.width -
        buttonRect.width -
        20
      );


    const maxY =
      Math.max(
        0,
        cardRect.height -
        buttonRect.height -
        20
      );


    const randomX =
      Math.random() * maxX -
      maxX / 2;


    const randomY =
      Math.random() * maxY -
      maxY / 2;


    noBtn.style.position =
      "absolute";

    noBtn.style.transform =
      `translate(${randomX}px, ${randomY}px)`;

  }


  if (noBtn) {

    noBtn.addEventListener(
      "mouseenter",
      moveNoButton
    );

    noBtn.addEventListener(
      "mouseover",
      moveNoButton
    );

    noBtn.addEventListener(
      "touchstart",
      event => {

        event.preventDefault();

        moveNoButton();

      },
      {
        passive: false
      }
    );

    noBtn.addEventListener(
      "click",
      event => {

        event.preventDefault();

        moveNoButton();

      }
    );

  }


  /* =====================================================
     SHOW POST-QUESTION IMAGES
  ===================================================== */

  function showPostQuestionImage(
    newIndex
  ) {

    postImageIndex = newIndex;


    /*
      7, 4, 5 → xanh
      8, 9 → đen
    */

    if (newIndex <= 2) {

      setPageBackground("blue");

    } else {

      setPageBackground("black");

    }


    if (!viewer) return;


    viewer.src =
      postQuestionImages[
        postImageIndex
      ];

    viewer.style.display =
      "block";

    viewer.classList.add(
      "show"
    );


    /*
      Nếu đang hiện ảnh 7
      thì hiện message
    */

    if (
      postImageIndex === 0 &&
      image7Message
    ) {

      image7Message.classList.add(
        "show"
      );

    } else if (image7Message) {

      image7Message.classList.remove(
        "show"
      );

    }

  }


  /* =====================================================
     POST IMAGE CLICK
  ===================================================== */

  /*
    7 → hiện "Còn 1 điều nữa..."
    4 → 5
    5 → 8
    8 → 9
    9 → video 2
  */

  if (viewer) {

    /*
      Ta dùng một listener riêng thông qua
      state hiện tại.
    */

    viewer.addEventListener(
      "click",
      () => {

        /*
          Nếu đang ở ảnh 1-3,
          listener phía trên đã xử lý.
        */

        if (
          flowerStarted &&
          !video1Started &&
          imageIndex <= 2
        ) {

          return;

        }

      }
    );

  }


  /* =====================================================
     ONE MORE
  ===================================================== */

  if (image7Message) {

    image7Message.addEventListener(
      "click",
      () => {

        showOneMore();

      }
    );

  }


  /*
    Nếu HTML dùng click trực tiếp vào ảnh 7
    thì xử lý bằng viewer ở đây.
  */

  function handlePostImageClick() {

    if (
      postImageIndex === 0
    ) {

      showOneMore();

      return;

    }


    if (
      postImageIndex <
      postQuestionImages.length - 1
    ) {

      postImageIndex++;

      showPostQuestionImage(
        postImageIndex
      );

      return;

    }


    /*
      Ảnh 9 → video 2
    */

    startVideo2();

  }


  /*
    Listener này phân biệt:
    - đang ở ảnh 1-3
    - đang ở ảnh 7-4-5-8-9
  */

  if (viewer) {

    viewer.addEventListener(
      "click",
      () => {

        /*
          Nếu video1 chưa chạy
          và đang ở chuỗi 1-3
        */

        if (
          !video1Started &&
          !video2Started
        ) {

          /*
            imageIndex đang được dùng
            cho chuỗi 1-3
          */

          if (
            imageIndex <
            preVideoImages.length - 1
          ) {

            return;

          }

          /*
            Nếu đã tới ảnh 3,
            listener đầu tiên đã gọi video1.
          */

          return;

        }


        /*
          Nếu video2 chưa chạy
          và đang ở chuỗi 7-4-5-8-9
        */

        if (
          !video2Started &&
          questionBox &&
          !questionBox.classList.contains(
            "show"
          )
        ) {

          /*
            Chỉ xử lý nếu post image
            đang thực sự hiển thị.
          */

          if (
            viewer.src.includes(
              postQuestionImages[
                postImageIndex
              ].replace("./", "")
            )
          ) {

            handlePostImageClick();

          }

        }

      }
    );

  }


  /* =====================================================
     SHOW ONE MORE
  ===================================================== */

  function showOneMore() {

    if (image7Message) {

      image7Message.classList.remove(
        "show"
      );

    }


    if (viewer) {

      viewer.classList.remove(
        "show"
      );

      viewer.style.display =
        "none";

    }


    setPageBackground("blue");


    if (oneMoreBox) {

      oneMoreBox.classList.add(
        "show"
      );

    }

  }


  /* =====================================================
     ONE MORE BUTTON
  ===================================================== */

  if (oneMoreBtn) {

    oneMoreBtn.addEventListener(
      "click",
      () => {

        setPageBackground("blue");


        if (oneMoreBox) {

          oneMoreBox.classList.remove(
            "show"
          );

        }


        /*
          Bắt đầu music2
        */

        stopMusic1();

        startMusic2();


        /*
          Hiện ảnh 4
        */

        postImageIndex = 1;

        showPostQuestionImage(
          postImageIndex
        );

      }
    );

  }


  /* =====================================================
     VIDEO 2
  ===================================================== */

  function startVideo2() {

    if (video2Started) return;

    video2Started = true;


    /*
      Ảnh 9 kết thúc
      → nền đen
      → video2
    */

    setPageBackground("black");


    if (viewer) {

      viewer.classList.remove(
        "show"
      );

      viewer.style.display =
        "none";

    }


    if (videoViewer2) {

      videoViewer2.currentTime = 0;

      videoViewer2.style.display =
        "block";

      videoViewer2.classList.add(
        "video-show"
      );


      const promise =
        videoViewer2.play();

      if (promise) {

        promise.catch(error => {

          console.log(
            "Video 2 không tự phát:",
            error
          );

        });

      }

    }

  }


  /* =====================================================
     VIDEO 2 END
  ===================================================== */

  if (videoViewer2) {

    videoViewer2.addEventListener(
      "ended",
      () => {

        stopMusic2();


        videoViewer2.classList.remove(
          "video-show"
        );


        setTimeout(() => {

          videoViewer2.style.display =
            "none";


          /*
            Hiện "Hết..."
          */

          setPageBackground("black");


          if (endBox) {

            endBox.classList.add(
              "show"
            );

          }


          /*
            Sau 2.2 giây:
            → tắt Hết
            → hiện ô trả lời
            → music3
          */

          setTimeout(() => {

            if (endBox) {

              endBox.classList.remove(
                "show"
              );

            }

            showAnswerBox();

          }, 2200);

        }, 500);

      }
    );

  }


  /* =====================================================
     ANSWER BOX
  ===================================================== */

  function showAnswerBox() {

    /*
      Tắt music2 hoàn toàn
    */

    stopMusic2();


    /*
      Answer section
    */

    if (answerBox) {

      answerBox.classList.add(
        "show"
      );

    }


    /*
      Music3 bắt đầu
    */

    startMusic3();


    /*
      Nếu autoplay bị trình duyệt chặn,
      lần người dùng chạm/nhập vào ô trả lời
      sẽ thử phát lại.
    */

    if (answerBox) {

      const resumeMusic =
        () => {

          if (
            bgMusic3 &&
            bgMusic3.paused
          ) {

            const promise =
              bgMusic3.play();

            if (promise) {

              promise.catch(() => {});

            }

          }

        };


      answerBox.addEventListener(
        "click",
        resumeMusic,
        {
          once: false
        }
      );

      answerBox.addEventListener(
        "touchstart",
        resumeMusic,
        {
          once: false
        }
      );

    }


    if (answerInput) {

      setTimeout(() => {

        answerInput.focus();

      }, 500);

    }

  }


  /* =====================================================
     SEND ANSWER
  ===================================================== */

  if (sendAnswerBtn) {

    sendAnswerBtn.addEventListener(
      "click",
      sendAnswer
    );

  }


  /* =====================================================
     ENTER / CTRL + ENTER
  ===================================================== */

  if (answerInput) {

    answerInput.addEventListener(
      "keydown",
      event => {

        /*
          Ctrl + Enter / Cmd + Enter
        */

        if (
          (event.ctrlKey ||
           event.metaKey) &&
          event.key === "Enter"
        ) {

          event.preventDefault();

          sendAnswer();

        }

      }
    );

  }


  /* =====================================================
     SEND FUNCTION
  ===================================================== */

  async function sendAnswer() {

    if (answerSending) return;

    if (!answerInput) return;


    const answer =
      answerInput.value.trim();


    /*
      Không cho gửi trống
    */

    if (!answer) {

      if (answerStatus) {

        answerStatus.textContent =
          "Viết câu trả lời cho anh đã nhé 💗";

        answerStatus.classList.add(
          "error"
        );

      }

      answerInput.focus();

      return;

    }


    answerSending = true;


    if (answerStatus) {

      answerStatus.classList.remove(
        "error"
      );

      answerStatus.textContent =
        "Đang gửi... 💗";

    }


    if (sendAnswerBtn) {

      sendAnswerBtn.disabled =
        true;

    }

    answerInput.disabled =
      true;


    /*
      Dừng music3 khi gửi
    */

    stopMusic3();


    /*
      Thời gian
    */

    const now =
      new Date();


    const time =
      now.toLocaleString(
        "vi-VN"
      );


    /*
      Dữ liệu gửi
    */

    const formData =
      new URLSearchParams();

    formData.append(
      "answer",
      answer
    );

    formData.append(
      "time",
      time
    );


    try {

      await fetch(
        GOOGLE_SCRIPT_URL,
        {
          method: "POST",

          mode: "no-cors",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded;charset=UTF-8"
          },

          body:
            formData.toString()
        }
      );


      /*
        Vì no-cors không đọc được
        response từ Apps Script,
        fetch resolve = coi như gửi thành công.
      */

      if (answerStatus) {

        answerStatus.classList.remove(
          "error"
        );

        answerStatus.textContent =
          "Đã gửi rồi... 💗";

      }


      /*
        Chờ một chút rồi rời trang
      */

      setTimeout(() => {

        leavePage();

      }, 1500);


    } catch (error) {

      console.error(
        "Lỗi gửi câu trả lời:",
        error
      );


      /*
        Nếu fetch lỗi
      */

      answerSending = false;

      if (sendAnswerBtn) {

        sendAnswerBtn.disabled =
          false;

      }

      answerInput.disabled =
        false;


      /*
        Cho music3 chạy lại
      */

      startMusic3();


      if (answerStatus) {

        answerStatus.classList.add(
          "error"
        );

        answerStatus.textContent =
          "Có lỗi khi gửi, thử lại nhé :(";

      }

    }

  }


  /* =====================================================
     LEAVE PAGE
  ===================================================== */

  function leavePage() {

    /*
      Dừng toàn bộ âm thanh
    */

    stopAllMusic();


    /*
      Dừng video
    */

    if (videoViewer) {

      videoViewer.pause();

    }

    if (videoViewer2) {

      videoViewer2.pause();

    }


    /*
      Thử đóng tab
    */

    try {

      window.open(
        "",
        "_self"
      );

      window.close();

    } catch (error) {

      console.log(
        "Không thể đóng tab:",
        error
      );

    }


    /*
      Một số trình duyệt không cho
      JS đóng tab người dùng mở.

      Fallback:
      biến trang thành trắng.
    */

    setTimeout(() => {

      document.body.innerHTML =
        "";

      document.body.style.background =
        "#ffffff";

      document.title =
        "💗";

    }, 300);

  }


  /* =====================================================
     ERROR LOG
  ===================================================== */

  if (videoViewer) {

    videoViewer.addEventListener(
      "error",
      event => {

        console.error(
          "Video 1 error:",
          event
        );

      }
    );

  }


  if (videoViewer2) {

    videoViewer2.addEventListener(
      "error",
      event => {

        console.error(
          "Video 2 error:",
          event
        );

      }
    );

  }


  if (bgMusic) {

    bgMusic.addEventListener(
      "error",
      event => {

        console.error(
          "Music 1 error:",
          event
        );

      }
    );

  }


  if (bgMusic2) {

    bgMusic2.addEventListener(
      "error",
      event => {

        console.error(
          "Music 2 error:",
          event
        );

      }
    );

  }


  if (bgMusic3) {

    bgMusic3.addEventListener(
      "error",
      event => {

        console.error(
          "Music 3 error:",
          event
        );

      }
    );

  }

});