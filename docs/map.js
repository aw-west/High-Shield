var map = L.map('map').setView([54.99895, -2.36225], 13);

L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{ attribution: '&copy; OpenStreetMap contributors' },
).addTo(map);

const parser = new DOMParser();

function editIcon(icon = 'location-dot') {
	return function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.divIcon({
				html: `<i class="fa-solid fa-${icon}"></i>`,
				className: ''
			})
		})
	}
}

function addFeature(feature, popup, icon) {
	fetch(`https://overpass-api.de/api/interpreter?data=[out:xml];${feature};out geom;`)
		.then(response => response.text())
		.then(xml => osmtogeojson(parser.parseFromString(xml, "text/xml")))
		.then(geojson => {
			L.geoJSON(geojson, {
				pointToLayer: editIcon(icon)
			})
				.bindPopup(popup)
				.addTo(map);
		});
}

addFeature('node(4836256938)', "<a href='https://highshield.uk'>High&nbsp;Shield Cottage</a>", 'house fa-xl')

addFeature('relation(7447967)', "AD122<br><a href='https://www.gonortheast.co.uk/services/GNE/AD12'>Services</a><br><a href='https://www.gonortheast.co.uk/ad122/'>Fares</a>", 'bus')
addFeature('relation(2588073)', "<a href='https://www.northernrailway.co.uk/'>Newcastle and Carlisle Railway</a>", 'train')
addFeature('node(612567287)', "<a href='https://www.stagecoachbus.com/routes/north-east/685/haltwhistle-market-place-hexham-bus-station/xmbo685.i'>685 Bus Hexham - Haltwhistle</a>", 'bus')

addFeature('relation(5538074)', "<a href='https://hadrianswallcountry.co.uk/'>Hadrian's Wall</a>", "camera")
addFeature('way(273121408)', "High&nbsp;Shield&nbsp;Crags<br>Crag&nbsp;Lough", null)
addFeature('node(5001767865)', "<a href='https://www.thesill.org.uk/'>YHA&nbsp;The&nbsp;Sill</a>")
addFeature('node(10829121139)', "<a href='https://www.vindolanda.com/'>Vindolanda</a>", "camera")
