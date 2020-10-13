const tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'class-1 class-2',
    scrollTo: true
  }
});

tour.addStep({
  id: 'welcome',
  text: 'Welcome! Here you can see some work that I have done... :)',
  buttons: [{
    text: "Understood!",
    action: tour.next
  }]
});

tour.addStep({
  id: 'video',
  text: 'Do not forget to play the video!',
  attachTo: {
    element: "#java-2d-level-editor .tl-media-content",
    on: 'bottom',
    advanceOn: { selector: 'video', event: 'play' }
  }
});

tour.addStep({
  id: 'forest',
  text: 'I think I need to add some more forest on the right side of the map!',
  attachTo: {
    element: "#java-2d-level-editor .tl-media-content",
    on: 'right'
  }
});

tour.addStep({
  id: 'tower',
  text: 'Let us add a tower on top of the previously drawn tiles!',
  attachTo: {
    element: "#java-2d-level-editor .tl-media-content",
    on: 'right'
  }
});

tour.addStep({
  id: 'arrow',
  text: 'You can navigate to the next project using this arrow!',
  attachTo: {
    element: ".tl-slidenav-icon",
    on: 'left'
  }
});

tour.addStep({
  id: 'monster',
  text: 'A wild monster appears!',
  attachTo: {
    element: "#java-2d-role-playing-game .tl-media-content",
    on: 'bottom'
  }
});

tour.addStep({
  id: 'town',
  text: 'The town is empty, what else can I do?',
  attachTo: {
    element: "#java-2d-role-playing-game .tl-media-content",
    on: 'right'
  }
});

tour.addStep({
  id: 'rocks',
  text: 'I cannot walk into the mountains, it is too difficult.',
  attachTo: {
    element: "#java-2d-role-playing-game .tl-media-content",
    on: 'bottom'
  }
});

tour.addStep({
  id: 'items',
  text: 'The monsters have dropped some items, let us see if I can use them.',
  attachTo: {
    element: "#java-2d-role-playing-game .tl-media-content",
    on: 'bottom'
  }
});

tour.addStep({
  id: 'migrationmanager',
  text: 'Each node represents a SharePoint subsite, and the colors are coded according to the current state of the migration.',
  attachTo: {
    element: "#migration-manager .tl-media-content",
    on: 'bottom'
  },
  buttons: [{
    text: "OK",
    action: () => tour.getById('migrationmanager').cancel()
  }]
});

tour.addStep({
  id: 'engene',
  text: 'The cube is projected into 3-dimensional space using rotation matrices <br/><a href="https://en.wikipedia.org/wiki/Rotation_matrix">more on wikipedia</a>',
  attachTo: {
    element: "#engene .tl-media-content",
    on: 'right'
  },
  buttons: [{
    text: "OK",
    action: () => tour.getById('engene').cancel()
  }]
});

tour.addStep({
  id: 'lace',
  text: 'Remove all dots in the output pictures by clicking on an area on the first picture. <br/> <br/> The first image is input, the other images are output! The last image is the result. <br/><br/> You can load custom images if CORS allows you to, please wait a few seconds if the images do not load.<br/><br/> You can save the output like any other image on the web!',
  attachTo: {
    element: "#lace .tl-media-content",
    on: 'right'
  },
  buttons: [{
    text: "OK",
    action: () => tour.getById('lace').cancel()
  }]
});

tour.addStep({
  id: 'exporter',
  text: `Fully clientside solution that retrieves file content from javascript, stores it in a structured zipfile, and Creates a visualization such as seen on the left. Originally I had a solution using Docker and CloudFoundry but making it 100% clientside made this obsolete.`,
  attachTo: {
    element: "#sap-cpq-script-visualizer .tl-media-content",
    on: 'right'
  },
  buttons: [{
    text: "OK",
    action: () => tour.getById('exporter').cancel()
  }]
});

tour.start();

// Times in seconds.
const timeframes = [
  {time: 0, triggered: false, always: true, execute: () => tour.getById("video").cancel()},
  {time: 35, triggered: false, isGame: false, execute: () => tour.getById("forest").show()},
  {time: 40, triggered: false, isGame: false, execute: () => tour.getById("forest").cancel()},
  {time: 60, triggered: false, isGame: false, execute: () => tour.getById("tower").show()},
  {time: 70, triggered: false, isGame: false, execute: () => tour.getById("tower").cancel()},
  {time: 80, triggered: false, isGame: false, execute: () => tour.getById("arrow").show()},
  {time: 2, triggered: false, isGame: true, execute: () => tour.getById("monster").show()},
  {time: 5, triggered: false, isGame: true, execute: () => tour.getById("monster").cancel()},
  {time: 10, triggered: false, isGame: true, execute: () => tour.getById("town").show()},
  {time: 15, triggered: false, isGame: true, execute: () => tour.getById("town").cancel()},
  {time: 25, triggered: false, isGame: true, execute: () => tour.getById("rocks").show()},
  {time: 29, triggered: false, isGame: true, execute: () => tour.getById("rocks").cancel()},
  {time: 58, triggered: false, isGame: true, execute: () => tour.getById("items").show()},
  {time: 62, triggered: false, isGame: true, execute: () => tour.getById("items").cancel()}
];

$('body').on('timeupdate', 'video', function(el) 
{
  let video = el.currentTarget;
  let isGame = video.children[0].src.includes("PE3_Game");
  let timeframe = timeframes.find(i => i.time == Math.floor(video.currentTime) && !i.triggered && (i.always || i.isGame == isGame))
  if (timeframe) {
    timeframe.triggered = true
    window.dispatchEvent(new CustomEvent('VideoTimelapse', {detail: {timeframe: timeframe, isGame: isGame}}))
  }
});

// Listen for the event
window.addEventListener('VideoTimelapse', (ev) => {
  console.log(`${ev.detail.timeframe.time} seconds have passed`);
  console.log(`isgame: ${ev.detail.isGame}`);
  ev.detail.timeframe.execute();
})

$('body').on('click', '.tl-slidenav-next', function() {
  tour.getById("arrow").cancel();
  if (timeline.current_id == "migration-manager") setTimeout(() => { if (timeline.current_id == "migration-manager") tour.getById("migrationmanager").show(); }, 2500);
  if (timeline.current_id == "engene") setTimeout(() => {if (timeline.current_id == "engene") tour.getById("engene").show(); }, 2500);
  if (timeline.current_id == "lace") setTimeout(() => {if (timeline.current_id == "lace") tour.getById("lace").show(); }, 2500);
  if (timeline.current_id == "sap-cpq-script-visualizer") setTimeout(() => {if (timeline.current_id == "sap-cpq-script-visualizer") tour.getById("exporter").show(); }, 2500);
}); 

$('body').on('click', '.tl-timemarker-content', function() {
  tour.cancel();
})