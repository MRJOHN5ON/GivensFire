exports.AboutPage = class AboutPage {
    /**
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        
        // Core elements
        this.pageTitle = page.getByRole('heading', { name: 'Who we are', level: 1 });
        this.companyDescription = page.getByText('At Givens Fire & Forestry LLC, we are more than just a tree service company');
        
        // Navigation elements
        this.navigationMenu = page.locator('nav').first();
        this.navLinks = {
            home: page.getByRole('link', { name: 'Home' }).first(),
            about: page.getByRole('link', { name: 'About' }).first(),
            gallery: page.getByRole('link', { name: 'Gallery' }).first(),
            services: page.getByRole('link', { name: 'Services' }).first(),
            resources: page.getByRole('link', { name: 'Resources' }).first(),
            contact: page.getByRole('link', { name: 'Contact' }).first()
        };
        this.contactButton = page.getByRole('link', { name: 'Contact' });
        this.getQuoteButton = page.getByRole('link', { name: 'Get a Quote!' });
        
        // Company information elements
        this.teamSection = page.getByRole('heading', { name: 'Meet Samuel Givens' }).locator('xpath=..');
        this.missionSection = page.getByRole('heading', { name: /Our values are centered on safety/ }).locator('xpath=..');
        this.founderHeading = page.getByRole('heading', { name: 'Meet Samuel Givens' });
        this.sustainabilitySection = page.getByText(/our commitment to sustainability is unwavering/i);
        
        // Value proposition elements
        this.whyChooseUsSection = page.locator('p:has-text("WHY CHOSE US?")');
        this.valuePropositions = {
            leadership: page.getByRole('heading', { name: 'Experienced Leadership' }),
            solutions: page.getByRole('heading', { name: 'Fire-Smart Solutions' }),
            customerCentric: page.getByRole('heading', { name: 'Customer-Centric Approach' }),
            education: page.getByRole('heading', { name: 'Ongoing Education' }),
            ecoFriendly: page.getByRole('heading', { name: 'Eco-Friendly Practices' }),
            trust: page.getByRole('heading', { name: 'Built on Trust' })
        };
        
        // Footer elements
        this.footer = page.locator('footer');
        this.footerPhone = this.footer.getByRole('link', { name: '(406) 539-4224' });
        this.footerCompanyName = this.footer.getByText('GIVENS FIRE & FORESTRY LLC', { exact: true });
        this.footerLocation = this.footer.getByText('THREE FORKS MONTANA', { exact: true });
        
        // Social media links
        this.socialLinks = {
            instagram: page.getByRole('link', { name: 'Instagram' }).first(),
            facebook: page.getByRole('link', { name: 'Facebook' }).first()
        };
        
        // Promotional content
        this.nominationBanner = page.getByText(/Give Back to a Neighbor in Need!/);
        this.nominationLink = page.getByRole('link', { name: /Give Back to a Neighbor/ });
    }

    /**
     * Navigate to the About page
     */
    async goto() {
        await this.page.goto('https://www.givensfireandforestry.com/about');
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Get all experience points from founder section
     * @returns {Promise<string[]>} Array of experience points
     */
    async getFounderExperiencePoints() {
        const points = [
            'seven years of nationwide wildland firefighting experience',
            'Incident Commander Type 5 (ICT5)',
            'Crew Boss Trainee',
            'Certified Faller'
        ];
        return points;
    }

    /**
     * Check if all navigation links are visible
     * @returns {Promise<boolean>} True if all links are visible
     */
    async areAllNavLinksVisible() {
        for (const link of Object.values(this.navLinks)) {
            if (!await link.isVisible()) return false;
        }
        return true;
    }

    /**
     * Check if all value proposition headings are visible
     * @returns {Promise<boolean>} True if all headings are visible
     */
    async areAllValuePropositionsVisible() {
        for (const heading of Object.values(this.valuePropositions)) {
            if (!await heading.isVisible()) return false;
        }
        return true;
    }

    /**
     * Get all social media URLs
     * @returns {Object} Object containing social media URLs
     */
    getSocialMediaUrls() {
        return {
            instagram: 'instagram.com/givensfireandforestry',
            facebook: 'facebook.com'
        };
    }

    /**
     * Check responsiveness for a specific viewport
     * @param {Object} viewport - Viewport configuration
     * @param {number} viewport.width - Viewport width
     * @param {number} viewport.height - Viewport height
     */
    async checkResponsiveness(viewport) {
        await this.page.setViewportSize(viewport);
        await this.pageTitle.waitFor({ state: 'visible', timeout: 5000 });
    }
};