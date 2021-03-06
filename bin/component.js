const path = require('path')
const fs = require('fs-extra')
const log = require('../lib/log')
const utils = require('../lib/utils')
const CONTENT = require('../config/component')
const CONFIG = utils.genConfig()

function generateComponent (name) {
    const dir = path.join(process.cwd(), CONFIG.components, name)
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
            reject(new Error(`组件 ${name} 已经存在`))
        }
    }).then(() => {
        return Promise.all([
            fs.outputFile(jsFilePath, CONTENT.js),
            fs.outputFile(jsonFilePath, CONTENT.json),
            fs.outputFile(wxmlFilePath, CONTENT.wxml),
            fs.outputFile(wxssFilePath, CONTENT.wxss)
        ])
    }).then(res => {
        log.success(`组件 ${name} 创建成功, path:\r\n\t${dir}/`)
    }).catch(err => {
        console.log(err)
    })
}

module.exports = generateComponent