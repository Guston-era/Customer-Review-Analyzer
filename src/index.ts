import path from 'path'
import fs from 'fs'
import { readProp } from './functions'

//create files array
const docsFolder = path.join(__dirname, 'docs')
const filesToBeProcessed: string[] = []

//synchronoous blocking operation to aggregate file names into one array first
fs.readdirSync(docsFolder).forEach((file) => {
  filesToBeProcessed.push(path.join(__dirname, 'docs', file))
})

//read everyfile in its own thread----------------------------------------------------------------
readFiles(filesToBeProcessed)

//readfiles function
async function readFiles(files: string[]) {
  await Promise.allSettled(
    files.map((file: string) => {
      readProp(file, files.length)
    }),
  )
}
