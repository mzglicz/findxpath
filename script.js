function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
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
	var previous_elements = document.getElementsByClassName(mclass);
	if (previous_elements) {
		for (var i in previous_elements) {
			removeClass(mclass, previous_elements[i]);
		}
	}

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

var fragment = create('<p><br><br><br><br><br></p><div id="maciek_container"><textarea id="maciek_text_area"></textarea><button id="maciek_button">Search</button></div><p id="maciek_result"></p>');
// You can use native DOM methods to insert the fragment:
document.body.insertBefore(fragment, document.body.childNodes[0]);
document.getElementById('maciek_button').addEventListener("click", buttonClicked);
