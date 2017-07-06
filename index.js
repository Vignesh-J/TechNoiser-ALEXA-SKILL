
var APP_ID = "amzn1.ask.skill.0436b074-cd67-......."; //OPTIONAL- replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Tech facts.
 */
var FACTS = [
    "Found within the original Macintosh case are the 47 signatures of each member of Apple’s Macintosh division as of 1982.",
    " On average a typist’s fingers will travel 12.6 miles!! That’s nearly half a marathon – who said that office workers don’t get enough exercise?",
    "When sat in front of a computer, the average user blinks only 7 times a minute – the normal rate is 20",
    "Captain Windows aka Bill Gates’ house was designed using a Mac!! Hehe!",
    "The first call made on a mobile phone was in 1973 on April 3rd by Martin Cooper, a former Motorola inventor. He is affectionately known as the ‘father of the cellphone’.",
    "The first 2 computer games that were copyrighted in the US were Lunar Lander and Asteroids in 1980.",
    "Facebook coughs up at least $500 to anyone who can find a way to hack the site.",
    "It took 38 years for radio to reach 50 million users, and TV 13 years – the internet managed to reach this milestone in only 4.",
    "The first ever smartphone was in fact the IBM Simon, and featured a touchscreen, calendar, and fax – launched in 1993.",
    "The best selling mobile phone of all time was the Nokia 1100, made in Finland and selling a staggering 250 million units. This also makes the phone the top selling electrical gadget in history, slightly ahead of the Playstation 2.",
    "91% of adults have their mobile within arm’s reach of them every hour of every single day.",
    "Every single minute that ticks by, over 100 hours of video footage gets uploaded to YouTube.",
    "97% of the 60 billion emails that are sent on a daily basis are considered spam.",
	"Apple, Microsoft and Hewlett Packard all have one thing in common – they make computers. Oh, and they were started in a garage. I guess that’s 2 things. There are probably more, but it’s the garage thing that we thought was geeky cool.",
    "The first ever smartphone was in fact the IBM Simon, and featured a touchscreen, calendar, and fax – launched in 1993.",
    "On eBay, there is an average of $680 worth of transactions every second.",
    "Ninety-one percent of all adults have their mobile phone within arm’s reach every hour of every day.",
    "There are 6.8 billion people on the planet and 4 billion of them use a mobile phone. Only 3.5 billion of them use a toothbrush.",
    "Hewlett Packard, Microsoft, as well as Apple have one not so obvious thing in common – they were all started in a garage.",
    "Ninety percent of text messages are read within three minutes of being delivered.",
    "The first personal computer was created by Berkeley Enterprises. Affectionately referred to as Simon, it sold for a pricey $300 in 1950",
    "There are 350 million Snapchat messages sent every day.",
    "Google handles an estimated 1 billion search queries each and every day, releasing almost 200 tons of CO2 per day",
    "The man known as the Father of Information Theory, Claude Shannon, invented the digital circuit – the foundation of the magic that provides us all access to the Internet today - during his master’s degree program, when he was just 21 years old. ",
    "Since the company’s inception, there have been 144.7 million individual visitors to Facebook, making it the most visited social networking site as of June 2013.",
    "There are 271 million mobile subscribers within the United States alone, and numbers are quickly growing."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');


var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};


Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask tech noiser tell me a fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random tech fact from the tech facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Techy skill.
    var fact = new Fact();
    fact.execute(event, context);
};

