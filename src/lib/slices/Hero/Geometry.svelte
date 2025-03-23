<script lang="ts">
	import { T as Threlte } from '@threlte/core';
    import {createTransition, Float} from '@threlte/extras';
	import * as THREE from 'three';
    import gsap from 'gsap';
	import { elasticOut } from 'svelte/easing';

    export let position: [number, number, number] = [0, 0, 0];
    export let geometry: THREE.BufferGeometry = new THREE.IcosahedronGeometry(3);
    export let rate = 0.5;
    
    const soundeffects = [
        new Audio('/sounds/hit1.ogg'),
        new Audio('/sounds/hit2.ogg'),
        new Audio('/sounds/hit3.ogg'),
        new Audio('/sounds/hit4.ogg'),
        new Audio('/sounds/hit5.ogg'),
        new Audio('/sounds/hit6.ogg'),
        new Audio('/sounds/hit7.ogg'),
    ]

    let visible = false;

    const materialParams = [
        { color: 0x2ecc71, roughness: 0 },
        { color: 0xf1c40f, roughness: 0.4 },
        { color: 0xe74c3c, roughness: 0.1 },
        { color: 0x8e44ad, roughness: 0.1 },
        { color: 0x1abc9c, roughness: 0.1 },
        { color: 0x2980b9, roughness: 0, metalness: 0.5 },
        { color: 0x2c3e50, roughness: 0.1, metalness: 0.5 },
        { color: 0x3498db, roughness: 0.2, metalness: 0.7 },
        { color: 0xff6b81, roughness: 0.05, metalness: 0.3 },
        { color: 0x20bf6b, roughness: 0.15, metalness: 0.6 },
        { color: 0xfeca57, roughness: 0.3, metalness: 0.1 },
        { color: 0xd980fa, roughness: 0, metalness: 0.9 },
        { color: 0xf97f51, roughness: 0.25 },
        { color: 0x1e3799, roughness: 0.15, metalness: 0.4 },
        { color: 0xeb4d4b, roughness: 0.35, metalness: 0.2 },
        { color: 0x6ab04c, roughness: 0.5, metalness: 0 },
        { color: 0xf0932b, roughness: 0.05, metalness: 0.8 },
        { color: 0xbe2edd, roughness: 0.2 },
        { color: 0x4834d4, roughness: 0, metalness: 0.4 },
        { color: 0x22a6b3, roughness: 0.3, metalness: 0.6 }
    ];

    function getRandomMaterial() {
		const randomInt = gsap.utils.random(1, 10, 1);
		if (randomInt === 1) {
			return new THREE.MeshNormalMaterial();
		}
		return new THREE.MeshStandardMaterial(gsap.utils.random(materialParams));
	}

    function handleClick(event: MouseEvent) {
        gsap.utils.random(soundeffects).play()

        if('object' in event && event.object instanceof THREE.Mesh){
            gsap.to(event.object.rotation, {
                x:`+=${gsap.utils.random(0,3)}`,
                y:`+=${gsap.utils.random(0,3)}`,
                z:`+=${gsap.utils.random(0,3)}`,
                duration: 1.3,
                ease: 'elastic.out(1,0.3)',
                yoyo: true,
            })



            event.object.material = getRandomMaterial();
        }
    }

    const bounce = createTransition((ref) => {
        return {
            tick(t) {
                if (t>0) visible = true;
                ref.scale.set(t,t,t)
            },
            easing: elasticOut,
            duration: gsap.utils.random(800,1200),
            delay: gsap.utils.random(0,500)
        }
    })

</script>


<Threlte.Group position={[position[0] * 2, position[1] * 2, position[2] * 2]}>
    <Float speed={5 * rate} rotationSpeed={5 * rate} rotationIntensity={6*rate} floatIntensity={5*rate}>
        <Threlte.Mesh {visible} {geometry} in={bounce} material={getRandomMaterial()}
        interactive
        on:click={handleClick}

        ></Threlte.Mesh>
    </Float>
</Threlte.Group>

