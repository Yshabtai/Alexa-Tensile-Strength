var context = null

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

exports.handler = function(event, handlerContext) {
	context = handlerContext

	try {
		if(event.session.new) {
			onSessionStarted({requestId: event.request.requestId}, event.session)
		}

		if (event.request.type === "LaunchRequest") {
			onLaunch(event.request, event.session)
		} else if (event.request.type === "IntentRequest") {
			onIntent(event.request, event.session)
		} else if (event.request.type === "SessionEndedRequest") {

		}
	} catch(e) {
		console.log("FAIL")
		context.fail("Exception: " + e)
	}
}

function returnMessage(sessionAttributes, speechletResponse) {
	context.succeed(buildResponse(sessionAttributes, speechletResponse))
}

function onSessionStarted(sessionStartedRequest, session) {

}

function onLaunch(launchRequest, session) {
	var title = "Welcome"
	var speechOutput = "Welcome to tensile!"
	var reprompt = "Just a reminder, tensile is still active"

	var sessionAttributes = {
		"speechOutput" : speechOutput,
		"reprompt" : reprompt
	}

	returnMessage(sessionAttributes, buildSpeechletResponse(title, speechOutput, reprompt, false))
}

function onIntent(intentRequest, session) {
	var intent = intentRequest.intent
	var intentName = intentRequest.intent.name
	var slots = intent.slots
	var title = "Info"

	if(intentName === "GetStrength") {
		setDiameterValue(slots)
		var strength = undefined
		var speechOutput = undefined
		var reprompt = ""

		if(specs[slots.Type.value] === undefined) {
			speechOutput = "I'm sorry, information about the rope you have specified is not available"
		} else {
			strength = specs[slots.Type.value][slots.Diameter.value]
			speechOutput = "The strength of " + slots.Diameter.value + " inch " + slots.Type.value + " rope is " + strength + " pounds of force"
		}

		var sessionAttributes = {
			"speechOutput" : speechOutput,
			"reprompt" : reprompt
		}

		returnMessage(sessionAttributes, buildSpeechletResponse(title, speechOutput, reprompt, false))
	} else if (intentName === "Help") {
		var speechOutput = "The supported types of ropes are manila, polypropylene, blend, nylon, and polyester," +
		"Supported thicknesses are three sixteenths of an inch up to one inch"
		var reprompt = ""

		var sessionAttributes = {
			"speechOutput" : speechOutput,
			"reprompt" : reprompt
		}

		returnMessage(sessionAttributes, buildSpeechletResponse(title, speechOutput, reprompt, false))
	} else {
		var speechOutput = "I'm sorry, I did not understand that"
		var reprompt = ""

		var sessionAttributes = {
			"speechOutput" : speechOutput,
			"reprompt" : reprompt
		}

		returnMessage(sessionAttributes, buildSpeechletResponse(title, speechOutput, reprompt, false))
	}
}

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

function onSessionEnded(sessionEndedRequest, session) {

}


// ------- Helper functions to build responses for Alexa -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

function capitalizeFirst(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}
