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
        images: []
    },
    mounted() {
        this.fetchImages();
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
        }
    }
});