import { loadEnv } from "./src/helper/config/config";

var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonDir:'reports/',
        output: 'reports/cucumber_report_bootstrap.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test_Environment": "",
            "Browser": "",
            "Platform": "Windows 10",
            "APP_URL": "",
            "Executed": "Remote"
        },
        failedSummaryReport: true,
    };

    function generateHtml(){
        loadEnv();
        options.metadata.Browser=process.env.BROWSER as string;
        options.metadata.APP_URL=process.env.BASE_URL as string;
        options.metadata.Test_Environment=process.env.APP_ENV as string;
        reporter.generate(options);
    }
    generateHtml();
   // reporter.generate(options);