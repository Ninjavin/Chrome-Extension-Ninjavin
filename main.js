document.addEventListener("DOMContentLoaded", function () {
  let hourElement = document.getElementById("hour");
  let minuteElement = document.getElementById("minute");

  let setTime = function (hourElement, minuteElement) {
    let now = new Date();
    if (now.getMinutes() < 10) {
      minuteElement.innerHTML = `0${now.getMinutes()}`;
    } else {
      minuteElement.innerHTML = now.getMinutes();
    }

    if (now.getHours() < 10) {
      hourElement.innerHTML = `0${now.getHours()}`;
    } else {
      hourElement.innerHTML = now.getHours();
    }
  };

  let welcomeBlock = document.querySelector(".welcome_block");

  let greetUserBlock = document.querySelector(".greet_user_block");

  let quoteBlock = document.querySelector(".quote_block");

  let userDetails = [];

  let setUserDetails = function () {
    let parsedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    let greetUser = document.querySelector(".greet_user");

    let githubLink = document.getElementById("github_link");
    let twitterLink = document.getElementById("twitter_link");
    let linkedinLink = document.getElementById("linkedin_link");
    let mediumLink = document.getElementById("medium_link");

    greetUser.innerHTML = parsedUserDetails[0];

    githubLink.setAttribute(
      "href",
      `https://github.com/${parsedUserDetails[1]}`
    );
    twitterLink.setAttribute(
      "href",
      `https://twitter.com/${parsedUserDetails[2]}`
    );
    linkedinLink.setAttribute(
      "href",
      `https://linkedin.com/${parsedUserDetails[3]}`
    );
    mediumLink.setAttribute(
      "href",
      `https://medium.com/@${parsedUserDetails[4]}`
    );
  };

  let getUserNameValues = function (e) {
    let userNameValue = document.getElementById("user_name").value;
    let githubValue = document.getElementById("github_id").value;
    let twitterValue = document.getElementById("twitter_id").value;
    let linkedinValue = document.getElementById("linkedin_id").value;
    let mediumValue = document.getElementById("medium_id").value;

    if (e.keyCode === 13) {
      userDetails.push(userNameValue);
      userDetails.push(githubValue);
      userDetails.push(twitterValue);
      userDetails.push(linkedinValue);
      userDetails.push(mediumValue);

      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      welcomeBlock.style.display = "none";

      greetUserBlock.style.display = "block";

      setUserDetails();

      quoteBlock.style.display = "block";
    }
  };

  let checkUserNameValue = function () {
    if (localStorage.getItem("userDetails") === null) {
      welcomeBlock.style.display = "flex";
      welcomeBlock.style.flexDirection = "column";
      welcomeBlock.style.alignItems = "center";

      greetUserBlock.style.display = "none";
      document.body.addEventListener("keypress", getUserNameValues);
    } else {
      greetUserBlock.style.display = "block";
      quoteBlock.style.display = "block";
      setUserDetails();
    }
  };

  let getRandomQuote = function () {
    let link = "https://api.quotable.io/random";
    fetch(link)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.getElementById(
          "quote_block_quote"
        ).innerHTML = `${data.content}`;
        document.getElementById(
          "quote_block_author"
        ).innerHTML = `${data.author}`;
      });
  };

  let greetMessage = function (msg) {
    let now = new Date();
    let hours = now.getHours();

    if (hours >= 3 && hours <= 12) msg.innerHTML = "Good Morning";
    else if (hours > 12 && hours <= 16) msg.innerHTML = "Good Afternoon";
    else if (hours > 16 && hours <= 20) msg.innerHTML = "Good Evening";
    else if (hours > 20 && hours < 24) msg.innerHTML = "Good Night";
    else msg.innerHTML = "Good Night";
  };

  let greetMsg = document.querySelector(".greet_msg");

  let reset = function () {
    localStorage.removeItem("userDetails");
    alert("Previous Data Cleared");
  };

  let resetIt = document.getElementById("reset-data");

  function init() {
    setInterval(function () {
      setTime(hourElement, minuteElement);
    }, 1000);

    checkUserNameValue();

    greetMessage(greetMsg);

    getRandomQuote();

    resetIt.addEventListener("click", reset);
  }

  init();
});
