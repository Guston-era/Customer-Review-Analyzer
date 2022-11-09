import { metrics } from '../constants'
import fs from 'fs'
import readline from 'readline'

//main compiler
export function commentReportCompiler(this: any) {
  const metricsObj: any = {}
  metrics.exists.map((metric) => {
    metricsObj[metric] = 0
  })
  this.report = {
    shorterthan15: 0,
    isURL: 0,
    ...metricsObj,
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

//function that reads each file, line by line
const accumulatorArray: {}[] = []
const readProp = (readFileLocation: string, fileslength: number) => {
  const compiler = new commentReportCompiler()
  const text = fs.createReadStream(readFileLocation)

  const rl = readline.createInterface({
    input: text,
  })

  rl.on('line', (res) => {
    searcher(res)
  })

  rl.on('close', function () {
    accumulatorArray.push(compiler)
    if (accumulatorArray.length == fileslength) {
      console.log(accumulatorArray)
    }
  })

  function searcher(sentence: string) {
    sentence = sentence.toLowerCase()

    //check the length if shorter than 15
    compiler.checkIfShorterThan15(sentence)

    //check for exists
    metrics.exists.map((met: string) => {
      compiler.checkIfExists(sentence, met.toLowerCase())
    })

    //check if url
    compiler.checkIfUrl(sentence)
  }
}
