var originalGraphicNodeID = [];
var originalGraphicNodeStyle = [];

var originalGraphicLinkClassName = [];
var originalGraphicLinkStyle = [];

var originalMarkerID = [];
var originalMarkerStyle = [];

var originalLabelRectID = [];
var originalLabelRectStyle = [];


var textFile = "";
var inArray = false;

/* Initialisation function */
function initOntoQAV() {
		
	// Wait for menu availability
	setTimeout(function waitForMenu() {
		var menuPanel = document.getElementById('optionsMenu');
		
		// If menu is available, continue
		if (menuPanel != null) {
		   console.log("Options menu is available and is of type [" + menuPanel + "]");
		   
			// Create list item for plug in, plus required child items
			var newLi = document.createElement('li');
			newLi.className = "toggleOption";
			newLi.id = "visualiseQuality";

			var newDiv = document.createElement('div');
			newDiv.className = "checkboxContainer";

			var newInput = document.createElement('input');
			newInput.className = "moduleCheckbox";
			newInput.id = "visualiseQualityModuleCheckbox";
			newInput.type = "checkbox";
			newInput.onchange = function() { checkToggle(this); }	   

			var newLabel = document.createElement('label');
			newLabel.for = "visualiseQualityModuleCheckbox";
			newLabel.innerHTML = "Visualise Quality Assessment";


			// Get list items of the menu
			var listItems = menuPanel.getElementsByTagName("li");
			
			// iterate through the menu items to find required item (moduleOption)
			maxIter = listItems.length;
			for(var i=0; i < maxIter;i++) {

				// when required item is found, add created component to it
				if(listItems[i].id == "moduleOption") {
				
					var ulList = listItems[i].getElementsByClassName("toolTipMenu module")[0];
					ulList.appendChild(newLi);
					newLi.appendChild(newDiv);
					newDiv.appendChild(newInput);
					newDiv.appendChild(newLabel);
						 
					console.log("Quality Visualisation Plugin Loaded");
				}
			}
		} 
		// If menu is not yet available in DOM, wait and retry
		else {
			console.log("Required component is not available. Waiting and retrying...");
			setTimeout(waitPanelMainWrapper, 1000);
		}
	}, 1000);
}

/* Functon to obtain get contents of quality meta-data augmentation file */
function readTextFile(file) { 
	var client = new XMLHttpRequest();
	client.open('GET', file, false);

	client.onreadystatechange = function() {
		callback(client.responseText);
	}
	client.send(null);
}

/* Callback function to obtain quality meta-data augmentation file */
function callback(text) {
	textFile = text;
}

/* Function to check whether Quality Assessment is turned on/off */
function checkToggle(elem) {
	
	if (elem.checked) {
		console.log("Visualisation of Quality Assessment has been turned on");
		for (var i = 0; i<10000; i++){
			//augmentNode(i, "rect");
			//augmentNode(i, "circle");
		}
		
		
		for (var i = 1; i<100; i++){
			for (var j = 1; j<100; j++){
				//augmentLink(i,j,"link", "normal");

			}
		}
		
		// Find last item in left panel
		var panel = document.getElementById("generalDetails");
		
		// Create and append child item
			var newHeader = document.createElement('h3');
			newHeader.id = "qualityDetailsAreaH";
			newHeader.className = "accordion-trigger accordion-trigger-active";
			newHeader.innerHTML = "Quality Details";

			var newDiv = document.createElement('div');
			newDiv.id = "qualityDetailsAreaDiv";
			newDiv.className = "accordion-container scrollable";

			var newParagraph = document.createElement('p');
			newParagraph.id = "qualityDetails";
	
			newDiv.appendChild(newParagraph);
			panel.appendChild(newHeader);
			panel.appendChild(newDiv);
		
		
			newParagraph.innerHTML = "<span style='font-size:15px; color:rgb(255,0,0);'>Metric: [CycleInOntologyMetric] </span><br/>";
		
		
		console.log("Reading quality meta-data augmentation file...");
		readTextFile("http://localhost/MScProject/v1.0/VOWL/LUZZU/wine-problem-report.json");
		var arr = textFile.split("\n");
		
		for (var i = 0; i<arr.length-1; i++){
			
			var type = arr[i].trim(" ").split(":")[0];
			var data = arr[i].trim(" ").split(":")[1];
			console.log("Item " + (i+1) + ": type=" + type + ", data=" + data);
			
			// update quality details area in panel
			var q = document.getElementById("qualityDetails");
			if(q.innerHTML.indexOf("Problematic Component: [" + data + "]") == -1) {
				
				// temporary measure - to fix
				if (isNaN(data)) {
					console.log(data);
					q.innerHTML = q.innerHTML + "<span style='color:rgb(255,100,100);'>Problematic Component: [" + data + "] </span><br />";
					
					//temp fix
					q.innerHTML = q.innerHTML + "<span style='color:rgb(255,200,200);'>Problematic Predicate: [" + "subClassOf" + "] </span><br />";
	
				}
				else {
					//q.innerHTML = q.innerHTML + "<span style='color:rgb(255,200,200);'>Problematic Predicate: [" + "subClassOf" + "] </span><br />";
				
				}
				
			}
			
				
			
			
			
			if (type == "Name") {
				
				var aug = getGraphicElementByText(data);
				console.log(aug);
				augmentGraphicObject(aug);
			}
			else {
				augmentLinkByMarkerEndValue(data);
			}
		}
	}
	else {
		// Delete panel area
		
		var panel = document.getElementById("generalDetails");
		var delAreaH = document.getElementById("qualityDetailsAreaH");
		var delAreaDiv = document.getElementById("qualityDetailsAreaDiv");
		panel.removeChild(delAreaH);
		panel.removeChild(delAreaDiv);
		
		// Create and append child item
			var newHeader = document.createElement('h3');
			newHeader.id = "qualityDetailsArea";
			newHeader.className = "accordion-trigger accordion-trigger-active";
			newHeader.innerHTML = "Quality Details";

			var newDiv = document.createElement('div');
			newDiv.id = "qualityDetailsArea";
		
		
		
		resetNodes("circle", false);
		resetNodes("rect", true);
		resetLinks();
		console.log("Visualisation of Quality Assessment has been turned off");
	}
}

