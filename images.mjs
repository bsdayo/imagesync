import fs from 'fs'

const IMAGES = {
  'docker.io': [
    'library/alpine:latest',
    'library/postgres:15,16,17',
    'library/redis:6,7',
    'prom/prometheus:latest',
    'otel/opentelemetry-collector-contrib:latest',
    'prom/node-exporter:latest',
    'snowdreamtech/frpc:latest',
    'snowdreamtech/frps:latest',
    'diygod/rsshub:latest,chromium-bundled',
    ['vaultwarden/server:latest', 'vaultwarden'],
    'jellyfin/jellyfin:latest',
    'itzg/minecraft-server:latest'
  ],
  'ghcr.io': ['home-assistant/home-assistant:stable'],
}

// Generate JSON
const generated = {}
for (const [registry, list] of Object.entries(IMAGES)) {
  for (const item of list) {
    let srcImage = ''
    let dstRepo = ''
    if (typeof item === 'object') {
      srcImage = item[0]
      dstRepo = item[1]
    } else {
      srcImage = item
      dstRepo = /(?<=\/).+(?=:)/.exec(item)[0]
    }
    const srcFull = `${registry}/${srcImage}`
    const dstFull = `registry.cn-shenzhen.aliyuncs.com/bsdayo/${dstRepo}`
    generated[srcFull] = dstFull
  }
}
fs.writeFileSync('images.json', JSON.stringify(generated, null, 2))
