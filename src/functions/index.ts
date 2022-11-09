import { metrics } from '../constants'
import fs from 'fs'
import readline from 'readline'
interface IAccumulator {
  report: {}
}

type IAccumulatorArray = IAccumulator[]

//main compiler
const metricsObj: any = {}
metrics.exists.map((metric: string) => {
  metricsObj[metric] = 0
})
class commentReportCompiler {
  constructor(public report: any = {}) {
    this.report = {
      shorterthan15: 0,
      isURL: 0,
      ...metricsObj,
    }
  }

  checkIfExists(haystack: string, needle: string) {
    if (haystack.indexOf(needle) !== -1) {
      this.report[needle]++
    }
  }
  checkIfShorterThan15(sentence: string) {
    if (sentence.length < 15) {
      this.report.shorterthan15++
    }
  }
  checkIfUrl(sentence: string) {
    if (
      new RegExp(
        '([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?',
      ).test(sentence)
    ) {
      this.report.isURL++
    }
  }
}

//function to sum properties of objects in array
const totalsReducer = (arr: IAccumulatorArray) => {
  const finalReport = arr.reduce((acc: any, curr: IAccumulator) => {
    for (const [key, value] of Object.entries(curr.report)) {
      acc[key] = parseInt(acc[key]) || 0
      acc[key] += value
    }

    return acc
  }, {})
  return finalReport
}

//function that reads each file, line by line
const accumulatorArray: IAccumulatorArray = []
export const readLines = (readFileLocation: string, fileslength: number) => {
  const compiler = new commentReportCompiler()
  const text = fs.createReadStream(readFileLocation)

  const rl = readline.createInterface({
    input: text,
  })

  rl.on('line', (res: string) => {
    searcher(res)
  })

  rl.on('close', function () {
    accumulatorArray.push(compiler)
    if (accumulatorArray.length == fileslength) {
      //it's on the last item of the array

      // console.log(totalsReducer(accumulatorArray)) //for a quick nerdy output

      //   for a more detailed novice output:
      const finalReport: {
        shorterthan15: number
        shaker: number
        mover: number
        isURL: number
        ['?']: number
      } = totalsReducer(accumulatorArray)

      console.log(
        'comments shorter than 15 :=> ' + finalReport.shorterthan15,
        '\n',
        'comments that contains shaker :=> ' + finalReport.shaker,
        '\n',
        'comments that contains mover :=> ' + finalReport.mover,
        '\n',
        'comments that contains a url :=> ' + finalReport.isURL,
        '\n',
        'comments that contains questions :=> ' + finalReport['?'],
      )
    }
  })

  //helper function to search through
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
