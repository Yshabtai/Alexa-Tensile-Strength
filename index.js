'use strict'

const Alexa = require('alexa-sdk')

var specs = {
	"manila" : {
		"3/16" : 405,
		"1/4" : 540,
		"5/16" : 900,
		"3/8" : 1215,
		"7/16" : 1575,
		"1/2" : 2385,
		"9/16" : 3105,
		"5/8" : 3960,
		"3/4" : 4860,
		"13/16" : 5858,
		"7/8" : 6930,
		"1" : 8100
	},
	"polypropylene" : {
		"3/16" : 800,
		"1/4" : 1250,
		"5/16" : 1900,
		"3/8" : 2700,
		"7/16" : 3500,
		"1/2" : 4200,
		"9/16" : 5100,
		"5/8" : 6200,
		"3/4" : 8500,
		"13/16" : 9900,
		"7/8" : 11500,
		"1" : 14000
	},
	"blend" : {
		"1/4" : 1098,
		"5/16" : 1728,
		"3/8" : 2650,
		"7/16" : 3600,
		"1/2" : 4500,
		"9/16" : 5450,
		"5/8" : 6400,
		"3/4" : 8400,
		"13/16" : 10200,
		"7/8" : 12000,
		"1" : 15000
	},
	"nylon" : {
		"3/16" : 1000,
		"1/4" : 1650,
		"5/16" : 2550,
		"3/8" : 3700,
		"7/16" : 5000,
		"1/2" : 6400,
		"9/16" : 8000,
		"5/8" : 10400,
		"3/4" : 14200,
		"13/16" : 17000,
		"7/8" : 20000,
		"1" : 25000
	},
	"polyester" : {
		"3/16" : 1000,
		"1/4" : 1650,
		"5/16" : 2550,
		"3/8" : 3700,
		"7/16" : 5000,
		"1/2" : 6400,
		"9/16" : 8000,
		"5/8" : 10000,
		"3/4" : 12500,
		"13/16" : 15500,
		"7/8" : 18000,
		"1" : 22000
	}
}



const languageStrings = {
	'en': {
		translation: {
			SKILL_NAME: 'Tensile',
			HELP_MESSAGE: 'You can ask for the tensile strength of any of the supported rope types and thicknesses.',
			HELP_REPROMPT: 'What can I help you with?',
			STOP_MESSAGE: 'Goodbye!'
		},
	},
};

const handlers = {
	'LaunchRequest': function () {
		const speechOutput = this.t('HELP_MESSAGE');
		const reprompt = this.t('HELP_REPROMPT');
		this.emit(':ask', speechOutput, reprompt);
	},
	'GetStrength': function () {
		const intentRequest = this.event.request;
		const intent = intentRequest.intent;
		const slots = intent.slots;
		setDiameterValue(slots);
		const ropeType = slots.Type.value;
		const diameter = slots.Diameter.value;

		var answer = "The tensile strength of " + diameter + " inch " + ropeType + " rope is " + specs[ropeType][diameter] + " pounds of force";
		this.emit(":tellWithCard", answer);
	},
	'AMAZON.HelpIntent': function () {
		const speechOutput = this.t('HELP_MESSAGE');
		const reprompt = this.t('HELP_REPROMPT');
		this.emit(':ask', speechOutput, reprompt);
	},
	'AMAZON.CancelIntent': function () {
		this.emit(':tell', this.t('STOP_MESSAGE'));
	},
	'AMAZON.StopIntent': function () {
		this.emit(':tell', this.t('STOP_MESSAGE'));
	}
}

exports.handler = function(event, context) {
	const alexa = Alexa.handler(event, context);

	alexa.resources = languageStrings;
	alexa.registerHandlers(handlers);
	alexa.execute();
};

function setDiameterValue(slots) {
	if(slots.Diameter.value === "316th") {
		slots.Diameter.value = "3/16"
	} else if(slots.Diameter.value === "4th" || slots.Diameter.value === "1⁄4" || slots.Diameter.value === "quarter") {
		slots.Diameter.value = "1/4"
	} else if(slots.Diameter.value === "5⁄16") {
		slots.Diameter.value = "5/16"
	} else if(slots.Diameter.value === "3⁄8") {
		slots.Diameter.value = "3/8"
	} else if(slots.Diameter.value === "716ths") {
		slots.Diameter.value = "7/16"
	} else if(slots.Diameter.value === "1⁄2" || slots.Diameter.value === "half") {
		slots.Diameter.value = "1/2"
	} else if(slots.Diameter.value === "9⁄16") {
		slots.Diameter.value = "9/16"
	} else if(slots.Diameter.value === "5⁄8") {
		slots.Diameter.value = "5/8"
	} else if(slots.Diameter.value === "3⁄4") {
		slots.Diameter.value = "3/4"
	} else if(slots.Diameter.value === "13⁄16") {
		slots.Diameter.value = "13/16"
	} else if(slots.Diameter.value === "7⁄8") {
		slots.Diameter.value = "7/8"
	} else if(slots.Diameter.value === "one") {
		slots.Diameter.value = "1"
	}
}
