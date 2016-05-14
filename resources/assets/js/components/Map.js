export default class Map {

    constructor() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kZXJzZ2wiLCJhIjoiY2lqMDE4a2dhMDAzOHYybTUyenZ6ZmlxZiJ9.eCEhAY2tvbxtGSaXR3pkUA';
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/satellite-streets-v9', //stylesheet location
            center: [10.4833279, 55.3190627],
            zoom: 10
        });
    }

}