import { test, expect } from '@playwright/test';
import { AboutPage } from '../page/aboutPage.js';
import { HomePage } from '../page/homePage.js';

test.describe('About Page Tests', () => {
    let aboutPage;

    test.beforeEach(async ({ page }) => {
        aboutPage = new AboutPage(page);
        await aboutPage.gotoAboutPage();
    });

    test('should display correct page title', async ({ page }) => {
        await expect(aboutPage.pageTitle).toBeVisible();
        await expect(aboutPage.pageTitle).toHaveText('About');
    });

    test('should display team section', async ({ page }) => {
        await expect(aboutPage.teamSection).toBeVisible();
    });

    test('should display mission section', async ({ page }) => {
        await expect(aboutPage.missionSection).toBeVisible();
    });

    test('should display company description', async ({ page }) => {
        await expect(aboutPage.companyDescription).toBeVisible();
    });

    test('should display testimonials section', async ({ page }) => {
        await expect(aboutPage.testimonials).toBeVisible();
    });

    test('contact button should navigate to contact page', async ({ page }) => {
        await aboutPage.contactButton.click();
        await expect(page).toHaveURL('https://www.givensfireandforestry.com/contact');
    });

    test('should maintain navigation bar functionality', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.servicesLink.click();
        await expect(page).toHaveURL('https://www.givensfireandforestry.com/services');
    });

    test('should have proper meta tags for SEO', async ({ page }) => {
        const title = await page.title();
        expect(title).toBeTruthy();
        
        const description = await page.getAttribute('meta[name="description"]', 'content');
        expect(description).toBeTruthy();
    });

    test('should load images properly', async ({ page }) => {
        // Wait for all images to load
        await Promise.all([
            page.waitForSelector('img'),
            page.waitForLoadState('domcontentloaded')
        ]);

        // Check if any images are broken
        const brokenImages = await page.evaluate(() => {
            const images = document.getElementsByTagName('img');
            const broken = [];
            for (const img of images) {
                if (!img.complete || img.naturalHeight === 0) {
                    broken.push(img.src);
                }
            }
            return broken;
        });

        expect(brokenImages.length).toBe(0);
    });

    test('should be responsive', async ({ page }) => {
        // Test mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(aboutPage.pageTitle).toBeVisible();

        // Test tablet viewport
        await page.setViewportSize({ width: 768, height: 1024 });
        await expect(aboutPage.pageTitle).toBeVisible();

        // Test desktop viewport
        await page.setViewportSize({ width: 1920, height: 1080 });
        await expect(aboutPage.pageTitle).toBeVisible();
    });
});