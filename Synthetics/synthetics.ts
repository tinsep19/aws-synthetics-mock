import { PuppeteerNode, Page, Browser, PuppeteerLaunchOptions, HTTPResponse } from 'puppeteer';
import SyntheticsConfiguration from './synthetics_configuration';
import http from "node:http";
import https from "node:https";

type StepConfiguration = {};
type Scenario = () => Promise<any>;
type APICallback = (res: http.IncomingMessage) => void;
type BodySupport = { body?: Buffer };
type SyntheticsRequestOptions = string | URL | (https.RequestOptions | http.RequestOptions) & BodySupport;

function isBodySupport(req : SyntheticsRequestOptions) : req is (https.RequestOptions | http.RequestOptions) & BodySupport {
  return req.hasOwnProperty('body');
}

class Synthetics {
  puppeteer: PuppeteerNode;
  browser: Browser | undefined;
  page: Page | undefined;
  config: SyntheticsConfiguration;
  options;

  constructor(puppeteer: PuppeteerNode, configuration: SyntheticsConfiguration) {
    this.puppeteer = puppeteer;
    this.config = configuration;
    this.options = { 
      headless: false,
      // executablePath: '/usr/bin/google-chrome'
    };
  }

  async addUserAgent(page: Page, userAgent: string) : Promise<void> {
    const ua = await page.browser().userAgent();
    await page.setUserAgent(`${ua}, ${userAgent}`);
  }

  async executeStep(step: string, scenario: Scenario, stepConfig: StepConfiguration) : Promise<void> {
    try {
      await scenario();
    } catch (e) {
      throw `fail step ${step}`;
    }
  }

  async executeHttpStep(step: string, requestOptions : SyntheticsRequestOptions, callback : APICallback, stepConfig: StepConfiguration) {
    const response = new Promise<http.IncomingMessage>(resolve => {
      if (typeof requestOptions == "string") {
        const proto = requestOptions.startsWith("https:") ? https : http;
        const req = proto.request(requestOptions, resolve);
        req.end();
      } else if (isBodySupport(requestOptions)) {
        const { body, protocol } = requestOptions;
        const proto = (protocol == "https:" ? https : http);
        const req = proto.request(requestOptions, resolve);
        req.write(body);
        req.end();  
      } else {
        const { protocol } = requestOptions;
        const proto = (protocol == "https:" ? https : http);
        const req = proto.request(requestOptions, resolve);
        req.end();
      }  
    });
    const res = await response;
    if (callback) {
      await callback(res);
    } else {
      if (res.statusCode && res.statusCode >= 400) {
        throw `Fail to access ${step}`;
      }
    }
  }

  getConfiguration() {
    return this.config;
  }

  async takeScreenshot(step: string, section: string) : Promise<void>{ }

  async getDefaultLaunchOptions() : Promise<PuppeteerLaunchOptions> {
    return this.options;
  }

  async launch() : Promise<Browser>{
    if (this.browser) {
      const b = this.browser;
      this.browser = undefined;
      await b.close();
    }
    this.browser = await this.puppeteer.launch(this.options);
    return this.browser;
  }

  async getPage() : Promise<Page> {
    const browser = this.browser;
    if (!browser) { throw "browser is undefined."; }
    const pages = await browser.pages();
    if (pages.length > 0) {
      return pages[0];
    } else {
      return await browser.newPage();
    }
  }

  async setUp() : Promise<Browser> {
    return this.launch();
  }

  async tearDown() : Promise<void> {
    let closeTask = [];
    if (this.page) {
      closeTask.push(this.page.close());
      this.page = undefined;
    }

    if (this.browser) {
      closeTask.push(this.browser.close());
      this.browser = undefined;
    }
    await Promise.all(closeTask);
  }
};

export default Synthetics;
