import Synthetics from './synthetics';
import SyntheticsConfiguration from './synthetics_configuration';
import puppeteer from 'puppeteer';

export = new Synthetics(puppeteer, new SyntheticsConfiguration());

