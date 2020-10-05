const tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'class-1 class-2',
    scrollTo: true
  }
});

tour.addStep({
  id: 'example-step',
  text: 'Welcome! Here you can see some work that I have done... :)',
  classes: 'example-step-extra-class'
});

tour.addStep({
  id: 'example-step3',
  text: 'Do not forget to play the video!',
  attachTo: {
    element: ".tl-media-content",
    on: 'bottom'
  },
  classes: 'example-step-extra-class'
});

tour.addStep({
  id: 'example-step2',
  text: 'You can navigate to the next project using this arrow!',
  attachTo: {
    element: ".tl-slidenav-icon",
    on: 'left'
  },
  classes: 'example-step-extra-class'
});

tour.start();

setTimeout(() => {
  tour.next(); 
  setTimeout(() => { 
    tour.next(); 
    setTimeout(() => tour.next(), 5000);
  }, 5000);
}, 5000);

