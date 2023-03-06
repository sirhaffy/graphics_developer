// Fredrik Svärd - haffy@icloud.com

import {
	Engine,
	Scene,
	ArcRotateCamera,
	HemisphericLight,
	Vector3,
	MeshBuilder,
	Quaternion,
	Animation,
} from 'babylonjs';
import 'babylonjs-loaders';
import * as GUI from 'babylonjs-gui';

const canvas = document.getElementById('canvas');
if (!(canvas instanceof HTMLCanvasElement))
	throw new Error("Couldn't find a canvas. Aborting the demo");

const engine = new Engine(canvas, true, {});
const scene = new Scene(engine);

function prepareScene() {
	// Camera
	const camera = new ArcRotateCamera(
		'camera',
		Math.PI / 1.5,
		Math.PI / 2.5,
		20,
		new Vector3(0, 0, 0),
		scene
	);
	camera.attachControl(canvas, true);

	// Light
	new HemisphericLight('light', new Vector3(0.5, 1, 0.8).normalize(), scene);

	// Objects
	const plane = MeshBuilder.CreateBox('Plane', {}, scene);
	plane.rotationQuaternion = Quaternion.FromEulerAngles(0, Math.PI, 0);

	const icosphere1 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 1 },
		scene
	);
	const icosphere2 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 2 },
		scene
	);
	const icosphere3 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 3 },
		scene
	);
	const icosphere4 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 4 },
		scene
	);
	const icosphere5 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 5 },
		scene
	);
	const icosphere6 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 6 },
		scene
	);
	const icosphere7 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 7 },
		scene
	);
	const icosphere8 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 8 },
		scene
	);
	const icosphere9 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 9 },
		scene
	);
	const icosphere10 = MeshBuilder.CreateIcoSphere(
		'IcoSphere',
		{ subdivisions: 10 },
		scene
	);

	const icosphereArray = [
		icosphere1,
		icosphere2,
		icosphere3,
		icosphere4,
		icosphere5,
		icosphere6,
		icosphere7,
		icosphere8,
		icosphere9,
		icosphere10,
	];

	const cylinder = MeshBuilder.CreateCylinder('Cylinder', {}, scene);
	cylinder.position.set(2, 0, 0);

	// GUI
	let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');

	let panel = new GUI.StackPanel();
	panel.width = '220px';
	panel.fontSize = '14px';
	panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
	panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
	advancedTexture.addControl(panel);

	//
	// Cylinder
	//

	// Cylinder - Diameter text.
	let cylinderTextDiameter = new GUI.TextBlock();
	cylinderTextDiameter.text = 'Cylinder diameter.';
	cylinderTextDiameter.height = '40px';
	cylinderTextDiameter.color = 'white';
	cylinderTextDiameter.textHorizontalAlignment =
		GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(cylinderTextDiameter);

	// Cylinder - Diameter
	let cylinderSliderX = new GUI.Slider();
	cylinderSliderX.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	cylinderSliderX.minimum = 0.1;
	cylinderSliderX.maximum = 2;
	cylinderSliderX.color = 'green';
	cylinderSliderX.value = 1;
	cylinderSliderX.height = '20px';
	cylinderSliderX.width = '200px';
	cylinderSliderX.onValueChangedObservable.add(function (value) {
		cylinderTextDiameter.text =
			'Cylinder diameter: ' + Math.round(value * 10) / 10;
		cylinder.scaling.x = value;
		cylinder.scaling.z = value;
	});
	panel.addControl(cylinderSliderX);

	// Cylinder - Height text.
	let cylinderTextHeight = new GUI.TextBlock();
	cylinderTextHeight.text = 'Cylinder height.';
	cylinderTextHeight.height = '40px';
	cylinderTextHeight.color = 'white';
	cylinderTextHeight.textHorizontalAlignment =
		GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(cylinderTextHeight);

	// Cylinder - Height
	let cylinderSliderY = new GUI.Slider();
	cylinderSliderY.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	cylinderSliderY.minimum = 0.1;
	cylinderSliderY.maximum = 2;
	cylinderSliderY.color = 'green';
	cylinderSliderY.value = 1;
	cylinderSliderY.height = '20px';
	cylinderSliderY.width = '200px';
	cylinderSliderY.onValueChangedObservable.add(function (value) {
		cylinderTextHeight.text = 'Cylinder height: ' + Math.round(value * 10) / 10;
		cylinder.scaling.y = value;
	});
	panel.addControl(cylinderSliderY);

	//
	// Plane / Cube
	//

	// Plane / Cube - X text.
	let PlaneTextX = new GUI.TextBlock();
	PlaneTextX.text = 'Cube X-scale.';
	PlaneTextX.height = '40px';
	PlaneTextX.color = 'white';
	PlaneTextX.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(PlaneTextX);

	// Plane / Cube - Scaling X.
	let planeSliderX = new GUI.Slider();
	planeSliderX.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	planeSliderX.minimum = 0.1;
	planeSliderX.maximum = 2;
	planeSliderX.color = 'green';
	planeSliderX.value = 1;
	planeSliderX.height = '20px';
	planeSliderX.width = '200px';
	planeSliderX.onValueChangedObservable.add(function (value) {
		PlaneTextX.text = 'Cube X-scale: ' + Math.round(value * 10) / 10;
		plane.scaling.x = value;
	});
	panel.addControl(planeSliderX);

	// Plane / Cube - Y text.
	let PlaneTextY = new GUI.TextBlock();
	PlaneTextY.text = 'Cube Y-scale.';
	PlaneTextY.height = '40px';
	PlaneTextY.color = 'white';
	PlaneTextY.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(PlaneTextY);

	// Plane / Cube - Scaling Y
	let planeSliderY = new GUI.Slider();
	planeSliderY.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	planeSliderY.minimum = 0.1;
	planeSliderY.maximum = 2;
	planeSliderY.color = 'green';
	planeSliderY.value = 1;
	planeSliderY.height = '20px';
	planeSliderY.width = '200px';
	planeSliderY.onValueChangedObservable.add(function (value) {
		PlaneTextY.text = 'Cube Y-scale: ' + Math.round(value * 10) / 10;
		plane.scaling.y = value;
	});
	panel.addControl(planeSliderY);

	// Plane / Cube - Z text.
	let planeTextZ = new GUI.TextBlock();
	planeTextZ.text = 'Cube Z-scale.';
	planeTextZ.height = '40px';
	planeTextZ.color = 'white';
	planeTextZ.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(planeTextZ);

	// Plane / Cube - Scaling Z
	let planeSliderZ = new GUI.Slider();
	planeSliderZ.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	planeSliderZ.minimum = 0.1;
	planeSliderZ.maximum = 2;
	planeSliderZ.color = 'green';
	planeSliderZ.value = 1;
	planeSliderZ.height = '20px';
	planeSliderZ.width = '200px';
	planeSliderZ.onValueChangedObservable.add(function (value) {
		planeTextZ.text = 'Cube Z-scale: ' + Math.round(value * 10) / 10;
		plane.scaling.z = value;
	});
	panel.addControl(planeSliderZ);

	//
	// Sphere
	//

	// Remove all Spheres
	function removeAllSpheres() {
		icosphereArray.forEach((element) => {
			element.isVisible = false;
		});
	}
	removeAllSpheres();

	// Show starting LOD.
	icosphereArray[0].isVisible = true;
	icosphereArray[0].position.set(-2, 0, 0);

	let activeSphere = 0;
	let sphereRadius = 1;

	function triggerSphereSize() {
		icosphereArray[activeSphere].scaling.x = sphereRadius;
		icosphereArray[activeSphere].scaling.y = sphereRadius;
		icosphereArray[activeSphere].scaling.z = sphereRadius;
	}

	// Icosphere - Subdivision text.
	let sphereTextSubd = new GUI.TextBlock();
	sphereTextSubd.text = 'Sphere subdivisions.';
	sphereTextSubd.height = '40px';
	sphereTextSubd.color = 'white';
	sphereTextSubd.textHorizontalAlignment =
		GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(sphereTextSubd);

	// Icosphere - Subdivisions
	let IcospheresSliderSubd = new GUI.Slider();
	IcospheresSliderSubd.horizontalAlignment =
		GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	IcospheresSliderSubd.minimum = 1;
	IcospheresSliderSubd.maximum = 10;
	IcospheresSliderSubd.color = 'green';
	IcospheresSliderSubd.value = 1;
	IcospheresSliderSubd.height = '20px';
	IcospheresSliderSubd.width = '200px';
	IcospheresSliderSubd.onValueChangedObservable.add(function (value) {
		sphereTextSubd.text = 'Sphere subdivisions: ' + Math.round(value);

		for (let i = 0; i <= value; i++) {
			removeAllSpheres();

			activeSphere = Math.round(value - 1);

			icosphereArray[Math.round(value - 1)].isVisible = true;
			icosphereArray[Math.round(value - 1)].position.set(-2, 0, 0);

			triggerSphereSize();
		}
	});
	panel.addControl(IcospheresSliderSubd);

	// Icosphere - Radius text.
	let sphereTextRadius = new GUI.TextBlock();
	sphereTextRadius.text = 'Sphere radius.';
	sphereTextRadius.height = '40px';
	sphereTextRadius.color = 'white';
	sphereTextRadius.textHorizontalAlignment =
		GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(sphereTextRadius);

	// Icosphere - Radius
	let IcospheresSliderR = new GUI.Slider();
	IcospheresSliderR.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	IcospheresSliderR.minimum = 0.1;
	IcospheresSliderR.maximum = 2;
	IcospheresSliderR.color = 'green';
	IcospheresSliderR.value = 1;
	IcospheresSliderR.height = '20px';
	IcospheresSliderR.width = '200px';
	IcospheresSliderR.onValueChangedObservable.add(function (value) {
		sphereTextRadius.text = 'Sphere radius: ' + Math.round(value * 10) / 10;
		sphereRadius = value;
		triggerSphereSize();
	});
	panel.addControl(IcospheresSliderR);

	//
	// Animation
	//

	let keyFrames: any[] = [];
	let frame = 1;
	let fps = 60;
	const fixedDeltaTime = 1.0 / 60.0;
	let interval = 1000 / fps;
	let lastTime = performance.now();
	let movingDown = true;
	const deltaTime = 1.0 / 60.0;
	let velocity = 10;
	let maxVelocity = 10;
	let acceleration = 9.8;
	let height = 10;
	let height_max = height;
	let cor = 0.75;
	let bounces = 10;
	let bouncesTaken = 0;
	let simulating = false;
	let mass = 2.5;
	let duration = 0;

	// Height
	let inputTextAreaTimeHeight = new GUI.TextBlock();
	inputTextAreaTimeHeight.text = 'Animation height.';
	inputTextAreaTimeHeight.height = '40px';
	inputTextAreaTimeHeight.color = 'white';
	inputTextAreaTimeHeight.textHorizontalAlignment =
		GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(inputTextAreaTimeHeight);

	let inputTextArea = new GUI.InputTextArea();
	inputTextArea.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	inputTextArea.width = '200px';
	inputTextArea.maxWidth = 1;
	inputTextArea.height = '40px';
	inputTextArea.color = 'white';
	inputTextArea.text = '25';
	inputTextArea.background = 'green';
	panel.addControl(inputTextArea);

	// Time
	let inputTextAreaTimeText = new GUI.TextBlock();
	inputTextAreaTimeText.text = 'Animation time (ms).';
	inputTextAreaTimeText.height = '40px';
	inputTextAreaTimeText.color = 'white';
	inputTextAreaTimeText.textHorizontalAlignment =
		GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	panel.addControl(inputTextAreaTimeText);

	let inputTextAreaTime = new GUI.InputTextArea();
	inputTextAreaTime.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	inputTextAreaTime.width = '200px';
	inputTextAreaTime.maxWidth = 1;
	inputTextAreaTime.height = '40px';
	inputTextAreaTime.color = 'white';
	inputTextAreaTime.text = '5000';
	inputTextAreaTime.background = 'green';
	panel.addControl(inputTextAreaTime);

	let animButton = GUI.Button.CreateSimpleButton('animButton', 'Bounce');
	animButton.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
	animButton.width = '200px';
	animButton.height = '40px';
	animButton.color = 'white';
	animButton.fontSize = 10;
	animButton.background = 'green';
	animButton.paddingTop = '8px';
	animButton.onPointerUpObservable.add(function () {
		resetSimulation();
	});
	panel.addControl(animButton);

	const bounceAnim = new Animation(
		'bounceAnim',
		'position.y',
		fps,
		Animation.ANIMATIONTYPE_FLOAT,
		Animation.ANIMATIONLOOPMODE_CONSTANT
	);

	function resetSimulation() {
		height = parseInt(inputTextArea.text);
		duration = parseInt(inputTextAreaTime.text);
		height_max = height;

		bouncesTaken = 0;
		let approxTotalDis =
			height + 2 * ((height * cor * (1 - Math.pow(cor, bounces))) / (1 - cor));
		let approxVelocity = approxTotalDis / duration;
		let approxAccel = (approxVelocity / duration) * 1000;

		acceleration = approxAccel * mass;

		velocity = 0;
		maxVelocity = Math.sqrt(2 * height_max * acceleration);

		keyFrames = [];
		frame = 1;
		movingDown = true;
		simulating = true;
	}

	function simulateObj() {
		// Falling
		if (height_max > 0.6 && bouncesTaken <= bounces) {
			if (movingDown) {
				let time = deltaTime * 100;

				velocity = velocity - acceleration * time;
				height = height + velocity - 0.5 * acceleration * time * time;

				if (height < 0) {
					height = 0;
					movingDown = false;
				}
			} else {
				height = 0;
				velocity = maxVelocity;
				maxVelocity = maxVelocity * cor;
				movingDown = true;
				bouncesTaken++;
			}

			icosphereArray[activeSphere].position.y = height;

			keyFrames.push({ frame: frame, value: height });
			frame++;

			height_max = (maxVelocity * maxVelocity) / acceleration;
		} else {
			if (simulating) {
				bounceAnim.setKeys(keyFrames);
				icosphereArray[activeSphere].animations.push(bounceAnim);
				simulating = false;
			}
		}
	}

	scene.registerBeforeRender(function () {
		if (simulating) {
			const currentTime = performance.now();
			const deltaTime = currentTime - lastTime;
			let accumulator = 0;

			if (deltaTime > interval) {
				lastTime = currentTime;
				accumulator += deltaTime / 1000;

				while (accumulator >= fixedDeltaTime) {
					accumulator -= fixedDeltaTime;
					simulateObj();
				}
			}
		}
	});
}

prepareScene();

engine.runRenderLoop(() => {
	scene.render();
});

window.addEventListener('resize', () => {
	engine.resize();
});
