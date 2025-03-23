<script lang="ts">
	import { T as Threlte } from '@threlte/core';
	import * as THREE from 'three';
	import Geometry from './Geometry.svelte';
	import { ContactShadows, Environment, interactivity, transitions } from '@threlte/extras';

	interactivity();
	transitions();
	
	function createStar(x = 0, y = 0, scale = 1, points = 5) {
	  const starShape = new THREE.Shape();
	  
	  const outerRadius = 1 * scale;
	  const innerRadius = 0.4 * scale;
	  const angle = Math.PI * 2 / points;
	  
	  starShape.moveTo(x + outerRadius, y);
	  
	  for (let i = 0; i < points; i++) {
	    // Outer point
	    const outerX = x + Math.cos(angle * i) * outerRadius;
	    const outerY = y + Math.sin(angle * i) * outerRadius;
	    starShape.lineTo(outerX, outerY);
	    
	    // Inner point
	    const innerX = x + Math.cos(angle * i + angle/2) * innerRadius;
	    const innerY = y + Math.sin(angle * i + angle/2) * innerRadius;
	    starShape.lineTo(innerX, innerY);
	  }
	  
	  starShape.closePath();
	  
	  const starGeometry = new THREE.ExtrudeGeometry(starShape, {
	    depth: 0.3 * scale,
	    bevelEnabled: true,
	    bevelThickness: 0.05 * scale,
	    bevelSize: 0.05 * scale,
	    bevelSegments: 2
	  });
	  
	  return starGeometry;
	}
	const starGeometry = createStar(0, 0, 0.7, 5);
</script>

<Threlte.PerspectiveCamera
	makeDefault
	position={[0, 0, 25]}
	aspect={1}
	fov={30}
	near={1}
	far={40}
/>

<Threlte.DirectionalLight position={[0, 0, 10]} intensity={1} />

<Environment files="smallroom.hdr" path="/" format="hdr" />

<ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={40} blur={1} far={9} />

<!-- Gem -->
<Geometry position={[0, 0, 0]} rate={0.3} geometry={new THREE.IcosahedronGeometry(3)} />

<!-- Pill -->
<Geometry
	position={[1, -0.75, 4]}
	rate={0.4}
	geometry={new THREE.CapsuleGeometry(0.5, 1.6, 2, 16)}
/>

<!-- Soccer Ball -->
<Geometry position={[-1.4, 2, -4]} rate={0.6} geometry={new THREE.DodecahedronGeometry(1.5)} />

<!-- Donut -->
<Geometry
	position={[-0.8, -0.75, 5]}
	rate={0.5}
	geometry={new THREE.TorusGeometry(0.6, 0.25, 16, 32)}
/>

<!-- Diamond -->
<Geometry position={[1.6, 1.6, -4]} rate={0.7} geometry={new THREE.OctahedronGeometry(1.5)} />



<!-- Custom Star Shape -->
<Geometry
	position={[0.3, -1.4, 2]}
	rate={0.55}
	geometry={starGeometry}
/>

