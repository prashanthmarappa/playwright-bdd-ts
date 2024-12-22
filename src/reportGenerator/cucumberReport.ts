import fs from 'fs';
import path from 'path';
import { loadEnv } from "../helper/config/browserConfig";
import DateUtil from '../reportGenerator/DateUtil';
var reporter = require('cucumber-html-reporter');

const reportsDir = path.resolve(__dirname, '../../reports');
const combinedReportPath = path.join(reportsDir, 'combined.json');
const reportFiles = fs.readdirSync(reportsDir).filter(file => file.endsWith('.json'));

const combinedReport = reportFiles.reduce((acc, file) => {
  const report = JSON.parse(fs.readFileSync(path.join(reportsDir, file), 'utf-8'));
  const browser = file.match(/cucumber-(\w+)\.json/)?.[1];
  report.forEach((feature: any) => {
    feature.elements.forEach((scenario: any) => {
      scenario.browser = browser;
    });
  });
  return acc.concat(report);
}, []);

fs.writeFileSync(combinedReportPath, JSON.stringify(combinedReport, null, 2));

var options = {
  theme: 'bootstrap',
  jsonFile: combinedReportPath,
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
    "Browser": "Multiple",
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
  options.metadata.APP_URL = process.env.BASE_URL as string;
  options.metadata.Test_Environment = process.env.APP_ENV as string;
  reporter.generate(options);
}

generateHtml();