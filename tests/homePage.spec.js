import { test, expect } from '@playwright/test';
import { homePage } from '../page/homePage.js';

const urls = [
    {name: 'about', expectedUrl: 'https://www.givensfireandforestry.com/about'},
    {name: 'gallery', expectedUrl: 'https://www.givensfireandforestry.com/gallery'},
    {name: 'services', expectedUrl: 'https://www.givensfireandforestry.com/services'},
    {name: 'resources', expectedUrl: 'https://www.givensfireandforestry.com/resources'},
    {name: 'contacts', expectedUrl:  'https://www.givensfireandforestry.com/contact'},
    {name: 'getQuote', expectedUrl: 'https://www.givensfireandforestry.com/appointments'}
];

const links = {
    about: '/about',
    gallery: '/gallery',
    services: '/services',
    resources: '/resources',
    contacts: '/contact',
    getQuote: '/appointments'
};

test('Nav bar links', async ({ page }) => {
    const homepage = new homePage(page);
    await homepage.gotoHomePage();
    
    for (const [key, value] of Object.entries(links)) {
        await expect(homepage[`${key}Link`]).toHaveAttribute('href', value);
    }
});

for (const url of urls) {
    test(`Nav bar ${url.name} link leads to correct page`, async ({ page }) => {
        const homepage = new homePage(page);
        await homepage.gotoHomePage();
        await homepage[`${url.name}Link`].click();
        await expect(page).toHaveURL(url.expectedUrl);
    });
}


test('Nav bar instagram link opens in a new page', async ({ page, context }) => {
    const homepage = new homePage(page);
    await homepage.gotoHomePage();
    const [instagram] = await Promise.all ([
        context.waitForEvent('page'),
        homepage.instagramLink.click()
    ])
   
    await expect(instagram).toHaveURL('https://www.instagram.com/givensfireandforestry/');  
})

test('Nav bar facebook link opens in a new page', async ({ page, context }) => {
    const homepage = new homePage(page);
    await homepage.gotoHomePage();
    const [facebook] = await Promise.all ([
        context.waitForEvent('page'),
        homepage.facebookLink.click()

    ])
    await expect(facebook).toHaveURL('https://www.facebook.com/people/Givens-Fire-and-Forestry/61573118516671/');

    
})

test('learn more buttons within carousel lead to correct page while opening in a new tab', async ({ page, context }) => {
    const homepage = new homePage(page);
    await homepage.gotoHomePage();
    const learnMoreBtns = page.getByRole('link', { name: 'Learn more!' });
    const count = await learnMoreBtns.count();
    
    for (let i = 0; i < count; i++) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            learnMoreBtns.nth(i).click()
        ]);
        await expect(newPage).toHaveURL('https://www.givensfireandforestry.com/services');
        await newPage.close();
    }
})





