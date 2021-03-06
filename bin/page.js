const path = require('path')
const fs = require('fs-extra')
const log = require('../lib/log')
const utils = require('../lib/utils')
const CONTENT = require('../config/page')
const CONFIG = utils.genConfig()

function generatePage (name) {
    const dir = path.join(process.cwd(), CONFIG.pages, name)
    const jsFilePath = path.join(dir, `${name}.js`)
    const jsonFilePath = path.join(dir, `${name}.json`)
    const wxmlFilePath = path.join(dir, `${name}.wxml`)
    const wxssFilePath = path.join(dir, `${name}.wxss`)

    new Promise((resolve, reject) => {
        if (!fs.existsSync(dir)) {
            fs.ensureDir(dir).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        } else {
            reject(new Error(`页面 ${name} 已经存在`))
        }
    }).then(res => {
        return Promise.all([
            fs.outputFile(jsFilePath, CONTENT.js),
            fs.outputFile(jsonFilePath, CONTENT.json),
            fs.outputFile(wxmlFilePath, CONTENT.wxml),
            fs.outputFile(wxssFilePath, CONTENT.wxss)
        ])
    }).then(res => {
        log.success(`页面  ${name} 创建成功, path:\r\n\t${dir}/`)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = generatePage