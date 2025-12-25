import { test, expect } from '@playwright/test';
import { AboutPage } from '../page/aboutPage.js';

test.describe('About Page Tests', () => {
    let aboutPage;

    test.beforeEach(async ({ page }) => {
        aboutPage = new AboutPage(page);
        await aboutPage.goto();
    });

    test.describe('Core Page Elements', () => {
        test('should display correct page title', async () => {
            await expect(aboutPage.pageTitle).toBeVisible();
            await expect(aboutPage.pageTitle).toHaveText('Who we are');
        });

        test('should have proper meta tags for SEO', async ({ page }) => {
            const title = await page.title();
            expect(title).toBe('About — Givens Fire and Forestry');
        });

        test('should display company description', async () => {
            await expect(aboutPage.companyDescription).toBeVisible();
        });
    });

    test.describe('Navigation and Menu', () => {
        test('should have proper navigation menu structure', async () => {
            expect(await aboutPage.areAllNavLinksVisible()).toBe(true);
            
            // Verify URLs
            for (const [name, link] of Object.entries(aboutPage.navLinks)) {
                const href = await link.getAttribute('href');
                expect(href).toContain(name === 'home' ? '/' : `/${name}`);
            }
        });

        test('contact button should navigate to contact page', async ({ page }) => {
            await aboutPage.contactButton.click();
            await expect(page).toHaveURL('https://www.givensfireandforestry.com/contact');
        });

        test('should have working "Get a Quote" button', async ({ page }) => {
            await aboutPage.getQuoteButton.click();
            await expect(page).toHaveURL('https://www.givensfireandforestry.com/appointments');
        });
    });

    test.describe('Company Information', () => {
        test('should display team section', async () => {
            await expect(aboutPage.teamSection).toBeVisible();
        });

        test('should display mission section', async () => {
            await expect(aboutPage.missionSection).toBeVisible();
        });

        test('should display founder information correctly', async ({ page }) => {
            await expect(aboutPage.founderHeading).toBeVisible();
            
            const experiencePoints = await aboutPage.getFounderExperiencePoints();
            for (const point of experiencePoints) {
                await expect(page.getByText(point, { exact: false })).toBeVisible();
            }
        });

        test('should display sustainability commitment section', async () => {
            await expect(aboutPage.sustainabilitySection).toBeVisible();
        });
    });

    test.describe('Value Propositions', () => {
        test('should display all value propositions', async () => {
            expect(await aboutPage.areAllValuePropositionsVisible()).toBe(true);
        });

        test('should display why choose us section', async () => {
            await expect(aboutPage.whyChooseUsSection).toBeVisible();
        });
    });

    test.describe('Contact and Social', () => {
        test('should have working contact information in footer', async () => {
            await expect(aboutPage.footerPhone).toBeVisible();
            expect(await aboutPage.footerPhone.getAttribute('href')).toBe('tel:4065394224');

            await expect(aboutPage.footerCompanyName).toBeVisible();
            await expect(aboutPage.footerLocation).toBeVisible();
        });

        test('should have working social media links', async ({ context }) => {
            const socialUrls = aboutPage.getSocialMediaUrls();

            // Test Instagram
            const [instagramPage] = await Promise.all([
                context.waitForEvent('page'),
                aboutPage.socialLinks.instagram.click()
            ]);
            expect(instagramPage.url()).toContain(socialUrls.instagram);
            await instagramPage.close();

            // Test Facebook
            const [facebookPage] = await Promise.all([
                context.waitForEvent('page'),
                aboutPage.socialLinks.facebook.click()
            ]);
            expect(facebookPage.url()).toContain(socialUrls.facebook);
            await facebookPage.close();
        });
     
    });
//deprecated 
    //test.describe('Promotional Content', () => {
       // test('should have working nomination program banner', async ({ page }) => {
            // await expect(aboutPage.nominationBanner).toBeVisible();
            // await aboutPage.nominationLink.click();
             //await expect(page).toHaveURL(/\/nomination/);
       // });
   // });

    test.describe('Technical Requirements', () => {
        test('should load images properly', async ({ page }) => {
            await page.waitForLoadState('load', { timeout: 30000 });
            await page.waitForTimeout(2000);
            
            const imageResults = await page.evaluate(() => {
                const images = Array.from(document.getElementsByTagName('img'));
                return images.map(img => ({
                    src: img.src,
                    alt: img.alt || 'No alt text',
                    isSquarespaceCDN: img.src.includes('squarespace-cdn.com'),
                    visible: img.getBoundingClientRect().height > 0 && img.getBoundingClientRect().width > 0,
                    styleDisplay: window.getComputedStyle(img).display,
                    styleVisibility: window.getComputedStyle(img).visibility
                }));
            });

            const problematicImages = imageResults.filter(img => {
                return img.styleDisplay !== 'none' && 
                       img.styleVisibility !== 'hidden' && 
                       !img.visible;
            });
            
            if (problematicImages.length > 0) {
                console.log('Potentially problematic images:', problematicImages);
            }

            for (const img of imageResults) {
                if (img.styleDisplay !== 'none' && img.styleVisibility !== 'hidden') {
                    expect(img.visible, `Image not properly displayed: ${img.src}`).toBe(true);
                }
            }
        });

        test('should be responsive', async () => {
            const viewports = [
                { width: 375, height: 667, name: 'mobile' },
                { width: 768, height: 1024, name: 'tablet' },
                { width: 1920, height: 1080, name: 'desktop' }
            ];

            for (const viewport of viewports) {
                await aboutPage.checkResponsiveness(viewport);
            }
        });
    });
});