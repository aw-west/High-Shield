const parser = new DOMParser();

function editIcon(icon) {
	return function (feature, latlng) {
		return L.marker(latlng, {
			icon: L.divIcon({
				html: `<i class='fa-solid fa-${icon}'></i>`,
				className: 'mapIcon',
			})
		})
	}
}

function addFeature(query, popup='', icon='location-dot', style={}) {
	fetch(`https://overpass-api.de/api/interpreter?data=[out:xml];${query};out geom;`)
		.then(response => response.text())
		.then(xml => osmtogeojson(parser.parseFromString(xml, `text/xml`)))
		.then(geojson => {
			L.geoJSON(geojson, {
				style: style,
				pointToLayer: editIcon(icon)
			})
				.bindPopup(popup)
				.addTo(map);
		});
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function mapAddFeatures() {
	addFeature('node(4836256938)', `<a href='https://highshield.uk'>High&nbsp;Shield Cottage</a>`, icon='house fa-xl')
	await sleep(2000);
	map.flyTo([54.9906523,-2.3612414], 13);
	addFeature('(relation(5538074);way(273121408);)', `<a href='https://hadrianswallcountry.co.uk/'>Hadrian's Wall</a>`, 'camera', {color:'#BF5817'})
	addFeature('node(5001767865)', `<a href='https://www.thesill.org.uk/'>YHA&nbsp;The&nbsp;Sill</a>`)
	addFeature('node(10829121139)', `<a href='https://www.vindolanda.com/'>Vindolanda</a>`, 'camera')
	await sleep(2000);
	addFeature('relation(7447967)', `AD122<br><a href='https://www.gonortheast.co.uk/services/GNE/AD12'>Services</a><br><a href='https://www.gonortheast.co.uk/ad122/'>Fares</a>`, 'bus fa-xs', {color:'#FCEA1B', weight:2, opacity:.7})
	addFeature('relation(2588073)', `<a href='https://www.northernrailway.co.uk/'>Newcastle and Carlisle Railway</a>`, 'train fa-xs', {color:'#262262', weight:2, opacity:.7})
	addFeature('node(612567287)', `<a href='https://www.stagecoachbus.com/routes/north-east/685/haltwhistle-market-place-hexham-bus-station/xmbo685.i'>685 Bus Hexham - Haltwhistle</a>`, 'bus fa-xs')
	await sleep(2000);
	map.flyTo([54.9906523,-2.3612414], 12);
	addFeature('relation(11299752)', `High Shield's Curlew<br>Nature Reserve-Habitat`, '', {stroke:false,opactiy:.7})
	await sleep(2000);
	addFeature('node(10090475543)', `<a href='https://www.english-heritage.org.uk/visit/places/housesteads-roman-fort-hadrians-wall/'>Housesteads</a>`, 'camera')
	addFeature('node(3752045673)', `<a href='https://www.english-heritage.org.uk/visit/places/chesters-roman-fort-and-museum-hadrians-wall/'>Chesters</a>`, 'camera')
	addFeature('node(306265516)', `<a href='https://www.english-heritage.org.uk/visit/places/birdoswald-roman-fort-hadrians-wall/'>Birdoswald</a>`, 'camera')
	await sleep(2000);
	addFeature('node(103422199)', `<a href='http://www.hexhamabbey.org.uk/'>Hexham Abbey</a>`, 'cross')
	addFeature('node(2624508553)', `<a href='https://www.queenshall.co.uk/'>Queens Hall</a>`, 'palette')
	await sleep(2000);
	addFeature('relation(4168928)', `Kielder Water<br><a href='http://www.kielderbopc.com/'>Bird of Prey Centre</a><br><a href='http://www.kielderobservatory.org/'>Kielder Observatory</a>`, null, {'weight':1})
	addFeature('node(4176376360)', `<a href='http://www.kielderbopc.com/'>Bird of Prey Centre</a>`, 'crow')
	addFeature('node(7168688280)', `<a href='http://www.kielderobservatory.org/'>Kielder Observatory</a>`, 'camera')
	map.flyTo([54.9906523,-2.3612414], 11);
	await sleep(2000);
	addFeature('(way(181865155);node(9682921038);)', `<a href='https://www.nwt.org.uk/nature-reserves/greenlee-lough'>Greenlee Lough Nature Reserve</a>`, 'tree', {weight:1})
	addFeature('node(999824915)', `<a href='https://www.nationaltrust.org.uk/visit/north-east/allen-banks-and-staward-gorge'>Allen Banks and Staward Gorge</a>`, 'tree')
	addFeature('relation(1168821)', `Northumberland<br><a href='https://www.northumberlandnationalpark.org.uk/'>National Park</a><br><a href='https://www.visitnorthumberland.com/explore/things-to-do/attractions/great-outdoors/northumberland-dark-sky-park'>Dark Sky Park</a>`, 'tree', {weight:1,opacity:.1})
	map.flyTo([54.9906523,-2.3612414], 9);
}

var map = L.map('map').setView([54.9906523,-2.3612414], 13);
L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	{ attribution: '&copy; OpenStreetMap contributors' },
).addTo(map);
mapAddFeatures();
