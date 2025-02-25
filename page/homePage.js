exports.HomePage = class HomePage {
    constructor(page) {
        this.page = page;
    }
    
    async gotoHomePage() {
        await this.page.goto('https://www.givensfireandforestry.com/');
    }

    static facebookLabel = 'Facebook';
    static instagramLabel = 'Instagram';
    static learnMoreLinks = 'Learn more!';


    // Nav bar Selectors
    get aboutLink() {
        return this.page.getByRole('link', { name: 'About' })
    }

    get galleryLink() {
        return this.page.getByRole('link', {name: 'Gallery'})
    }

    get servicesLink() {
        return this.page.getByRole('link', {name: 'Services'})
    }

    get resourcesLink() {
        return this.page.getByRole('link', {name: 'Resources'})
    }

    get contactsLink() {
        return this.page.getByRole('link', {name: 'Contact'})
    }

    get getQuoteLink() {
        return this.page.getByRole('link', {name: 'Get a Quote!'})
    }
}