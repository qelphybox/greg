import axios from 'axios'
import * as fs from 'fs'

const json = JSON.parse(
  '{"from":"Invoiced, Inc.","to":"Acme, Corp.","logo":"https://invoiced.com/img/logo-invoice.png","number":1,"items":[{"name":"Starter plan","quantity":1,"unit_cost":99}],"notes":"Thanks for your business!"}'
)

const _headers = {
  'Content-Type': 'application/json',
}

axios
  .post('https://invoice-generator.com', json, {
    // proxy: {
    //   protocol: 'https',
    //   host: '152.252.125.64',
    //   port: 8080,
    // },
    headers: _headers,
    responseType: "stream"
  })
  .then((res) => {
    console.log(res.data)
    res.data.pipe(fs.createWriteStream("message2.pdf"));
    console.log('file has been created')
  })
  .catch((err) => {
    console.log(err)
  })
