'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// console.log(document.documentElement.querySelector ('.header'));

//page nevigation
// document.querySelectorAll('.nav__link').forEach(function (e1) {
//   e1.addEventListener('click', function (e) {
//     // console.log(document.querySelector('.nav__link').getAttribute('href'));
//     e.preventDefault();
//     const fx = e.target.getAttribute('href');
//     const fxDOM = document.querySelector(`${fx}`);
//     const mfxDOM = fxDOM.getBoundingClientRect().y + window.pageYOffset;
//     window.scrollTo({
//       left: 0,
//       top: mfxDOM,
//       behavior: 'smooth',
//     });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const ele_herf = e.target.getAttribute('href');
    const mfxDOM =
      document.querySelector(ele_herf).getBoundingClientRect().y +
      window.pageYOffset;
    window.scrollTo({
      left: 0,
      top: mfxDOM,
      behavior: 'smooth',
    });
  }
});

// document
//   .querySelector('.nav__links')
//   .addEventListener('mouseover', function (en) {
//     if (en.target.classList.contains('nav__link')) {
//       document
//         .querySelector('.nav')
//         .addEventListener('mouseenter', function (e) {
//           document.querySelectorAll('.nav__link').forEach(function (er) {
//             er.style.color = '#999';
//           });
//         });
//       en.target.style.color = '#333';
//     }
//   });
// document.querySelector('.nav').addEventListener('mouseleave', function (e) {
//   e.preventDefault();
//   document.querySelectorAll('.nav__link').forEach(function (er) {
//     er.style.color = '#333';
//   });
// });
const change_opacity = function (opacity, e) {
  if (e.target.classList.contains('nav__link')) {
    document.querySelectorAll('.nav__link').forEach(function (ele) {
      if (ele !== e.target) {
        ele.style.opacity = opacity;
      }
    });
  }
};

document.querySelector('.nav').addEventListener('mouseover', function (e) {
  change_opacity(0.6, e);
});
document.querySelector('.nav').addEventListener('mouseout', function (e) {
  change_opacity(1, e);
});
const message = document.createElement('div');
message.classList.add('cookie--message');
// message.textContent = `We use cookies to improve user experience.`;
message.innerHTML = `We use cookies to improve user experience. <button class="btn btn--close-cookie">Got it!</button>`;
document.querySelector('.header').append(message);
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.color = 'white';
message.style.textAlign = 'center';
message.style.padding = '9px';

//tbale format conctemnt

document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    if (e.target.classList.contains('operations__tab')) {
      const data_set_tab = e.target.dataset.tab;
      const parent_btn = document.querySelector(
        '.operations__tab-container'
      ).children;
      for (const it of parent_btn) {
        if (it.classList.contains('operations__tab--active')) {
          it.classList.remove('operations__tab--active');
          console.log(it.dataset.tab);
        }
      }
      document.querySelectorAll('.operations__content').forEach(function (e1) {
        if (e1.classList.contains('operations__content--active')) {
          e1.classList.remove('operations__content--active');
        }
      });
      document
        .querySelector(`.operations__content--${data_set_tab}`)
        .classList.add('operations__content--active');
      e.target.classList.add('operations__tab--active');
    }
  });

//sticy navbar
// let check = true;
const navHeight = parseFloat(
  getComputedStyle(document.querySelector('.nav')).height
);
// window.addEventListener('scroll', function () {
//   if (window.scrollY < 752 - navHeight) {
//     document.querySelector('.nav').classList.remove('sticky');
//     check = true;
//   }
// });
// window.addEventListener('scroll', function () {
//   if (window.scrollY >= 752 - navHeight) {
//     if (check) {
//       document.querySelector('.nav').classList.add('sticky');
//       check = false;
//     }
//   }
// });

const section1 = document.querySelector('.header');
//using intersection observer method
const observerFunction = function (entries, observer) {
  entries.forEach(function (e) {
    //e.target.clientHeight += navHeight;
    if (!e.isIntersecting) {
      document.querySelector('.nav').classList.add('sticky');
    } else {
      document.querySelector('.nav').classList.remove('sticky');
    }
  });
};
const observerObject = {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
};
const observer = new IntersectionObserver(observerFunction, observerObject);
observer.observe(section1);

//revell element on the scroll way through

const revFun = function (entries) {
  const [firstEntry] = entries;
  if (firstEntry.isIntersecting) {
    firstEntry.target.classList.remove('section--hidden');
    observer_rev.unobserve(firstEntry.target);
  } else {
    firstEntry.target.classList.add('section--hidden');
  }
};
const revObj = {
  root: null,
  threshold: 0.1,
};
const observer_rev = new IntersectionObserver(revFun, revObj);
document.querySelectorAll('.section').forEach(sectionEnter => {
  observer_rev.observe(sectionEnter);
});

//lazy loading the images
const lazyFunction = function (entries) {
  const [firstLazy] = entries;
  if (firstLazy.isIntersecting) {
    const replace_src = firstLazy.target.dataset.src;
    firstLazy.target.src = replace_src;
    firstLazy.target.classList.remove('lazy-img');
    lazyLoad.unobserve(firstLazy.target);
  }
};
const LazyObject = {
  root: null,
  threshold: 0.15,
};
const lazyLoad = new IntersectionObserver(lazyFunction, LazyObject);
document.querySelectorAll('.features__img').forEach(img => {
  lazyLoad.observe(img);
});

