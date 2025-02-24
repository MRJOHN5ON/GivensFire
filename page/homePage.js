exports.homePage = class homePage {
    constructor(page) {
        this.page = page;
    }
    //Methods
    async gotoHomePage() {
        await this.page.goto('https://www.givensfireandforestry.com/');
    }

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

    get instagramLink() {
        return this.page.getByLabel('Instagram').first()
    }

    get facebookLink() {
        return this.page.getByLabel('Facebook').first()
    }

    get getQuoteLink() {
        return this.page.getByRole('link', {name: 'Get a Quote!'})
    }

   




}