/* Function to augment ontology visualisation with quality assessment visualisation */
function augmentGraphicObject(object) {

	var type = object.getAttribute("class");
	var oid = object.getAttribute("id");
	console.log("Augmenting object: class=" + type + ", elementID= " + oid); 
	
	if (type == "node") {
		// Find element by identifier
		var graphicElement = document.getElementById(oid);
		
		// Find shapes in component
		if (graphicElement) {
			var shapes = graphicElement.getElementsByTagName("circle");
			
			
			if (!shapes) {
								var shapes = graphicElement.getElementsByTagName("rect");

			}
		
			
		}
		
		// If shape exist in component, continue
		if (shapes) {
			
			// For all shapes in component, style accordingly
			for (var i = 0; i<shapes.length; i++) {
			
				if (shapes[i]) {
				
					// Save original style in array - for resetting purposes
					var combinedID = oid + "::" + i
					if ($.inArray(combinedID, originalGraphicNodeID) == -1) {
						console.log("The tem with elementID [" + oid + "] is not in array. Adding...");
						originalGraphicNodeID.push(combinedID);
						//originalGraphicNodeShapeID.push(i);
						originalGraphicNodeStyle.push(shapes[i].style.cssText);
					}
					else {
						console.log("The item with elementID [" + oid + "] is not being added as it is already in the list in position " + $.inArray(combinedID, originalGraphicNodeID));
						inArray = true;
					}
					//console.log("Saving style for ID: " + identifier + ", ShapeID: " + i + ", Style: " + shapes[i].style.cssText);
					
					// Apply new augmented style
					var currentFill = shapes[i].style.fill;
					var updatedFill = updateFill(currentFill);
					console.log("Current Object's fill = " + currentFill);
					shapes[i].style = "fill: " + updatedFill;
					console.log("Current Object's new fill = " + updatedFill);
										
				}
			}
		}
	}
	
	else if (type == "label") {
			
			
		var qSelect = '[marker-end="url(#marker' + oid + ')"]';
		var element = document.querySelector(qSelect);
		//console.log(element.childNodes[0]);
		var graphicElement = element.childNodes[0];
		
		
		// Save original style in array - for resetting purposes
		var currentClass = graphicElement.getAttribute("class");
		if ($.inArray(qSelect, originalGraphicLinkClassName) == -1) {
			
			console.log("The item with querySelector [" + qSelect + "] is not in array. Adding...");			
			originalGraphicLinkClassName.push(qSelect);
			originalGraphicLinkStyle.push(graphicElement.style.cssText);
		}
		else {
			console.log("The item with querySelector [" + qSelect + "] is not being added as it is already in the list in position " + $.inArray(qSelect, originalGraphicLinkClassName));
			inArray = true;
		}
					var currentFill = graphicElement.style.stroke;
					var updatedFill = updateFill(currentFill);
					console.log("Current Object's stroke = " + currentFill);
					graphicElement.style = "stroke: " + updatedFill + ";stroke-width: 6";
					console.log("Current Object's new stroke = " + updatedFill);
	
	
		var marker = document.getElementById('marker' + oid);
		if ($.inArray('marker' + oid, originalMarkerID) == -1) {
				originalMarkerID.push('marker' + oid);
				originalMarkerStyle.push(marker.childNodes[0].style.cssText);
		}
		
		marker.childNodes[0].style = "fill: " + updatedFill + ";stroke: " + updatedFill;
	
		
		
		var graphicElement = document.getElementById(oid);
		console.log(graphicElement);
		
		// Find shapes in component
		if (graphicElement) {
			var shapes = graphicElement.getElementsByTagName("rect");

			
		}
		console.log(shapes);
	
		if ($.inArray(oid, originalLabelRectID) == -1) {
			originalLabelRectID.push(oid);
			originalLabelRectStyle.push(shapes[0].style.cssText);
			
		}

		shapes[0].style.cssText = "fill: " + updatedFill;

	
	}
}	
		
	
function updateFill(obj) {
	
		if (obj == "") {
			return "rgb(255,200,200)";
		}
		
		if (inArray == false) {
			return "rgb(255,200,200)";
		}
		
		var start = getPosition(obj,"(",1);
		var first = getPosition(obj,",",1);
		var second = getPosition(obj,",",2);
		var end = getPosition(obj,")",1);
		
		var redValue = obj.substr(start+1,first-start-1);
		//console.log(redValue);
		
		var greenValue = obj.substr(first+1, second-first-1);
		//console.log(greenValue);
		
		var blueValue = obj.substr(second+1, end-second-1);
		//console.log(blueValue);
		
		var updateGreen = parseInt(greenValue)-50;
		var updateBlue = parseInt(blueValue)-50;
		
		var finalRGB = "rgb(" + redValue + "," + updateGreen + "," + updateBlue + ")";
		inArray = false;
		
		return finalRGB;
	
	
}

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}

