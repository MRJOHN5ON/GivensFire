exports.AboutPage = class AboutPage {
    constructor(page) {
        this.page = page;
    }
    
    async gotoAboutPage() {
        await this.page.goto('https://www.givensfireandforestry.com/about');
    }

    // Selectors for about page elements
    get pageTitle() {
        return this.page.getByRole('heading', { name: 'About' });
    }

    get teamSection() {
        return this.page.getByRole('region', { name: 'Team' });
    }

    get missionSection() {
        return this.page.getByRole('region', { name: 'Mission' });
    }

    get companyDescription() {
        return this.page.getByRole('article', { name: 'Company Description' });
    }

    // Social proof elements
    get testimonials() {
        return this.page.getByRole('region', { name: 'Testimonials' });
    }

    // Call to action elements
    get contactButton() {
        return this.page.getByRole('link', { name: 'Contact Us' });
    }
}