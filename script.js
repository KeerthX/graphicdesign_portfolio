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
        texts: ['Graphic Designer', 'UI/UX Designer', 'Visual Artist'],
        currentTextIndex: 0,
        currentText: ''
    },
    mounted() {
        this.fetchImages();
        this.startTextAnimation();
    },
    methods: {
        fetchImages() {
            fetch('/api/images')
                .then(response => response.json())
                .then(data => {
                    this.images = data;
                })
                .catch(error => {
                    console.error('Error fetching images:', error);
                });
        },
        startTextAnimation() {
            this.currentText = this.texts[0];
            let index = 0;

            setInterval(() => {
                index = (index + 1) % this.texts.length;
                this.currentText = this.texts[index];
            }, 3000);
        }
    }
});