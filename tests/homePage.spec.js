import { test, expect } from '@playwright/test';
import { HomePage } from '../page/homePage.js';

test.describe('Nav bar links', () => {
    

    const urls = [
        {name: 'about', expectedUrl: 'https://www.givensfireandforestry.com/about'},
        {name: 'gallery', expectedUrl: 'https://www.givensfireandforestry.com/gallery'},
        {name: 'services', expectedUrl: 'https://www.givensfireandforestry.com/services'},
        {name: 'resources', expectedUrl: 'https://www.givensfireandforestry.com/resources'},
        {name: 'contacts', expectedUrl:  'https://www.givensfireandforestry.com/contact'},
        {name: 'getQuote', expectedUrl: 'https://www.givensfireandforestry.com/appointments'}
    ];



for (const url of urls) {
    test(`Nav bar ${url.name} link leads to correct page`, async ({ page }) => {
        const homepage = new HomePage(page);
        await homepage.gotoHomePage();
        await homepage[`${url.name}Link`].click();
        await expect(page).toHaveURL(url.expectedUrl);
    });
}


test('Nav bar instagram link opens in a new page', async ({ page, context }) => {
    const homepage = new HomePage(page);
    await homepage.gotoHomePage();
    const [instagram] = await Promise.all ([
        context.waitForEvent('page'),
        page.getByLabel(HomePage.instagramLabel).first().click()
    ])
   
    await expect(instagram).toHaveURL('https://www.instagram.com/givensfireandforestry/');  
})

test('Nav bar facebook link opens in a new page', async ({ page, context }) => {
    const homePage = new HomePage(page);
    await homePage.gotoHomePage();

    const [facebook] = await Promise.all([
        context.waitForEvent('page'),
        page.getByLabel(HomePage.facebookLabel).first().click()
    ]);

    await expect(facebook).toHaveURL('https://www.facebook.com/people/Givens-Fire-and-Forestry/61573118516671/');
});

});

test('learn more buttons within carousel lead to correct page while opening in a new tab', async ({ page, context }) => {
    const homepage = new HomePage(page);
    await homepage.gotoHomePage();
    const learnMoreBtns = page.getByRole('link', { name: HomePage.learnMoreLinks });

    // Wait for the first button to be visible
    await learnMoreBtns.first().waitFor({ state: 'visible' });

    for (let i = 0; i < 4; i++) {
        // Wait for the specific button to be visible before clicking
        const button = learnMoreBtns.nth(i);
        await button.waitFor({ state: 'visible' });
        await button.scrollIntoViewIfNeeded();
        
        // Check if the link opens in a new tab (has target="_blank")
        const opensInNewTab = await button.evaluate(el => el.getAttribute('target') === '_blank' || el.getAttribute('target') === '_new');
        
        if (opensInNewTab) {
            const [newPage] = await Promise.all([
                context.waitForEvent('page'),
                button.click()
            ]);
            await expect(newPage).toHaveURL(/^https:\/\/www\.givensfireandforestry\.com\/services/);
            await newPage.close();
        } else {
            // Regular navigation - wait for navigation and then go back
            await Promise.all([
                page.waitForURL(/^https:\/\/www\.givensfireandforestry\.com\/services/),
                button.click()
            ]);
            await expect(page).toHaveURL(/^https:\/\/www\.givensfireandforestry\.com\/services/);
            await homepage.gotoHomePage();
            // Wait a bit for the carousel to reset
            await page.waitForTimeout(500);
        }
    }
});

test('Book consultation button leads to appointments page', async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.gotoHomePage();
    await page.getByRole('link', { name: HomePage.bookConsultationLink }).click();
    await expect(page).toHaveURL('https://www.givensfireandforestry.com/appointments');
});












