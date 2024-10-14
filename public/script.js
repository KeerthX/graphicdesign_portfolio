Vue.component('image-grid', {
    props: ['images'],
    template: `
        <div class="row">
            <div class="column" v-for="(image, index) in images" :key="index">
                <div class="image-container">
                    <img :src="image.src" :alt="image.alt">
                </div>
            </div>
        </div>
    `
});

new Vue({
    el: '#app',
    data: {
        images: [],
        texts: [],
        currentTextIndex: 0,
        currentText: '',
        configVersion: null
    },
    mounted() {
        this.fetchConfig();
        this.fetchImages();
        this.setCurrentYear();
        this.startConfigCheck();
    },
    methods: {
        fetchConfig() {
            fetch('/api/config')
                .then(response => response.json())
                .then(config => {
                    this.texts = config.heroTexts;
                    this.populateHTML(config);
                    this.startTextAnimation();
                    this.reloadDynamicCSS();
                })
                .catch(error => {
                    console.error('Error fetching config:', error);
                });
        },
        startTextAnimation() {
            this.currentText = this.texts[0];
            let index = 0;

            setInterval(() => {
                index = (index + 1) % this.texts.length;
                this.currentText = this.texts[index];
            }, 3000);
        },
        setCurrentYear() {
            const currentYearElement = document.getElementById('currentYear');
            if (currentYearElement) {
                currentYearElement.textContent = new Date().getFullYear();
            }
        },
        populateHTML(config) {
            document.title = config.siteTitle;
            document.querySelector('meta[name="description"]').setAttribute('content', config.siteDescription);
            document.querySelector('meta[name="author"]').setAttribute('content', config.authorName);

            document.getElementById('authorName').textContent = config.authorName;
            document.getElementById('heroBio').textContent = config.heroBio;
            document.getElementById('authorImage').src = config.authorImage;
            document.getElementById('authorImage').alt = `${config.authorName}, ${config.authorJobTitle}`;

            document.getElementById('authorEmail').textContent = config.authorEmail;
            document.getElementById('authorEmail').href = `mailto:${config.authorEmail}`;

            document.getElementById('instagramLink').href = config.socialLinks.instagram;
            document.getElementById('behanceLink').href = config.socialLinks.behance;
            document.getElementById('linkedinLink').href = config.socialLinks.linkedin;

            document.getElementById('copyrightName').textContent = config.authorName;
        },
        startConfigCheck() {
            setInterval(() => {
                this.checkConfigVersion();
            }, 5000); // Check every 5 seconds
        },
        checkConfigVersion() {
            fetch('/api/config-version')
                .then(response => response.json())
                .then(data => {
                    if (this.configVersion === null) {
                        this.configVersion = data.version;
                    } else if (this.configVersion !== data.version) {
                        console.log('Config changed, updating...');
                        this.configVersion = data.version;
                        this.fetchConfig();
                    }
                })
                .catch(error => {
                    console.error('Error checking config version:', error);
                });
        },
        reloadDynamicCSS() {
            const linkElement = document.querySelector('link[href^="/dynamic-styles.css"]');
            if (linkElement) {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = `/dynamic-styles.css?v=${Date.now()}`;
                linkElement.parentNode.insertBefore(newLink, linkElement.nextSibling);
                setTimeout(() => {
                    linkElement.parentNode.removeChild(linkElement);
                }, 100);
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'stylesheet';
                newLink.href = `/dynamic-styles.css?v=${Date.now()}`;
                document.head.appendChild(newLink);
            }
        },
        fetchImages() {
            fetch('/api/images')
                .then(response => response.json())
                .then(images => {
                    this.images = images;
                })
                .catch(error => {
                    console.error('Error fetching images:', error);
                });
        }
    }
});