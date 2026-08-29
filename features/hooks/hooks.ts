/*
import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { chromium } from 'playwright';
import { CustomWorld } from "../support/world";


AfterAll(function () {
    console.log('This will run after all scenario, db connection close')
})

Before(async function (this: CustomWorld) {
    console.log('This will run before each scenario, login to application');
    this.browser = await chromium.launch({
        headless: false
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
})

BeforeAll(function () {
    console.log('This will run before all scenario, db connection open')
})

After(async function (this: CustomWorld) {
    console.log('This will run after each scenario, log out from application');
    await this.page.close();
    await this.context.close();
    await this.browser.close();
})

*/

import {After,AfterAll,Before,BeforeAll,Status} from "@cucumber/cucumber";
import { chromium } from "playwright";
import { CustomWorld } from "../support/world";
import fs from "fs";
import path from "path";


Before(async function (this: CustomWorld) {
    console.log("Starting browser...");
    this.browser = await chromium.launch({
        headless: false
    });

    this.context = await this.browser.newContext({
        // Record video for every scenario. We will keep it only when the scenario fails.
        recordVideo: {
            dir: "test-results/videos"
        }
    });

    // Start Playwright tracing
    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });

    this.page = await this.context.newPage();

});


After(async function (this: CustomWorld, scenario) {

    const failed =
        scenario.result?.status === Status.FAILED;


    //  * FAILED SCENARIO

    if (failed && this.page) {
        console.log(
            `Scenario failed: ${scenario.pickle.name}`
        );


        // 1. SCREENSHOT
        const screenshotDir =
            path.resolve("test-results/screenshots");

        fs.mkdirSync(
            screenshotDir,
            { recursive: true }
        );


        const scenarioName =
            scenario.pickle.name
                .replace(/[^a-zA-Z0-9]/g, "_");


        const screenshotPath =
            path.join(
                screenshotDir,
                `${Date.now()}-${scenarioName}.png`
            );


        await this.page.screenshot({
            path: screenshotPath,
            fullPage: true
        });


        console.log(
            `Screenshot saved: ${screenshotPath}`
        );


        // Attach screenshot to Cucumber report

        const imageBuffer =
            fs.readFileSync(screenshotPath);

        this.attach(
            imageBuffer,
            "image/png"
        );


        // 2. PLAYWRIGHT TRACE
        const traceDir =
            path.resolve("test-results/traces");

        fs.mkdirSync(
            traceDir,
            { recursive: true }
        );


        const tracePath =
            path.join(
                traceDir,
                `${Date.now()}-${scenarioName}.zip`
            );


        // Stop tracing and save trace
        await this.context.tracing.stop({
            path: tracePath
        });


        console.log(
            `Trace saved: ${tracePath}`
        );


        // Attach trace path to report

        this.attach(
            `Playwright Trace: ${tracePath}`,
            "text/plain"
        );

    } else {

        /*
         * Successful scenario
         * Stop trace without saving
         */

        await this.context.tracing.stop();
    }


    // 3. VIDEO
    if (this.page) {

        const video =
            this.page.video();

        if (video) {

            /*
             * IMPORTANT:
             * Video is finalized when
             * BrowserContext is closed.
             */

            await this.page.close();

            const videoPath =
                await video.path();

            console.log(
                `Video saved: ${videoPath}`
            );

        } else {

            await this.page.close();
        }

    }


    // 4. CLOSE CONTEXT
    if (this.context) {

        await this.context.close();
    }


    // 5. CLOSE BROWSER
    if (this.browser) {
        await this.browser.close();
    }
});


BeforeAll(function () {
    console.log("This executes before all scenarios");
});


AfterAll(function () {
    console.log("This executes after all scenarios");
});