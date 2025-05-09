# Quick demo of using axios with Observe query API

Not production quality. Just a quick demonstration, including ndjson stream processing.

## Instructions

1. Create environment file

```bash
cp .env.example .env
```
2. Update your customer ID and Observe query API token in the `.env` file.
See [Observe Developer API docs](https://developer.observeinc.com/) on how to generate a token.

3. Update `query-observe.js` API with your dataset ID and OPAL query.

4. Initialize the project

```bash
npm i
```

5. Run the script

```bash
npm start
```

You should see output along the lines (will vary depending on the query and contents of your dataset):

```json
{
  body: 'ts=2025-05-09T03:00:35.464Z caller=write_handler.go:212 level=warn component=web msg="Error translating OTLP metrics to Prometheus write request" err="invalid temporality and type combination for metric \\"app_currency_counter\\""',
  timestamp: '1746759635465229742'
}
{
  body: '2025-05-09T03:00:35.463Z\tinfo\tMetricsExporter\t{"kind": "exporter", "data_type": "metrics", "name": "debug", "resource metrics": 1, "metrics": 1, "data points": 1}',
  timestamp: '1746759635463952838'
}
```