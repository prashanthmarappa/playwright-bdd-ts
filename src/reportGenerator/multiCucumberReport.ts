import { loadEnv } from "../helper/config/browserConfig";
import DateUtil from './DateUtil';


export default class HTMLReporter {
    public static generateReport() {
        const os = require('node:os');
        const report = require('multiple-cucumber-html-reporter');
        loadEnv();
        report.generate({
            jsonDir: 'reports/',
            reportPath: 'reports/',
            pageTitle: "Test Execution Report",
            reportName: "Execution Results",
            displayDuration: false,
            displayReportTime: false,
            hideMetadata: false,
            customMetadata: false,
            metadata: {
                browser: {
                    name: process.env.BROWSER,
                    version: 'latest'
                },
                device: os.hostname(),
                platform: {
                    name: os.type(),
                    version: os.version(),
                }
            },
            customData: {
                title: "Run Info",
                data: [
                    { label: 'Execution Date', value: DateUtil.dateGenerator("DD/MM/YYYY", 0, 0, 0) },
                    { label: 'Base URL', value: process.env.BASE_URL },
                    { label: 'Environment', value: process.env.APP_ENV },
                    //  { label: "SOAP Endpoint', value: process.env.BASE_URL},
                    { label: 'Browser', value: process.env.BROWSER },
                ]
            }
        });
    }
}
HTMLReporter.generateReport();