//slider component
// let currentSlide = 1;
// const showSlide = function (currentSlide) {
//   const slide = document.querySelectorAll('.slide');
//   slide.forEach(s => {
//     if (!s.classList.contains('slider__hide')) {
//       s.classList.add('slider__hide');
//     }
//   });
//   if (
//     document
//       .querySelector(`.slide--${currentSlide}`)
//       .classList.contains('slider__hide')
//   ) {
//     document
//       .querySelector(`.slide--${currentSlide}`)
//       .classList.remove('slider__hide');
//   }
// };
// const dot = document.querySelector('.dots');
// const showDots = function (currentSlide) {
//   for (const curDot of dot.childNodes) {
//     if (curDot.classList?.contains(`slide--${currentSlide}`)) {
//       curDot.classList.add('dots__dot--active');
//     } else {
//       curDot.classList?.remove('dots__dot--active');
//     }
//   }
// };
// showDots(currentSlide);
// showSlide(currentSlide);
// const checkValid = function (currentSlide) {
//   if (currentSlide < 1 || currentSlide > 3) {
//     return currentSlide < 1 ? 3 : 1;
//   } else {
//     return currentSlide;
//   }
// };
// const removeAnimation = function () {
//   const currentData = document.querySelectorAll('.slide');
//   currentData.forEach(slide => {
//     if (
//       slide.classList.contains('slider__btn--left') ||
//       slide.classList.contains('slider__btn--right')
//     ) {
//       if (slide.classList.contains('slider__btn--left')) {
//         slide.classList.remove('slider__btn--left');
//       } else {
//         slide.classList.remove('slider__btn--left');
//       }
//     }
//   });
// };
// const writeData = function (currentSlide, sliderDirection) {
//   const currentData = document.querySelector(`.slide--${currentSlide}`);
//   if (sliderDirection) {
//     removeAnimation();
//     currentData.classList.add('.slider__btn--left');
//     showSlide(currentSlide);
//     showDots(currentSlide);
//   } else {
//     removeAnimation();
//     currentData.classList.add('.slider__btn--right');
//     showSlide(currentSlide);
//     showDots(currentSlide);
//   }
// };
// const slider = document.querySelector('.slider');
// slider.addEventListener('click', function (e) {
//   if (e.target.classList.contains('slider__btn')) {
//     if (e.target.classList.contains('slider__btn--left')) {
//       currentSlide = currentSlide - 1;
//       currentSlide = checkValid(currentSlide);
//       writeData(currentSlide, true);
//     } else {
//       currentSlide = currentSlide + 1;
//       currentSlide = checkValid(currentSlide);
//       writeData(currentSlide, false);
//     }
//   }
// });
// dot.addEventListener('click', function (e) {
//   const needSlide = e.target.dataset.slide;
//   let check;
//   currentSlide < needSlide ? (check = false) : (check = true);
//   writeData(needSlide, check);
// });

//advance slider component

const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots__dot');
const maxSlides = slides.length;
let para = 0;
const active = function (para) {
  dots.forEach(slide => {
    if (slide.dataset.slide == para) {
      slide.classList.add('dots__dot--active');
    } else {
      slide.classList?.remove('dots__dot--active');
    }
  });
};

const move = function (para) {
  slides.forEach(function (slide, index) {
    slide.style.transform = `translateX(${(index - para) * 100}%)`;
  });
  active(para);
};
const checkValid = function (para, maxSlides) {
  if (para > maxSlides - 1) {
    return 0;
  } else if (para < 0) {
    return maxSlides - 1;
  } else {
    return para;
  }
};

move(para);
active(para);
document.addEventListener('keydown', function (keyPressed) {
  if (keyPressed.key == 'ArrowRight') {
    para++;
    para = checkValid(para, maxSlides);
    move(para);
    active(para);
  }
  if (keyPressed.key == 'ArrowLeft') {
    para--;
    para = checkValid(para, maxSlides);
    move(para);
    active(para);
  }
});
slider.addEventListener('click', function (e) {
  const btnClick = e.target;
  if (btnClick.classList.contains('slider__btn')) {
    if (btnClick.classList.contains('slider__btn--right')) {
      //to right
      para++;
      para = checkValid(para, maxSlides);
      move(para);
      active(para);
    } else {
      para--;
      para = checkValid(para, maxSlides);
      move(para);
      active(para);
      //to left
    }
  }
});
dots.forEach(dotAct => {
  dotAct.addEventListener('click', function () {
    const gotoSlide = dotAct.dataset.slide;
    para = gotoSlide;
    move(para);
    active(para);
  });
});
// const height = parseFloat(getComputedStyle(message).height);
// message.style.height = height + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'red');

// console.log(section1);
// console.log(section1.getBoundingClientRect().y);
// console.log(window.pageYOffset);
// const sectionOneYCords =
//   section1.getBoundingClientRect().y + window.pageYOffset;
// console.log(sectionOneYCords);
// document
//   .querySelector('.btn--scroll-to')
//   .addEventListener('click', function (e) {
//     // window.scrollTo(0, sectionOneYCords);
//     window.scrollTo({
//       left: 0,
//       top: sectionOneYCords,
//       behavior: 'smooth',
//     });
//   });

//advance dom methods and random color handeling
// const ran = function (y) {
//   return Math.floor(Math.random() * y);
// };

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   document.querySelector('.nav__links').style.backgroundColor = `rgb(${ran(
//     255
//   )},${ran(255)},${ran(255)})`;
//   e.stopPropagation();
// });
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   document.querySelector('.nav__link').style.backgroundColor = `rgb(${ran(
//     255
//   )},${ran(255)},${ran(255)})`;
//   e.stopPropagation();
// });
// document.querySelector('nav').addEventListener('click', function (e) {
//   document.querySelector('nav').style.backgroundColor = `rgb(${ran(255)},${ran(
//     255
//   )},${ran(255)})`;
// });
