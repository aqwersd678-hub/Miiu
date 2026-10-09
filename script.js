document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  // Dán URL Web App của Google Apps Script đã deploy vào đây nếu URL thay đổi.
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxrp8dpTqUYlt8OFPcKp2rXsR20Z5zTNbs_MfuXTSq67vtiuS0P9ljHwGhK_Ng6o4xV9g/exec';
  const $ = id => document.getElementById(id);
  const loading = $('loadingScreen'), cat = $('envelope'), hint = $('hint');
  const flowers = $('flowerLayer'), viewer = $('viewer');
  const video1 = $('videoViewer'), video2 = $('videoViewer2');
  const question = $('questionBox'), yes = $('yesBtn'), no = $('noBtn');
  const message7 = $('image7Message'), oneMore = $('oneMoreBox');
  const end = $('endBox'), confession = $('confessionBox'), answerBox = $('answerBox');
  const answerInput = $('answerInput'), answerStatus = $('answerStatus'), sendBtn = $('sendAnswerBtn');
  const music1 = $('bgMusic'), music2 = $('bgMusic2'), music3 = $('bgMusic3');
  const before = ['./1.png','./2.png','./3.png'];
  const after = ['./7.png','./4.png','./5.png','./8.png','./9.png','./10.png'];
  let stage = 'cat', catClicks = 0, beforeIndex = 0, afterIndex = 0;
  let changingImage = false;
  let imageToken = 0;

  // Không phụ thuộc vào tải video/nhạc, tránh Loading bị treo.
  window.setTimeout(() => loading.classList.add('hide'), 650);
  const background = name => {
    document.body.classList.remove('bg-pink','bg-blue','bg-black');
    document.body.classList.add('bg-' + name);
  };
  const stop = audio => {
    if (!audio) return;
    audio.pause();
    try { audio.currentTime = 0; } catch (_) {}
  };
  const play = audio => {
    if (!audio) return;
    audio.play().catch(err => console.info('Trình duyệt chưa cho phát audio:', err.message));
  };
  function burst() {
    const icons = ['🌸','🌷','💗','✨','🌺'];
    for (let i = 0; i < 65; i++) {
      const f = document.createElement('span');
      f.className = 'flower';
      f.textContent = icons[Math.floor(Math.random() * icons.length)];
      f.style.setProperty('--size', (12 + Math.random() * 18) + 'px');
      f.style.setProperty('--x', ((Math.random() - .5) * window.innerWidth * 1.65) + 'px');
      f.style.setProperty('--y', ((Math.random() - .5) * window.innerHeight * 1.65) + 'px');
      f.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      f.style.animationDelay = (Math.random() * .5) + 's';
      flowers.appendChild(f);
      setTimeout(() => f.remove(), 3500);
    }
  }
  // Only one IMG exists. Finish loading before swapping to prevent frame overlap.
  async function showImage(path, bg) {
    if (!viewer) return;
    const token = ++imageToken;
    changingImage = true;
    viewer.classList.remove('show');
    viewer.style.visibility = 'hidden';

    const preloaded = new Image();
    try {
      preloaded.src = path;
      if (preloaded.decode) {
        await preloaded.decode();
      } else {
        await new Promise((resolve, reject) => {
          if (preloaded.complete) return preloaded.naturalWidth ? resolve() : reject(new Error(path));
          preloaded.onload = resolve;
          preloaded.onerror = reject;
        });
      }
      if (token !== imageToken) return;
      viewer.classList.toggle('final-photo', path === './9.png' || path === './10.png');
      viewer.src = path;
      background(bg);
      viewer.style.visibility = 'visible';
      viewer.classList.add('show');
      const warning = document.getElementById('assetWarning');
      if (warning) warning.hidden = true;
    } catch (err) {
      if (token !== imageToken) return;
      console.error('Không tải được ảnh', path, err);
      const warning = document.getElementById('assetWarning');
      if (warning) {
        warning.hidden = false;
        warning.textContent = 'Không tải được ' + path + '. Kiểm tra tên ảnh và đường dẫn.';
      }
    } finally {
      if (token === imageToken) changingImage = false;
    }
  }
  function hideImage() {
    ++imageToken;
    changingImage = false;
    viewer.classList.remove('show');
    viewer.style.visibility = 'hidden';
  }
  function nextImage() {
    if (changingImage) return;
    if (stage === 'before') {
      if (beforeIndex < before.length - 1) {
        showImage(before[++beforeIndex], 'pink');
      } else {
        startVideo1();
      }
    } else if (stage === 'after') {
      if (afterIndex === 0) {
        stage = 'oneMore'; hideImage(); message7.classList.remove('show');
        background('pink'); oneMore.classList.add('show');
      } else if (afterIndex < after.length - 1) {
        afterIndex++;
        showImage(after[afterIndex], afterIndex < 3 ? 'blue' : 'black');
      } else {
        // Chạm ảnh 10 để phát video 2.
        startVideo2();
      }
    }
  }
  cat.addEventListener('click', () => {
    if (stage !== 'cat') return;
    if (++catClicks === 1) {
      cat.classList.add('open'); hint.classList.add('hide');
      hint.textContent = 'Chạm thêm lần nữa nhé...';
    } else if (catClicks === 2) {
      burst(); cat.classList.add('hide');
      setTimeout(() => {
        stage = 'before'; beforeIndex = 0;
        showImage(before[0], 'pink'); play(music1);
      }, 900);
    }
  });
  viewer.addEventListener('click', nextImage);
  viewer.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextImage(); }
  });
  // Match the actual video aspect ratio instead of forcing 94vw x 82dvh.
  function fitVideoToFrame(video) {
    if (!video) return;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;
    const maxWidth = Math.min(window.innerWidth * 0.94, 1360);
    const maxHeight = window.innerHeight * 0.82;
    const borderSpace = 14; // 7px border on both sides
    const availableWidth = maxWidth - borderSpace;
    const availableHeight = maxHeight - borderSpace;
    const scale = Math.min(availableWidth / vw, availableHeight / vh);
    const width = Math.max(1, vw * scale + borderSpace);
    const height = Math.max(1, vh * scale + borderSpace);
    video.style.width = width + 'px';
    video.style.height = height + 'px';
  }
  [video1, video2].forEach(video => {
    if (!video) return;
    video.addEventListener('loadedmetadata', () => fitVideoToFrame(video));
  });
  window.addEventListener('resize', () => {
    if (stage === 'video1') fitVideoToFrame(video1);
    if (stage === 'video2') fitVideoToFrame(video2);
  });

  function videoFallback(video, next) {
    video.addEventListener('ended', next);
    video.addEventListener('error', () => {
      console.warn('Không tải được video:', video.currentSrc);
      next();
    }, {once:true});
    video.play().catch(() => {
      // Video có thể bị chặn tự phát tiếng trên iOS; thử phát không tiếng.
      video.muted = true;
      video.play().catch(() => {
        video.controls = true;
        video.style.pointerEvents = 'auto';
        console.warn('Chạm nút Play trong video để tiếp tục.');
      });
    });
  }
  function startVideo1() {
    stage = 'video1'; hideImage(); background('black');
    video1.classList.add('video-show');
    fitVideoToFrame(video1);
    videoFallback(video1, () => {
      if (stage !== 'video1') return;
      stage = 'question'; stop(music1);
      video1.classList.remove('video-show'); background('blue'); question.classList.add('show');
    });
  }
  yes.addEventListener('click', () => {
    if (stage !== 'question') return;
    question.classList.remove('show'); stage = 'after'; afterIndex = 0;
    showImage(after[0], 'blue'); message7.classList.add('show');
  });
  function moveNo() {
    const x = (Math.random() - .5) * Math.max(100, window.innerWidth - 140);
    const y = (Math.random() - .5) * Math.max(100, window.innerHeight - 260);
    no.style.transform = `translate(${x}px,${y}px)`;
  }
  no.addEventListener('mouseenter', moveNo);
  no.addEventListener('touchstart', e => { e.preventDefault(); moveNo(); }, {passive:false});
  no.addEventListener('click', moveNo);
  $('oneMoreBtn').addEventListener('click', () => {
    if (stage !== 'oneMore') return;
    oneMore.classList.remove('show'); stage = 'after'; afterIndex = 1;
    showImage(after[1], 'blue'); play(music2);
  });
  function startVideo2() {
    stage = 'video2'; hideImage(); background('black');
    video2.classList.add('video-show');
    fitVideoToFrame(video2);
    videoFallback(video2, () => {
      if (stage !== 'video2') return;
      video2.classList.remove('video-show');
      showConfession();
    });
  }
  function showConfession() {
    stage = 'confession'; hideImage(); stop(music2);
    background('pink'); confession.classList.add('show');
    // Trình duyệt có thể chặn nhạc khi không có thao tác trực tiếp.
    play(music3);
  }
  $('answerBtn').addEventListener('click', () => {
    if (stage !== 'confession') return;
    confession.classList.remove('show'); stage = 'answer';
    answerBox.classList.add('show'); play(music3);
    setTimeout(() => answerInput.focus(), 350);
  });
  async function sendAnswer() {
    const answer = answerInput.value.trim();
    if (!answer) {
      answerStatus.textContent = 'Em chưa viết gì kìa... 💗'; answerInput.focus(); return;
    }
    if (sendBtn.disabled) return;
    sendBtn.disabled = true;
    answerStatus.classList.remove('error');
    answerStatus.textContent = 'Đang gửi...';
    const data = new URLSearchParams({answer, time:new Date().toLocaleString('vi-VN')});
    try {
      // no-cors cho phép gửi nhưng KHÔNG xác nhận máy chủ thực sự đã lưu dữ liệu.
      await fetch(GOOGLE_SCRIPT_URL, {
        method:'POST', mode:'no-cors',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:data.toString()
      });
      answerStatus.textContent = 'Đã gửi yêu cầu 💗';
      stop(music3);
      setTimeout(() => {
        answerBox.classList.remove('show');
        end.classList.add('show');
      }, 900);
    } catch (error) {
      console.error('Không gửi được câu trả lời:', error);
      answerStatus.textContent = 'Không gửi được. Kiểm tra mạng rồi thử lại nhé.';
      answerStatus.classList.add('error'); sendBtn.disabled = false;
    }
  }
  sendBtn.addEventListener('click', sendAnswer);
  answerInput.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') sendAnswer();
  });
});
