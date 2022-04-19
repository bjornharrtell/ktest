import Kitsu from 'kitsu'
import { markdownTable } from 'markdown-table'

async function run() {

    // setup client against API
    const api = new Kitsu({
        baseURL: 'https://b1108-udv-datakat-app.azurewebsites.net'
    })

    // make request for all Datasets with selected fields and including related Sources and SourceType
    const res = await api.get('datasets', {
        params: {
            include: 'sources,sources.sourceType',
            fields: {
                datasets: 'prefix,name,title,sources'
            }
        }
    })

    // use first row keys as header values
    const header = Object.keys(res.data[0])
    // map values as is
    const rows = res.data.map(Object.values)
    // convert to markdown table
    const md = markdownTable([header].concat(rows))

    console.log(md)
}

run()
