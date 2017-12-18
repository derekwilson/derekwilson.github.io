
### before

public AccountsDetailsResponse SetErrorResponseForTransaction(IHttpResponse response)
{
	const RefreshStatus refreshStatus = RefreshStatus.Failure;
	var error = Serializer.DeserializeFromJson<Error>(response.Content);
	AccountsDetailsResponse accountsDetailsResponse = null;
	string errorMessage = null;

	if (error.Name.Equals(Protocol.PayPal.Constants.ErrorConstants.ResultTooLarge))
	{
		errorMessage = $"Message: {error.Message}. There are only {error.MaximumSize} transactions allowed." +
						$"However, there were {error.ResultSize} transactions in the response.";

		accountsDetailsResponse = new AccountsDetailsResponse
		{
			TotalTransactions = int.Parse(error.ResultSize),
			HttpStatusCode = response.StatusCode,
			Status = refreshStatus
		};
	}
	else
	{
		errorMessage = $"Message: {error.Message} ";
		if (error.Details.Any())
			errorMessage += "Details: " + string.Join("\r\n", error.Details.Select(d => d.Issue));

		if ((int)response.StatusCode == 429) // TooManyRequests is not in this version of System.Net
		{
			// record that we have had one rate limited error
			_logger.IncrementCounter($"{Logging.Constants.Metrics.RateLimits}", 1, null, null);
		}

		accountsDetailsResponse = new AccountsDetailsResponse
		{
			ErrorMessage = errorMessage,
			HttpStatusCode = response.StatusCode,
			Status = refreshStatus
		};
	}

	_logger.LogError(LogCategory.General, errorMessage);
	return accountsDetailsResponse;
}


### after

public AccountsDetailsResponse SetErrorResponseForTransaction(IHttpResponse response)
{
	const RefreshStatus refreshStatus = RefreshStatus.Failure;
	var error = Serializer.DeserializeFromJson<Error>(response.Content);
	AccountsDetailsResponse accountsDetailsResponse = null;

	if (error.Name.Equals(Protocol.PayPal.Constants.ErrorConstants.ResultTooLarge))
	{
		string errorMessage = $"Message: {error.Message}. There are only {error.MaximumSize} transactions allowed." +
						$"However, there were {error.ResultSize} transactions in the response.";
		_logger.LogError(LogCategory.General, errorMessage);

		int transactions = 0;
		int.TryParse(error.ResultSize, out transactions);

		accountsDetailsResponse = new AccountsDetailsResponse
		{
			TotalTransactions = transactions,
			HttpStatusCode = response.StatusCode,
			Status = refreshStatus
		};
	}
	else
	{
		string errorMessage = $"Message: {error.Message} ";
		if (error.Details.Any())
			errorMessage += "Details: " + string.Join("\r\n", error.Details.Select(d => d.Issue));
		_logger.LogError(LogCategory.General, errorMessage);

		if ((int)response.StatusCode == 429) // TooManyRequests is not in this version of System.Net
		{
			// record that we have had one rate limited error
			_logger.IncrementCounter($"{Logging.Constants.Metrics.RateLimits}", 1, null, null);
		}

		accountsDetailsResponse = new AccountsDetailsResponse
		{
			ErrorMessage = errorMessage,
			HttpStatusCode = response.StatusCode,
			Status = refreshStatus
		};
	}

	return accountsDetailsResponse;
}




