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
    'vaultwarden/server:latest',
    'jellyfin/jellyfin:latest',
  ],
  'ghcr.io': ['home-assistant/home-assistant:stable'],
}

// Generate JSON
const generated = {}
for (const [registry, names] of Object.entries(IMAGES)) {
  for (const name of names) {
    const repo = /(?<=\/).+(?=:)/.exec(name)[0]
    const source = `${registry}/${name}`
    const dest = `registry.cn-shenzhen.aliyuncs.com/bsdayo/${repo}`
    generated[source] = dest
  }
}
fs.writeFileSync('images.json', JSON.stringify(generated, null, 2))
