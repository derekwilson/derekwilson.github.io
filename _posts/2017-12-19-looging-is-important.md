---
layout: post
title: "Logging is important"
date: 2017-12-19 12:00:00
published: true
tags: ["General", "Development", ".Net"]
categories: ["General", "Development", ".Net"]
---

We all spend lots of time looking at the happy paths in code. I have previously blogged about how important it is to [generate good error messages][error-post-url] and [handle exceptions properly][exception-post-url]. Well it turns out that logging is important as well.

Recently I came across this code in production. The problem was that the way the code was structured meant that we didn't get enough information in the logs to help us fix the problem. It was even more frustrating because the original developer had obviously tried to log any errors.

{% highlight C# linenos %}
var error = Serializer.DeserializeFromJson<Error>(response.Content);
DetailsResponse detailsResponse = null;
string errorMessage = null;

if (error.Name.Equals(ResultTooLarge))
{
 errorMessage = $"Status {response.StatusCode} Message: {error.Message}. Too many, Max={error.MaximumSize} Actual={error.ResultSize}.";
 detailsResponse = new DetailsResponse
 {
  TotalTransactions = int.Parse(error.ResultSize),
  HttpStatusCode = response.StatusCode,
 };
}
else
{
 string errorMessage = $"Status {response.StatusCode} Message: {error.Message} ";
 detailsResponse = new DetailsResponse
 {
  ErrorMessage = errorMessage,
  HttpStatusCode = response.StatusCode,
 };
}

_logger.LogError(LogCategory.General, errorMessage);
return accountsDetailsResponse;
{% endhighlight %}

To be fair the code should have worked. After all, the API spec said that if `Name` property was `ResultTooLarge` then the `ResultSize` property will contain the actual size. The thing is that the spec said this but the API code didn't actually do that.

So on line 10 the `int.Parse` was throwing an error because the payload did not have a `ResultSize` in the correct format. Even worse, we have all the information we need - like the `error.Message` however as we dont log it until line 24 we never get to see it.

I changed the flow a little

{% highlight C# linenos %}
var error = Serializer.DeserializeFromJson<Error>(response.Content);
DetailsResponse detailsResponse = null;

if (error.Name.Equals(ResultTooLarge))
{
 errorMessage = $"Status {response.StatusCode} Message: {error.Message}. Too many, Max={error.MaximumSize} Actual={error.ResultSize}.";
 _logger.LogError(LogCategory.General, errorMessage);
 int transactions = 0;
 int.TryParse(error.ResultSize, out transactions);
 detailsResponse = new DetailsResponse
 {
  TotalTransactions = transactions,
  HttpStatusCode = response.StatusCode,
 };
}
else
{
 string errorMessage = $"Status {response.StatusCode} Message: {error.Message} ";
 _logger.LogError(LogCategory.General, errorMessage);
 detailsResponse = new DetailsResponse
 {
  ErrorMessage = errorMessage,
  HttpStatusCode = response.StatusCode,
 };
}
return accountsDetailsResponse;
{% endhighlight %}

I know lines 7 and 19 are duplicates but on the up side we actually log the information we need as soon as we have it minimising the opportunity for us to loose it.

Also I used TryParse so we do not fault if the API fails to follow its own spec. We will react correctly, in that we will treat the response as a `ResultTooLarge` rather than a general error.

All this looks simple but including time to review and get this code into production and check that it was working properly blew a two day whole in our sprint.

[exception-post-url]:	/blog/2011/04/26/exception-handling-in-a-tryfinally-block
[error-post-url]:		/blog/2013/08/26/error-messages-are-important



