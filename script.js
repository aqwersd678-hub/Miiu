/* =========================================================
   FOR MY PRINCESS
   COMPLETE SCRIPT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

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
       STATE

       0 = ban đầu
       1 = mèo mở
       2 = hoa
       3 = ảnh 1-2-3
       4 = câu hỏi
       5 = video 1
       6 = ảnh 7-4-5-8-9
       7 = video 2
       8 = Hết
       9 = câu trả lời
    ===================================================== */

    let stage = 0;

    let index = 0;

    let canNext = false;

    let videoFinished = false;

    let video2Finished = false;

    let videoWatcher = null;

    let video2Watcher = null;


    /* =====================================================
       IMAGE LIST
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
      "./9.png"
    ];


    /* =====================================================
       LOADING
    ===================================================== */

    setTimeout(
      function () {

        console.log(
          "✅ Loading hoàn tất"
        );

        loadingScreen.classList.add(
          "hide"
        );

        setTimeout(
          function () {

            loadingScreen.style.opacity =
              "0";

            loadingScreen.style.pointerEvents =
              "none";

          },
          700
        );

      },
      1000
    );


    /* =====================================================
       PRELOAD IMAGES
    ===================================================== */

    const preloadList = [
      ...preVideoImages,
      ...postQuestionImages,
      "./6.png"
    ];


    preloadList.forEach(
      function (src) {

        const img =
          new Image();

        img.src = src;

      }
    );


    /* =====================================================
       PRELOAD VIDEOS
    ===================================================== */

    videoViewer.load();
    videoViewer2.load();


    /* =====================================================
       MUSIC 1
       music.mp3
    ===================================================== */

    function startMusic1() {

      console.log(
        "🎵 music.mp3 START"
      );

      bgMusic.volume =
        0.65;

      try {

        bgMusic.currentTime =
          0;

      } catch (error) {}


      const promise =
        bgMusic.play();


      if (promise) {

        promise.catch(
          function (error) {

            console.log(
              "Không phát được music.mp3:",
              error
            );

          }
        );

      }

    }


    function stopMusic1() {

      console.log(
        "⏹ music.mp3 STOP"
      );

      bgMusic.pause();

      try {

        bgMusic.currentTime =
          0;

      } catch (error) {}

    }


    /* =====================================================
       MUSIC 2
       music2.mp3

       Chạy:
       ảnh 4 → 5 → 8 → 9 → video 2 → Hết...
    ===================================================== */

    function startMusic2() {

      console.log(
        "🎵 music2.mp3 START"
      );

      bgMusic2.volume =
        0.65;

      const promise =
        bgMusic2.play();


      if (promise) {

        promise.catch(
          function (error) {

            console.log(
              "Không phát được music2.mp3:",
              error
            );

          }
        );

      }

    }


    function stopMusic2() {

      console.log(
        "⏹ music2.mp3 STOP"
      );

      bgMusic2.pause();

      try {

        bgMusic2.currentTime =
          0;

      } catch (error) {}

    }


    /* =====================================================
       MUSIC 3
       music3.mp3

       Chạy:
       Câu trả lời của em...
       → Gửi
    ===================================================== */

    function startMusic3() {

      console.log(
        "🎵 music3.mp3 START"
      );

      bgMusic3.volume =
        0.65;

      try {

        bgMusic3.currentTime =
          0;

      } catch (error) {}


      const promise =
        bgMusic3.play();


      if (promise) {

        promise.catch(
          function (error) {

            console.log(
              "Không phát được music3.mp3:",
              error
            );

          }
        );

      }

    }


    function stopMusic3() {

      console.log(
        "⏹ music3.mp3 STOP"
      );

      bgMusic3.pause();

      try {

        bgMusic3.currentTime =
          0;

      } catch (error) {}

    }


    /* =====================================================
       CAT
    ===================================================== */

    envelope.addEventListener(
      "click",
      function () {

        console.log(
          "🐱 Click mèo:",
          stage
        );


        /* -------------------------------------------------
           LẦN 1
        ------------------------------------------------- */

        if (stage === 0) {

          envelope.classList.add(
            "open"
          );

          stage = 1;

          return;

        }


        /* -------------------------------------------------
           LẦN 2
        ------------------------------------------------- */

        if (stage === 1) {

          stage = 2;

          envelope.style.pointerEvents =
            "none";


          if (hint) {

            hint.classList.add(
              "hide"
            );

          }


          startMusic1();

          startFlowerTransition();

        }

      }
    );


    /* =====================================================
       FLOWERS
    ===================================================== */

    function startFlowerTransition() {

      flowerLayer.innerHTML =
        "";

      flowerLayer.classList.add(
        "active"
      );


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
          (
            Math.random() -
            0.5
          ) *
          window.innerWidth *
          1.5;


        const y =
          (
            Math.random() -
            0.5
          ) *
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


      /* -------------------------------------------------
         FADE HOA
      ------------------------------------------------- */

      setTimeout(
        function () {

          flowerLayer.style.transition =
            "opacity 0.8s ease";

          flowerLayer.style.opacity =
            "0";

        },
        2200
      );


      /* -------------------------------------------------
         ẢNH 1
      ------------------------------------------------- */

      setTimeout(
        function () {

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

          showPreVideoImage(
            0
          );

        },
        3100
      );

    }


    /* =====================================================
       SHOW PRE VIDEO IMAGE
    ===================================================== */

    function showPreVideoImage(
      newIndex
    ) {

      index =
        newIndex;

      canNext =
        false;

      viewer.classList.remove(
        "show"
      );

      viewer.style.display =
        "block";

      viewer.style.visibility =
        "hidden";

      viewer.onload =
        null;


      viewer.onload =
        function () {

          viewer.style.visibility =
            "visible";

          requestAnimationFrame(
            function () {

              requestAnimationFrame(
                function () {

                  viewer.classList.add(
                    "show"
                  );

                }
              );

            }
          );


          setTimeout(
            function () {

              canNext =
                true;

            },
            500
          );

        };


      viewer.onerror =
        function () {

          console.error(
            "Không tải được:",
            preVideoImages[index]
          );

          canNext =
            true;

        };


      viewer.src =
        preVideoImages[index];

      stage =
        3;


      console.log(
        "🖼️",
        preVideoImages[index]
      );

    }


    /* =====================================================
       SHOW POST QUESTION IMAGE
    ===================================================== */

    function showPostQuestionImage(
      newIndex
    ) {

      index =
        newIndex;

      canNext =
        false;

      viewer.classList.remove(
        "show"
      );

      viewer.style.display =
        "block";

      viewer.style.visibility =
        "hidden";

      viewer.onload =
        null;


      viewer.onload =
        function () {

          viewer.style.visibility =
            "visible";

          requestAnimationFrame(
            function () {

              requestAnimationFrame(
                function () {

                  viewer.classList.add(
                    "show"
                  );

                }
              );

            }
          );


          setTimeout(
            function () {

              canNext =
                true;

            },
            500
          );

        };


      viewer.onerror =
        function () {

          console.error(
            "Không tải được:",
            postQuestionImages[index]
          );

          canNext =
            true;

        };


      viewer.src =
        postQuestionImages[index];

      stage =
        6;


      /*
        Chỉ ảnh 7 có dòng này.
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
        "🖼️",
        postQuestionImages[index]
      );

    }


    /* =====================================================
       IMAGE CLICK
    ===================================================== */

    viewer.addEventListener(
      "click",
      function () {

        if (!canNext) {
          return;
        }


        /* ================================================
           1 → 2 → 3 → VIDEO 1
        ================================================ */

        if (stage === 3) {

          canNext =
            false;

          viewer.classList.remove(
            "show"
          );


          setTimeout(
            function () {

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

                playVideo1();

              }

            },
            450
          );


          return;

        }


        /* ================================================
           7 → CÒN 1 ĐIỀU NỮA
        ================================================ */

        if (
          stage === 6 &&
          index === 0
        ) {

          canNext =
            false;

          viewer.classList.remove(
            "show"
          );

          image7Message.classList.remove(
            "show"
          );


          setTimeout(
            function () {

              viewer.style.display =
                "none";

              oneMoreBox.classList.add(
                "show"
              );

            },
            500
          );


          return;

        }


        /* ================================================
           4 → 5
        ================================================ */

        if (
          stage === 6 &&
          index === 1
        ) {

          canNext =
            false;

          viewer.classList.remove(
            "show"
          );


          setTimeout(
            function () {

              showPostQuestionImage(
                2
              );

            },
            450
          );


          return;

        }


        /* ================================================
           5 → 8
        ================================================ */

        if (
          stage === 6 &&
          index === 2
        ) {

          canNext =
            false;

          viewer.classList.remove(
            "show"
          );


          setTimeout(
            function () {

              showPostQuestionImage(
                3
              );

            },
            450
          );


          return;

        }


        /* ================================================
           8 → 9
        ================================================ */

        if (
          stage === 6 &&
          index === 3
        ) {

          canNext =
            false;

          viewer.classList.remove(
            "show"
          );


          setTimeout(
            function () {

              showPostQuestionImage(
                4
              );

            },
            450
          );


          return;

        }


        /* ================================================
           9 → VIDEO 2
        ================================================ */

        if (
          stage === 6 &&
          index === 4
        ) {

          canNext =
            false;

          viewer.classList.remove(
            "show"
          );


          setTimeout(
            function () {

              viewer.style.display =
                "none";

              playVideo2();

            },
            450
          );


          return;

        }

      }
    );


    /* =====================================================
       VIDEO 1
    ===================================================== */

    function playVideo1() {

      console.log(
        "🎬 VIDEO 1 START"
      );


      stage =
        5;

      canNext =
        false;

      videoFinished =
        false;


      if (videoWatcher) {

        clearInterval(
          videoWatcher
        );

        videoWatcher =
          null;

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


      requestAnimationFrame(
        function () {

          videoViewer.classList.add(
            "video-show"
          );

        }
      );


      const promise =
        videoViewer.play();


      if (promise) {

        promise.catch(
          function (error) {

            console.error(
              "Video 1 không phát:",
              error
            );

          }
        );

      }


      startVideo1Watcher();

    }


    /* =====================================================
       VIDEO 1 WATCHER
    ===================================================== */

    function startVideo1Watcher() {

      if (videoWatcher) {

        clearInterval(
          videoWatcher
        );

      }


      videoWatcher =
        setInterval(
          function () {

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
              Number.isFinite(
                duration
              ) &&
              duration > 0
            ) {

              if (
                duration -
                currentTime <=
                0.25
              ) {

                clearInterval(
                  videoWatcher
                );

                videoWatcher =
                  null;

                goToQuestion();

              }

            }

          },
          100
        );

    }


    /* =====================================================
       VIDEO 1 ENDED
    ===================================================== */

    videoViewer.addEventListener(
      "ended",
      function () {

        goToQuestion();

      }
    );


    /* =====================================================
       VIDEO 1 → QUESTION
    ===================================================== */

    function goToQuestion() {

      if (videoFinished) {
        return;
      }


      videoFinished =
        true;


      console.log(
        "➡️ VIDEO 1 → QUESTION"
      );


      if (videoWatcher) {

        clearInterval(
          videoWatcher
        );

        videoWatcher =
          null;

      }


      stopMusic1();


      videoFade.classList.add(
        "active"
      );


      setTimeout(
        function () {

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


          questionBox.classList.add(
            "show"
          );

          stage =
            4;


          setTimeout(
            function () {

              videoFade.classList.remove(
                "active"
              );

            },
            400
          );

        },
        700
      );

    }


    /* =====================================================
       YES
    ===================================================== */

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


        setTimeout(
          function () {

            showPostQuestionImage(
              0
            );

          },
          600
        );

      }
    );


    /* =====================================================
       NO BUTTON
    ===================================================== */

    function moveNoButton() {

      const cardRect =
        questionCard.getBoundingClientRect();


      const buttonRect =
        noBtn.getBoundingClientRect();


      const padding =
        15;


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


    /* =====================================================
       ONE MORE
    ===================================================== */

    oneMoreBtn.addEventListener(
      "click",
      function () {

        console.log(
          "➡️ XEM TIẾP"
        );


        oneMoreBox.classList.remove(
          "show"
        );


        setTimeout(
          function () {

            /*
              ẢNH 4
            */

            showPostQuestionImage(
              1
            );


            /*
              MUSIC 2 BẮT ĐẦU
            */

            startMusic2();

          },
          600
        );

      }
    );


    /* =====================================================
       VIDEO 2
    ===================================================== */

    function playVideo2() {

      console.log(
        "🎬 VIDEO 2 START"
      );


      stage =
        7;

      canNext =
        false;

      video2Finished =
        false;


      if (video2Watcher) {

        clearInterval(
          video2Watcher
        );

        video2Watcher =
          null;

      }


      videoViewer2.style.display =
        "block";

      videoViewer2.classList.remove(
        "video-show"
      );

      videoViewer2.controls =
        false;


      try {

        videoViewer2.currentTime =
          0;

      } catch (error) {}


      requestAnimationFrame(
        function () {

          videoViewer2.classList.add(
            "video-show"
          );

        }
      );


      const promise =
        videoViewer2.play();


      if (promise) {

        promise.catch(
          function (error) {

            console.error(
              "Video 2 không phát:",
              error
            );

          }
        );

      }


      startVideo2Watcher();

    }


    /* =====================================================
       VIDEO 2 WATCHER
    ===================================================== */

    function startVideo2Watcher() {

      if (video2Watcher) {

        clearInterval(
          video2Watcher
        );

      }


      video2Watcher =
        setInterval(
          function () {

            if (
              stage !== 7 ||
              video2Finished
            ) {

              return;

            }


            const duration =
              videoViewer2.duration;


            const currentTime =
              videoViewer2.currentTime;


            if (
              Number.isFinite(
                duration
              ) &&
              duration > 0
            ) {

              if (
                duration -
                currentTime <=
                0.25
              ) {

                clearInterval(
                  video2Watcher
                );

                video2Watcher =
                  null;

                finishVideo2();

              }

            }

          },
          100
        );

    }


    /* =====================================================
       VIDEO 2 ENDED
    ===================================================== */

    videoViewer2.addEventListener(
      "ended",
      function () {

        finishVideo2();

      }
    );


    /* =====================================================
       VIDEO 2 → HẾT
    ===================================================== */

    function finishVideo2() {

      if (video2Finished) {
        return;
      }


      video2Finished =
        true;


      console.log(
        "➡️ VIDEO 2 → HẾT"
      );


      if (video2Watcher) {

        clearInterval(
          video2Watcher
        );

        video2Watcher =
          null;

      }


      videoViewer2.pause();

      videoViewer2.classList.remove(
        "video-show"
      );

      videoViewer2.style.display =
        "none";


      try {

        videoViewer2.currentTime =
          0;

      } catch (error) {}


      /*
        MUSIC 2 DỪNG Ở ĐÂY
      */

      stopMusic2();


      stage =
        8;


      /*
        HẾT...
      */

      endBox.classList.add(
        "show"
      );


      /*
        Sau khoảng 2 giây
        hiện ô trả lời.
      */

      setTimeout(
        function () {

          endBox.classList.remove(
            "show"
          );

          showAnswerBox();

        },
        2200
      );

    }


    /* =====================================================
       ANSWER BOX
    ===================================================== */

    function showAnswerBox() {

      console.log(
        "💌 Hiện answer box"
      );


      stage =
        9;


      answerBox.classList.add(
        "show"
      );


      /*
        MUSIC 3 BẮT ĐẦU
      */

      startMusic3();


      setTimeout(
        function () {

          answerInput.focus();

        },
        500
      );

    }


    /* =====================================================
       SEND ANSWER
    ===================================================== */

    sendAnswerBtn.addEventListener(
      "click",
      function () {

        sendAnswer();

      }
    );


    /* =====================================================
       CTRL + ENTER
    ===================================================== */

    answerInput.addEventListener(
      "keydown",
      function (event) {

        if (
          event.ctrlKey &&
          event.key === "Enter"
        ) {

          sendAnswer();

        }

      }
    );


    /* =====================================================
       SEND FUNCTION
    ===================================================== */

    async function sendAnswer() {

      const answer =
        answerInput.value.trim();


      /*
        Không cho gửi rỗng.
      */

      if (!answer) {

        answerStatus.innerText =
          "Em viết gì đó rồi hãy gửi nhé 💗";

        answerStatus.classList.add(
          "error"
        );

        answerInput.focus();

        return;

      }


      /*
        Đang gửi
      */

      sendAnswerBtn.disabled =
        true;

      answerInput.disabled =
        true;


      answerStatus.classList.remove(
        "error"
      );


      answerStatus.innerText =
        "Đang gửi câu trả lời... 💗";


      console.log(
        "📨 Đang gửi:",
        answer
      );


      /*
        Nếu chưa cài Google Script
      */

      if (
        !GOOGLE_SCRIPT_URL ||
        GOOGLE_SCRIPT_URL.includes(
          "DAN_URL_GOOGLE_APPS_SCRIPT"
        )
      ) {

        console.warn(
          "⚠️ Chưa cấu hình Google Apps Script"
        );


        answerStatus.innerText =
          "Chưa kết nối nơi nhận câu trả lời.";

        sendAnswerBtn.disabled =
          false;

        answerInput.disabled =
          false;

        return;

      }


      try {

        /*
          Gửi dữ liệu.
        */

        const formData =
          new URLSearchParams();


        formData.append(
          "answer",
          answer
        );


        formData.append(
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

            body:
              formData.toString()
          }
        );


        /*
          no-cors không cho đọc response,
          nên nếu request không bị lỗi
          thì coi như đã gửi.
        */

        answerStatus.innerText =
          "Đã gửi rồi... 💗";


        console.log(
          "✅ Đã gửi câu trả lời"
        );


        /*
          Cho cô ấy thấy thông báo
          khoảng 1.5 giây.
        */

        setTimeout(
          function () {

            leavePage();

          },
          1500
        );


      } catch (error) {

        console.error(
          "❌ Gửi thất bại:",
          error
        );


        answerStatus.innerText =
          "Có lỗi rồi, thử gửi lại nhé 😭";


        answerStatus.classList.add(
          "error"
        );


        sendAnswerBtn.disabled =
          false;

        answerInput.disabled =
          false;

      }

    }


    /* =====================================================
       LEAVE PAGE
    ===================================================== */

    function leavePage() {

      /*
        Dừng toàn bộ nhạc.
      */

      stopMusic1();
      stopMusic2();
      stopMusic3();


      /*
        Thử đóng tab.
      */

      try {

        window.open(
          "",
          "_self"
        );

        window.close();

      } catch (error) {}


      /*
        Chrome có thể chặn window.close()
        nếu tab không được script mở.

        Vì vậy dùng fallback:
        biến trang thành màn hình trắng.
      */

      setTimeout(
        function () {

          document.body.innerHTML =
            "";

          document.body.style.background =
            "#ffffff";

          document.title =
            "💗";


          try {

            window.close();

          } catch (error) {}

        },
        300
      );

    }


    /* =====================================================
       VIDEO ERROR
    ===================================================== */

    videoViewer.addEventListener(
      "error",
      function () {

        console.error(
          "❌ Không tải được video.mp4"
        );

      }
    );


    videoViewer2.addEventListener(
      "error",
      function () {

        console.error(
          "❌ Không tải được video2.mp4"
        );

      }
    );


    /* =====================================================
       AUDIO ERROR
    ===================================================== */

    bgMusic.addEventListener(
      "error",
      function () {

        console.error(
          "❌ Không tải được music.mp3"
        );

      }
    );


    bgMusic2.addEventListener(
      "error",
      function () {

        console.error(
          "❌ Không tải được music2.mp3"
        );

      }
    );


    bgMusic3.addEventListener(
      "error",
      function () {

        console.error(
          "❌ Không tải được music3.mp3"
        );

      }
    );


    /* =====================================================
       READY
    ===================================================== */

    console.log(
      "✅ Website đã sẵn sàng"
    );

  }
);