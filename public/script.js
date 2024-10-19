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
        config: {},
        images: [],
        currentText: '',
        currentYear: new Date().getFullYear()
    },
    mounted() {
        this.fetchConfig();
        this.fetchImages();
    },
    methods: {
        fetchConfig() {
            fetch('/api/config')
                .then(response => response.json())
                .then(config => {
                    this.config = config;
                    this.startTextAnimation();
                    document.title = config.siteTitle;
                    document.querySelector('meta[name="description"]').setAttribute('content', config.siteDescription);
                    document.querySelector('meta[name="author"]').setAttribute('content', config.authorName);
                })
                .catch(error => {
                    console.error('Error fetching config:', error);
                });
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
        },
        startTextAnimation() {
            let index = 0;
            this.currentText = this.config.heroTexts[0];

            setInterval(() => {
                index = (index + 1) % this.config.heroTexts.length;
                this.currentText = this.config.heroTexts[index];
            }, 3000);
        }
    }
});