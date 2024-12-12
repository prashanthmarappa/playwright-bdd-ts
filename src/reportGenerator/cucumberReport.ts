import { loadEnv } from "../helper/config/browserConfig";
import DateUtil from '../reportGenerator/DateUtil';

var reporter = require('cucumber-html-reporter');

var options = {
    theme: 'bootstrap',
    jsonDir: 'reports/',
    output: 'reports/cucumber_report_bootstrap.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "Execution_Date": "",
        "App Name": "UMERCH",
        "App Version": "November 2024",
        "Project Code": "MERCH-2076",
        "Test_Environment": "",
        "Browser": "",
        "Platform": "MAC OS",
        "Executed": "Local",
        "APP_URL": ""
    },
    failedSummaryReport: true,
    customCSS: 'src/helper/reportGenerator/custom.css',
    columnLayout: 2,
};

function generateHtml() {
    loadEnv();
    options.metadata.Execution_Date = DateUtil.dateGenerator("DD/MM/YYYY", 0, 0, 0);
    options.metadata.Browser = process.env.BROWSER as string;
    options.metadata.APP_URL = process.env.BASE_URL as string;
    options.metadata.Test_Environment = process.env.APP_ENV as string;;
    reporter.generate(options);
}
generateHtml();
