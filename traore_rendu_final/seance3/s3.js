function getRandomInt(m){
	//renvoie un nombre aleatoire entre 0 et m exclus
  return Math.floor(Math.random() * Math.floor(m));
}

function choisirMusic(){
	//choisi une musique au hasard parmi les 2099087 listes de 200 musiques
  return {l:getRandomInt(2099088), m:getRandomInt(200)};
}

function envoyerRequete(){
  //entete de la requete
  myHeaders = new Headers();
	var myInit = {method: 'GET',
               headers: myHeaders};

	var choix=choisirMusic();
	
	//construire la requete en selectionnant seulement le nom de l'artiste, le titre de la musique, sa duree et son lien Youtube
	var myRequest = new Request('https://wasabi.i3s.unice.fr/api/v1/song_all/'+choix.l+'?project=title,name,length,urlYouTube',myInit);
	console.log(choix);
	
	//envoie de la requete
	fetch(myRequest,myInit).then(function(response){
		if(response.ok){
			//si requete reussi renvoyer le corps de la reponse au format json
			console.log("Request:"+response.status);
			return response.json();
		}else{
		  console.log('erreur réseau '+String(response.status));
		}
	}).then(function(myJson){//recuperer l'objet json
		//recuperer la musique choisie dans l'objet json
		var m=myJson[choix.m];
		
		//formatter la durée (m:ss) si diponible
		var time=Number(m.length);
		if(time){
			var minutes=Math.floor(time / 60);
			time=String(minutes)+":"+String(time - minutes * 60).padStart(2, '0');
		}else{
			time="Indisponible";
		}
		
		//formatter le lien Youtube si diponible
		if(m.urlYouTube){
			m.urlYouTube="https://www.youtube.com/watch?"+m.urlYouTube;
		}else{
			m.urlYouTube="Indisponible";
		}
		
		//creer et renvoyer un objet musique
		var music={
			artiste:m.name,
			titre:m.title,
			longueur:time,
			urlYouTube:m.urlYouTube
		};
		return music;
	}).then(function(music){
		//recuperer l'objet musique et l'ajouter au tableau
		console.log(music);
		ajouterMusic(music);
	}).catch(function(error){//gestion des erreurs
  	console.log('fetch: ' + error.message);
	});
}

function ajouterMusic(music){
	//selectionner le tableau
  let tb = document.querySelector("#tab");
  //remplir les cellules avec les champs de l'objet musique
  tb.innerHTML+="<td>"+music.artiste+"</td>"
  	+"<td>"+music.titre+"</td>"
  	+"<td>"+music.longueur+"</td>"
  	+"<td>"+music.urlYouTube+"</td>";
}

window.onload=start;
function start(){
	//creer un ecouteur d'evenement 'click' pour le bouton
	document.querySelector("#bq").addEventListener('click',envoyerRequete);
}