/* Function to augment ontology visualisation with quality assessment visualisation */
function augmentNodeById(identifier, type) {
	
	// Find element by identifier
	var graphicElement = document.getElementById(identifier);
	
	// Find shapes in component
	if (graphicElement) {
		var shapes = graphicElement.getElementsByTagName(type);
	}
	
	// If shape exist in component, continue
	if (shapes) {
		
		// For all shapes in component, style accordingly
		for (var i = 0; i<shapes.length; i++) {
		
			if (shapes[i]) {
			
				// Save original style in array - for resetting purposes
				originalGraphicNodeID.push(identifier);
				originalGraphicNodeShapeID.push(i);
				originalGraphicNodeStyle.push(shapes[i].style.cssText);
				
				//console.log("Saving style for ID: " + identifier + ", ShapeID: " + i + ", Style: " + shapes[i].style.cssText);
				
				// Apply new augmented style
				shapes[i].style = "fill: rgb(255,0,0)";
			}
		}
	}
}

function augmentLinkById(identifier1, identifier2, type, mode) {
	
	if (type == "link") {
		
	// Find element by identifier
		var className = "link-path node" + identifier1 + " node" + identifier2 + " " + mode;
		var graphicElement = document.getElementsByClassName(className)[0];
		//console.log(className);
		//console.log(graphicElement);
		
		// If element exist in component, continue
		if (graphicElement) {
			
			console.log(className);
		
			// Save original style in array - for resetting purposes
			originalGraphicLinkClassName.push(className);
			originalGraphicLinkStyle.push(graphicElement.style.cssText);
			
			// Apply new augmented style
			graphicElement.style = "stroke: rgb(255,0,0)";
	
		}
	}
}


