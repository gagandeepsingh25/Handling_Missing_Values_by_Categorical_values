
const tour = new Shepherd.Tour({
    defaultStepOptions: {
      scrollTo: false,
      cancelIcon: {
        enabled: true
      },
      // classes: "shepherd-theme-arrows",
    },
    useModalOverlay: true,
  });
document.addEventListener("DOMContentLoaded", function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const vaultpagetour = urlParams.get('vaultpagetour');
    const backBtnClass = 'btn btn-sm btn-label-secondary md-btn-flat waves-effect';
    let   nextBtnClass = 'btn btn-sm btn-primary btn-next waves-effect waves-light';

  if (vaultpagetour == "true") {

    tour.addStep({
      id: "step-1",
      title: 'Add Document',
      text: "Enhance your chatbot's capabilities by feeding it with relevant content and refining its knowledge.",
      attachTo: { element: "#vault-tour-1", on: "top" },
      buttons: [
        {
          text: "Skip",
            classes: backBtnClass,
          action: stopTour,
        },
        {
          text: "Next",
            classes: nextBtnClass,
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "step-2",
      title: 'Chat with Chatbot',
      text: "After the documents have been uploaded, engage in a vibrant conversation with your files ",
      attachTo: { element: "#vault-tour-2", on: "top" },
      buttons: [
        {
          text: "Skip",
            classes: backBtnClass,
          action: stopTour,
        },
        {
          text: "Back",
            classes: backBtnClass,
          action: tour.back,
        },
        {
          text: "Next",
            classes: nextBtnClass,
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "step-3",
      title: 'Chatbot settings',
      text: "Customize your chatbot's appearance and performance with just a few clicks in the Chatbot Settings",
      attachTo: { element: "#vault-tour-3", on: "top" },
      buttons: [
        {
          text: "Skip",
            classes: backBtnClass,
          action: stopTour,
        },
        {
          text: "Back",
            classes: backBtnClass,
          action: tour.back,
        },
        {
          text: "Next",
            classes: nextBtnClass,
          action: tour.next,
        },
      ],
    });
    tour.addStep({
      id: "step-4",
      title: 'Chatbot Integrations',
      text: "Seamlessly integrate your chatbot with various websites and platforms to expand its reach and functionality, making interactions with your audience effortless",
      attachTo: { element: "#vault-tour-4", on: "top" },
      buttons: [
        {
          text: "Back",
          classes: backBtnClass,
          action: tour.back,
        },
        {
          text: "Finish",
          classes: nextBtnClass,
          action: stopTour,
        },
      ],
    });
    tour.start();
   
  }
});
function stopTour() {
    tour.cancel();
     localStorage.setItem("Tour", "Done");
  }
