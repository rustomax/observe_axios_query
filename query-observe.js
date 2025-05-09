require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

async function main() {
    const { OBS_CUSTOMER_ID, OBS_TOKEN } = process.env;
    if (!OBS_CUSTOMER_ID || !OBS_TOKEN) {
        throw new Error('Set OBS_CUSTOMER_ID and OBS_TOKEN in .env');
    }

    const body = {
        query: {
            outputStage: 'myStage',
            stages: [{
                input: [{ inputName: 'main', datasetId: '42161740' }], // replace with your dataset ID
                stageID: 'myStage',
                pipeline: 'pick_col timestamp, body | limit 1000' // replace with your OPAL query
            }]
        }
    };

    const url =
        `https://${OBS_CUSTOMER_ID}.observeinc.com/v1/meta/export/query?interval=10m`;

    const resp = await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OBS_CUSTOMER_ID} ${OBS_TOKEN}`
        },
        responseType: 'stream'
    });

    const rl = readline.createInterface({
        input: resp.data,
        crlfDelay: Infinity
    });

    rl.on('line', line => {
        if (!line.trim()) return;        // skip blanks
        try {
            const rec = JSON.parse(line);
            console.log(rec);              // replace with your logic
        } catch (e) {
            console.error('Bad JSON:', e);
        }
    });

    rl.on('close', () => console.log('Stream finished'));
}

main().catch(err => console.error(err)); // in production, we should handle errors
