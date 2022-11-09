import { metrics } from '../constants'

function commentReportCompiler(this: any) {
  const metricsObj: any = {}
  metrics.exists.map((metric) => {
    metricsObj[metric] = 0
  })
  this.report = {
    shorterthan15: 0,
    isURL: 0,
    // ...metricsObj,
  }
}

commentReportCompiler.prototype = {
  checkIfExists: function (haystack: string, needle: string) {
    if (haystack.indexOf(needle) !== -1) {
      this.report[needle]++
    }
  },
  checkIfShorterThan15: function (sentence: string) {
    if (sentence.length < 15) {
      this.report.shorterthan15++
    }
  },
  checkIfUrl: function (sentence: string) {
    if (
      new RegExp(
        '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?',
      ).test(sentence)
    ) {
      this.report.isURL++
    }
  },
}
