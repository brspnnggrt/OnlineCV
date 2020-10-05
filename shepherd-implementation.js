var tour;
        
tour = new Shepherd.Tour({
    defaults: {
        classes: 'shepherd-theme-arrows',
        scrollTo: true
    }
});

tour.addStep('example-step', {
    text: 'This step is attached to the bottom of the element.',
    attachTo: '.title bottom',
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
});

tour.addStep('example-step2', {
    text: 'This step is attached to the bottom of the element.',
    attachTo: '.title right',
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
});

tour.start();
