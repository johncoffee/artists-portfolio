const {readFileSync, writeFileSync} = require('fs')
const { join } = require('path')
const { exec } = require('child_process')

const imgFolder = join(__dirname, 'public/images')
exec('ls '+imgFolder, (err, result) => {
  if (err) return console.error(err)

  console.log(imgFolder)
  const lines = result.trim().split(/\n/)

  const dataColumns = lines
    .filter(l => !!l)
    .filter(line => line.search(/\.jp?eg/i))
  // .map(line => {
  // })

  console.log(dataColumns)

  writeFileSync(join('public', '/gallery-images.js'), ` // auto generated file!
window.gallery = ${JSON.stringify(dataColumns, null, '  ')}
  `)
})
