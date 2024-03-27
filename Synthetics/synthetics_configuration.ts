type ConfigurationOptions = {
  includeRequestHeaders? : boolean,
  includeResponseHeaders? : boolean,
  includeRequestBody? : boolean,
  includeResponseBody? : boolean,
  restrictedHeaders? : string[],
};
class SyntheticsConfiguration {
  setConfig(opt: ConfigurationOptions) { }
  disableAggregatedRequestMetrics() { }
  disableRequestMetrics() { }
  disableStepMetrics() { }
  enableAggregatedRequestMetrics() { }
  enableRequestMetrics() { }
  enableStepMetrics() { }
  get2xxMetric() { return true; }
  get4xxMetric() { return true; }
  get5xxMetric() { return true; }
  getAggregated2xxMetric() { return true; }
  getAggregated4xxMetric() { return true; }
  getAggregatedFailedCanaryMetric() { return true; }
  getAggregatedFailedRequestsMetric() { return true; }
  getAggregated5xxMetric() { return true; }
  getFailedCanaryMetric() { return true; }
  getFailedRequestsMetric() { return true; }
  getStepDurationMetric() { return true; }
  getStepSuccessMetric() { return true; }
  with2xxMetric(_2xxMetric: boolean) { }
  with4xxMetric(_4xxMetric: boolean) { }
  with5xxMetric(_5xxMetric: boolean) { }
  withAggregated2xxMetric(aggregated2xxMetric: boolean) { }
  withAggregated4xxMetric(aggregated4xxMetric: boolean) { }
  withAggregated5xxMetric(aggregated5xxMetric: boolean) { }
  withAggregatedFailedCanaryMetric(aggregatedFailedCanaryMetric: boolean) { }
  withAggregatedFailedRequestsMetric(aggregatedFailedRequestsMetric: boolean) { }
  withFailedCanaryMetric(failedCanaryMetric: boolean) { }
  withFailedRequestsMetric(failedRequestsMetric: boolean) { }
  withStepDurationMetric(stepDurationMetric: boolean) { }
  withStepSuccessMetric(stepSuccessMetric: boolean) { }
  withHarFile() { }
  withStepsReport() { }
  withIncludeUrlPassword() { }
  withRestrictedUrlParameters() { }
  withLogRequest() { }
  withLogResponse() { }
  withLogRequestBody() { }
  withLogResponseBody() { }
  withLogRequestHeaders() { }
  withLogResponseHeaders() { }
  getHarFile() { return true; }
  getStepsReport() { return true; }
  getIncludeUrlPassword() { return true; }
  getRestrictedUrlParameters() { return true; }
  getLogRequest() { return true; }
  getLogResponse() { return true; }
  getLogRequestBody() { return true; }
  getLogResponseBody() { return true; }
  getLogRequestHeaders() { return true; }
  getLogResponseHeaders() { return true; }
  disableStepScreenshots() { }
  enableStepScreenshots() { }
  getScreenshotOnStepFailure() { }
  getScreenshotOnStepStart() { }
  getScreenshotOnStepSuccess() { }
  withScreenshotOnStepStart(screenshotOnStepStart: boolean) { }
  withScreenshotOnStepSuccess(screenshotOnStepSuccess: boolean) { }
  withScreenshotOnStepFailure(screenshotOnStepFailure: boolean) { }
  withVisualVarianceThresholdPercentage(desiredPercentage: number) { }
  withVisualVarianceHighlightHexColor(color: string) { }
  withFailCanaryRunOnVisualVariance(failCanary: number) { }
}

export default SyntheticsConfiguration;
