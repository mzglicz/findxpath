function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    console.log(frag);
    return frag;
}

function addClass( classname, element ) {
    var cn = element.className;
    //test for existance
    if( cn.indexOf( classname ) != -1 ) {
    	return;
    }
    //add a space if the element already has class
    if( cn != '' ) {
    	classname = ' '+classname;
    }
    element.className = cn+classname;
}

function removeClass( classname, element ) {
    var cn = element.className;
    if (!cn) {
    	return;
    }
    var rxp = new RegExp( "\\s?\\b"+classname+"\\b", "g" );
    cn = cn.replace( rxp, '' );
    element.className = cn;
}

function buttonClicked() {
	var mclass = 'maciek_chosen';
	clearEffect(mclass);
	var xpathExpression = document.getElementById('maciek_text_area').value;
	if (!xpathExpression || xpathExpression === "") {
		alert("Search area cannot be null");
		return;
	}
	try {
		var nodesSnapshot = document.evaluate(xpathExpression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		document.getElementById('maciek_result').innerHTML = "Found elements: " + nodesSnapshot.snapshotLength;
		for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ ) {
  				console.log( nodesSnapshot.snapshotItem(i).textContent );
				addClass(mclass, nodesSnapshot.snapshotItem(i));
		}
		removeClass('error', document.getElementById('maciek_result'));
	} catch(e) {
		console.log(e);
		document.getElementById('maciek_result').innerHTML = "Error : " + e;
		addClass('error', document.getElementById('maciek_result'));
	}
}

function clearEffect(className) {
	var previousElements = document.getElementsByClassName(className);
	if (previousElements) {
		for (var i in previousElements) {
			removeClass(className, previousElements[i]);
		}
	}
}

// TODO pass an error and make the callback handle it
function loadFile(filePath, callback) {
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", filePath, true );
	xmlHttp.onreadystatechange = function(event) {
	if (xmlHttp.readyState == 4) {
     if(xmlHttp.status == 200) {
     	callback(xmlHttp.responseText);
     }
     else {
       console.log("Failed to load " + filePath);
     }
  	} else {
  		console.log("Wrong readyState");
  	}
  }
  xmlHttp.send( null );
}


loadFile(chrome.extension.getURL ("inserted.html"), function(content) {
		if (!document.getElementById('maciek_search_button')) {
			var fragment = create(content);
     		document.body.insertBefore(fragment, document.body.childNodes[0]);
			document.getElementById('maciek_search_button').addEventListener("click", buttonClicked);
			document.getElementById('maciek_clear_button').addEventListener("click", function() {
				clearEffect('maciek_chosen')
				document.getElementById('maciek_result').innerHTML = "";
				document.getElementById('maciek_text_area').value = "";
			});
		}
});