/* Remove augmentation */
function resetNodes(type, clear) {
	
	// Go through all saved styles (for all shapes)
	for (var i=0; i<originalGraphicNodeID.length; i++) {
		
		//split by ::
		var id = originalGraphicNodeID[i].split("::")[0];
		var component = originalGraphicNodeID[i].split("::")[1];
		
		
		// get current graphic element from saved styles
		var current = document.getElementById(id)
		
		// if current element is defined, continue and get its shapes
		if (current) {
			var shape = current.getElementsByTagName(type)[component];
		}
		
		// if shapes is defined, revert style
		if (shape) {
			//console.log(originalGraphicElementsStyle[i]);
			shape.style.cssText = originalGraphicNodeStyle[i];
		}
	}
	
	if (clear) {
		originalGraphicNodeID = [];
		originalGraphicNodeShapeID = [];
		originalGraphicNodeStyle = [];
	}
	
	// Indicate completion in log
	console.log("Reset Complete");
			
}


/* Remove augmentation */
function resetLinks() {
	
	// Go through all saved styles (for all shapes)
	for (var i=0; i<originalGraphicLinkClassName.length; i++) {
	
	
		var element = document.querySelector(originalGraphicLinkClassName[i]);
		//console.log(element.childNodes[0]);
		var graphicElement = element.childNodes[0];
		//console.log(graphicElement);
	
//		var className = originalGraphicLinkClassName[i];
//		var graphicElement = document.getElementsByClassName(className)[0];
		//console.log(className);
		//console.log(graphicElement);
		
		// If element exist in component, continue
		if (graphicElement) {
			// Apply new augmented style
			//graphicElement.style.cssText = originalGraphicLinkStyle[i];
			graphicElement.style.cssText = "";
		}
	
	
	
	}
	
	for (var i=0; i<originalMarkerID.length; i++) {
		
		var marker = document.getElementById(originalMarkerID[i]);
		console.log(originalMarkerID[i]);
		marker.childNodes[0].style = "";
	}
	
	
	
	
	for (var i=0; i<originalLabelRectID.length; i++) {
	
		var graphicElement = document.getElementById(originalLabelRectID[i]);
	
			// Find shapes in component
		if (graphicElement) {
			var shapes = graphicElement.getElementsByTagName("rect");
		}
		shapes[0].style.cssText = "";

	}
	
	
	originalGraphicLinkClassName = [];
	originalGraphicLinkStyle = [];
	
	originalMarkerID = [];
	originalMarkerStyle = [];
	

	originalLabelRectID = [];
	originalLabelRectStyle = [];

	// Indicate completion in log
	console.log("Reset Complete");
			
}


function augmentLinkByMarkerEndValue(endValue) {
	var qSelect = '[marker-end="url(#marker' + endValue + ')"]';
	var element = document.querySelector(qSelect);
	console.log("End Value: " + endValue);
	var graphicElement = element.childNodes[0];
	
				//var currentFill = graphicElement.style.fill;
				//	var updatedFill = updateFill(currentFill);
				//	console.log(currentFill);
				//	graphicElement.style.cssText = "stroke: " + updatedFill;
		
		
		
		
		// Save original style in array - for resetting purposes
		var currentClass = graphicElement.getAttribute("class");
		if ($.inArray(qSelect, originalGraphicLinkClassName) == -1) {
			
			console.log("The item with querySelector [" + qSelect + "] is not in array. Adding...");			
			originalGraphicLinkClassName.push(qSelect);
			originalGraphicLinkStyle.push(graphicElement.style.cssText);
		}
		else {
			console.log("The item with querySelector [" + qSelect + "] is not being added as it is already in the list in position " + $.inArray(qSelect, originalGraphicLinkClassName));
			inArray = true;
		}
					var currentFill = graphicElement.style.stroke;
					var updatedFill = updateFill(currentFill);
					console.log("Current Object's stroke = " + currentFill);
					graphicElement.style = "stroke: " + updatedFill + ";stroke-width: 6";
					console.log("Current Object's new stroke = " + updatedFill);
	
	
		var marker = document.getElementById('marker' + endValue);
		if ($.inArray('marker' + endValue, originalMarkerID) == -1) {
				originalMarkerID.push('marker' + endValue);
				originalMarkerStyle.push(marker.childNodes[0].style.cssText);
		}
		
		marker.childNodes[0].style = "fill: " + updatedFill + ";stroke: " + updatedFill;
	
		
		
	
	
	
//	graphicElement.style.cssText = "stroke: rgb(255,0,0)";
	
	
	
	
}


function getGraphicElementByText(textValue) {
	var elements = document.getElementsByTagName("tspan");
	//console.log(elements);
	
	for (var i = 0; i<elements.length; i++) {
		//console.log(elements[i]);
		if (elements[i].innerHTML == textValue) {
		
			return(elements[i].parentNode.parentNode);
		}
	}
}