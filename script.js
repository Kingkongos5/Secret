

// Animation by using dataSet Attribute ====================

const startPage = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         if (entry.target.classList.contains('anim')) {
            setTimeout(function () {
               entry.target.classList.remove('anim');
               startPage.unobserve(entry.target);
            }, (entry.target.dataset.start * 1000))
         }
      }
   })
})

const repeatAnimationElementPage = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         if (entry.target.dataset.anim) {
            setTimeout(function () {
               if (!entry.target.classList.contains('anim')) {
                  entry.target.classList.add('anim');
               }
            }, (entry.target.dataset.anim * 1000))
         } else {
            if (!entry.target.classList.contains('anim')) {
               entry.target.classList.add('anim')
            }
         }
      } else {
         if (entry.target.dataset.anim) {
            setTimeout(function () {
               if (entry.target.classList.contains('anim')) {
                  entry.target.classList.remove('anim')
               }
            }, (entry.target.dataset.anim * 1000))
         } else {
            if (entry.target.classList.contains('anim')) {
               entry.target.classList.remove('anim')
            }
         }
      }
   })
}, {
   threshold: 0.5,
})

document.querySelectorAll(`[data-start]`).forEach((initialAnimation) => {
   if (!initialAnimation.classList.contains('anim')) {
      initialAnimation.classList.add('anim')
   }
   startPage.observe(initialAnimation)
})

document.querySelectorAll(`[data-anim]`).forEach((initialAnimation) => {
   repeatAnimationElementPage.observe(initialAnimation)
})


function nextStep(stepNum) {
   document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
   document.getElementById('step' + stepNum).classList.add('active');
}

let yesScale = 1;
function dodgeBtn(e) {
   if (e) e.preventDefault();
   const noBtn = document.getElementById('noBtn');
   const yesBtn = document.getElementById('yesBtn');

   const x = (Math.random() - 0.5) * 200;
   const y = (Math.random() - 0.5) * 120;
   noBtn.style.transform = `translate(${x}px, ${y}px)`;

   yesScale += 0.18;
   yesBtn.style.transform = `scale(${yesScale})`;
}

function sayYes() {
   nextStep(4);


   startFinalCountdown();
}

function startFinalCountdown() {
   let seconds = 10;
   const timerEl = document.getElementById('timerDisplay');

   const interval = setInterval(() => {
      seconds--;
      if (seconds > 0) {
         timerEl.textContent = seconds;
      } else {
         clearInterval(interval);
         triggerCinematicSequence();
      }
   }, 1000);
}

function triggerCinematicSequence() {
   const card = document.getElementById('mainCard');
   const cine = document.getElementById('cinematicContainer');

   card.classList.add('hidden');

   setTimeout(() => {
      card.style.display = 'none';
      cine.style.display = 'flex';
      runTextSequence();
   }, 800);
}

function runTextSequence() {
   const texts = [
      { id: 'cText1', stay: 2400 },
      { id: 'cText2', stay: 2400 },
      { id: 'cText3', stay: 2800 },
      { id: 'cText4', stay: 2000 },
      { id: 'cText5', stay: 2500 },
      { id: 'cText6', stay: 2200 },
      { id: 'cText7', stay: 0 }
   ];

   let currentIndex = 0;

   function showNext() {
      if (currentIndex == 4) {
         document.querySelector('.smile').classList.add('anim');
      }
      if (currentIndex > 0) {
         const prev = document.getElementById(texts[currentIndex - 1].id);
         prev.classList.remove('visible');
         prev.classList.add('out');
      }

      if (currentIndex < texts.length) {
         const current = document.getElementById(texts[currentIndex].id);
         current.classList.remove('out');
         current.classList.add('visible');

         if (texts[currentIndex].stay > 0) {
            setTimeout(() => {
               currentIndex++;
               showNext();
            }, texts[currentIndex].stay);
         }
      }
   }

   setTimeout(() => {
      for (let i = 0; i < 40; i++) {
      setTimeout(spawnParticle, i * 35);
   }
   }, 14300);

   showNext();
}

function restartAll() {
   document.querySelectorAll('.cine-text').forEach(t => {
      t.classList.remove('visible', 'out');
   });
   document.getElementById('cinematicContainer').style.display = 'none';

   const card = document.getElementById('mainCard');
   card.style.display = 'block';
   setTimeout(() => {
      card.classList.remove('hidden');
   }, 50);

   yesScale = 1;
   const yesBtn = document.getElementById('yesBtn');
   const noBtn = document.getElementById('noBtn');
   if (yesBtn) yesBtn.style.transform = 'scale(1)';
   if (noBtn) noBtn.style.transform = 'translate(0, 0)';

   document.getElementById('timerDisplay').textContent = '10';
   nextStep(1);
}

function spawnParticle() {
   const p = document.createElement('div');
   p.classList.add('particle');
   p.innerHTML = ['❤️', '🔥', '✨', '💋', '🍓', '⚡'][Math.floor(Math.random() * 6)];
   p.style.fontSize = (Math.random() * 16 + 18) + 'px';
   p.style.left = '50vw';
   p.style.top = '50vh';

   const angle = Math.random() * Math.PI * 2;
   const velocity = Math.random() * 260 + 80;
   const tx = Math.cos(angle) * velocity + 'px';
   const ty = Math.sin(angle) * velocity + 'px';
   const rot = (Math.random() * 360 - 180) + 'deg';

   p.style.setProperty('--tx', tx);
   p.style.setProperty('--ty', ty);
   p.style.setProperty('--rot', rot);

   document.body.appendChild(p);
   setTimeout(() => p.remove(), 2800);
}