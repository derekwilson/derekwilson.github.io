---
layout: post
title:  "Another Gadget: Google Home"
date:   2017-07-28 12:00:00
published: true
tags: ["Gadgets", "General"]
categories: ["Gadgets", "General"]
---

I have another new gadget - [Google Home][ghome-url]. Speakers you talk to are all the rage at the moment, [Amazon][echo-url] and [Apple][homepod-url] are in on the act. 

## First Impressions

Well there is a lot of hype. The voice recognition is good, over 90% accuracy. Its just that the devices its competing with, light switches egg timers, volume controls are all running at 100% accuracy. Even having to repeat yourself a bit is irritating. In general you can do everything Home can do faster and with more precision with your phone. 

That said there are a few use cases when Home is useful. Setting a timer from the kitchen when your hands are full; turning the heater on when you don't have your phone; checking some random fact while watching TV. They are limited and the Home is not that cheap. 

For me the thing that tips the balance in its favour is using [Home in conjunction with a Chromecast Audio][multicast-url] to get multiroom playback - sort of [Sonos][sonos-url] on the cheap. 

## Programming the Home

One of the things that attracted me to it was the ability to program the Google Home. I did manage to get up to speed pretty easily but there were a few gotchas to getting started.

[Actions on Google](https://developers.google.com/actions/) lets you build apps for the Google Assistant. Your apps can help you engage users through Google Home, eligible Android phones, iPhones, and in the future, through every experience where the Google Assistant is available.

I used Api.Ai to build the voice recognition agent - other mechanisms are available but this is the simplest to start with.

To build an action requires coordinating these three consoles

1. [Api.Ai console](https://console.api.ai/api-client/#/login)
1. [Actions on Google Console](https://console.actions.google.com/)
1. [Google Cloud Platform](https://console.cloud.google.com/)

You are going to need the same google account registered for each console, also if you want to test this on an actual Google Home then the same account needs to be linked to it. (If you publish it publicly then anyone can access it)

I think you can create the action starting from any of the consoles but the sequence I followed was

### Create the agent in Api.Ai

Login with your google account and create an agent with some intents

{% include widgets/image.html src='/images/jekyll/2017-07-01/apiai1.png' width='300' height='200' title='apiai1' %}

### Update the Action Console from Api.Ai

You need to publish your agent to Actions on Google using the integrations area

{% include widgets/image.html src='/images/jekyll/2017-07-01/apiai2.png' width='300' height='200' title='apiai2' %}

Check all the intents from your agent that you want to publish

{% include widgets/image.html src='/images/jekyll/2017-07-01/apiai3.png' width='300' height='200' title='apiai3' %}

To test the action you might need to fill out the app info - including icon assets etc. Its unclear. 
You definitely need to do this to publish.

{% include widgets/image.html src='/images/jekyll/2017-07-01/actions2.png' width='300' height='200' title='actions2' %}

Create a trigger phrase - make sure you spear it rather than type it.

{% include widgets/image.html src='/images/jekyll/2017-07-01/actions3.png' width='300' height='200' title='actions3' %}

Then you can test it in the simulator

{% include widgets/image.html src='/images/jekyll/2017-07-01/actions1.png' width='300' height='200' title='actions1' %}

If you want to test it on a real Google Home for the moment (June 2017) you need to set you Assistant Language in the Home app on your phone to be US (apparently Google are going to fix this). You may also need a Google Cloud Platform application.

{% include widgets/image.html src='/images/jekyll/2017-07-01/home1.png' width='200' height='300' title='home1' %}

If you create a blank Action first then you will see this screen and you can then import from Api.Ai or use the CLI tools.

{% include widgets/image.html src='/images/jekyll/2017-07-01/actions4.png' width='300' height='200' title='actions4' %}

### Create or attach the Action to your Google Cloud Platform 

You will need a Google Cloud Platform account - once again it must match the google account used elsewhere. You can have multiple projects but the one you want will match the name in Actions - you are going to need the ID later

{% include widgets/image.html src='/images/jekyll/2017-07-01/gcp1.png' width='300' height='200' title='gcp1' %}

I am not sure who created the application - either Api.Ai or Actions console) - but selecting permissions from the Actions Console takes you to the Google Cloud Platform API section

{% include widgets/image.html src='/images/jekyll/2017-07-01/gcp2.png' width='300' height='200' title='gcp2' %}

The ones I think are important are

1. Google Cloud Speech API 
1. Google Compute Engine API - you need this one if you want to use a web hook hosted in Google Cloud Platform 
1. Google Assistant API 


### Hosting a webhook in Google Cloud Platform

This [article](https://medium.com/google-cloud/how-to-create-a-custom-private-google-home-action-260e2c512fc) was pretty good.

There are a number of things you need to do

1. You must have a billing account. If you are a developer you can have a Cloud Platform Account without a billing plan, you will not be able to upload to the compute engine until you create a billing and give your credit card number. I have not been charged (yet).
1. Install node and clone one of the sample webhook repos.
1. Test your webhook by grabbing some JSON from the Api.Ai console and using CURL
1. Install the Google Cloud SDK.
1. Upload your webhook to the Google App Engine - you will need the project ID from the Cloud Platform (see above) 
In my case the upload was like this 
Updating service [default]...done.                                                                                        Deployed service [default] to [https://derekstestarea.appspot.com] 
1. Update your webhook in the fulfilment section of Api.Ai

### Testing locally

My hook looked like this - its just a copy of an [example hook](https://github.com/api-ai/apiai-webhook-sample)

```javascript
'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const LibraryCommand = require('./libraryCommand');

const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech, request body not in the correct format';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                var processed = false;

                // lets work from the name of the agent
                console.log('action: ', requestBody.result.action);
                switch (requestBody.result.action) {
                    case "library_command": {
                        var libraryCommand = new LibraryCommand(
                            {
                                command: requestBody.result.parameters["library-command"],
                                property: requestBody.result.parameters["book-property"],
                                search: requestBody.result.parameters["search-text"]
                            }
                        );
                        speech = libraryCommand.executeCommand();
                        processed = true;
                    }
                }

                if (!processed) {
                    speech = "text returned from Derek's web hook";

                    if (requestBody.result.fulfillment) {
                        speech += requestBody.result.fulfillment.speech;
                        speech += ' ';
                    }

                    if (requestBody.result.action) {
                        speech += 'action: ' + requestBody.result.action;
                    }
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});
```

I created a CURL script to test the hook locally

```
curl -X POST -H "Authorization: key=****" -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '
{
  "id": "c614adb3-0f16-4e3e-90ec-472534c63391",
  "timestamp": "2017-06-20T03:55:21.654Z",
  "lang": "en",
  "result": {
    "source": "agent",
    "resolvedQuery": "blackbirds",
    "action": "library_command",
    "actionIncomplete": false,
    "parameters": {
      "book-property": "title",
      "library-command": "find book",
      "search-text": "blackbirds"
    },
    "contexts": [],
    "metadata": {
      "intentId": "fbf85531-3349-4c0f-8274-16760fdb428f",
      "webhookUsed": "true",
      "webhookForSlotFillingUsed": "false",
      "webhookResponseTime": 62,
      "intentName": "library"
    },
    "fulfillment": {
      "speech": "text returned from Dereks web hook The library command is find book the property is title the search text is blackbirds action: library_command",
      "source": "apiai-webhook-sample",
      "displayText": "text returned from Dereks web hook The library command is find book the property is title the search text is blackbirds action: library_command",
      "messages": [
        {
          "type": 0,
          "speech": "text returned from Dereks web hook The library command is find book the property is title the search text is blackbirds action: library_command"
        }
      ]
    },
    "score": 1
  },
  "status": {
    "code": 200,
    "errorType": "success"
  },
  "sessionId": "b104cb9b-8990-4c3e-891d-abf76d4dec11"
}
' "http://localhost:5000/hook"
```

When I ran it I got this, the "speech" element is spoken by Google Home

```
$ ./test1
{"speech":"library command find book, property title, search blackbirds","displayText":"library command find book, property title, search blackbirds","source":"apiai-webhook-sample"} 
```

### Hosting a webhook elsewhere

Webhooks can be hosted anywhere as long as you accept the correct JSON and return the correct JSON. They can be written in any language for example a .NET Core WebAPI controller might look like this

```C#
[HttpPost("apiai")]
public WebHookResponse ApiAi([FromBody] WebHookRequest request)
{
  WebHookResponse response = new WebHookResponse();
  response.Source = "books-api-source";
  response.Speech = "books web hook: empty speech, request body not in the correct format";
  if (request.Result?.Action == "library_command")
  {
    response.Speech = ProcessLibraryCommand(request);
  }
  response.DisplayText = response.Speech;
  return response;
}

// Models

public class Parameters
{
    [JsonProperty("book-property", NullValueHandling = NullValueHandling.Ignore)]
    public string BookProperty { get; set; }
    [JsonProperty("library-command", NullValueHandling = NullValueHandling.Ignore)]
    public string LibraryCommand { get; set; }
    [JsonProperty("search-text", NullValueHandling = NullValueHandling.Ignore)]
    public string SearchText { get; set; }
}

public class Result
{
    [JsonProperty("action", NullValueHandling = NullValueHandling.Ignore)]
    public string Action { get; set; }
    [JsonProperty("parameters", NullValueHandling = NullValueHandling.Ignore)]
    public Parameters Parameters { get; set; }
}

public class WebHookRequest
{
    [JsonProperty("result", NullValueHandling = NullValueHandling.Ignore)]
    public Result Result { get; set; }
}

public class WebHookResponse
{
    [JsonProperty("speech")]
    public string Speech { get; set; }
    [JsonProperty("displayText")]
    public string DisplayText { get; set; }
    [JsonProperty("source")]
    public string Source { get; set; }
}

```

It can be tested with the same CURL script and hooked up to the Action is the same manner.

[ghome-url]:			https://madeby.google.com/home/
[echo-url]:				https://www.amazon.com/Amazon-Echo-And-Alexa-Devices/b?ie=UTF8&node=9818047011
[homepod-url]:			https://www.apple.com/homepod/
[multicast-url]:        https://support.google.com/googlehome/answer/7174267?hl=en
[sonos-url]:            http://www.sonos.com/en/home