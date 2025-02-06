import * as THREE from 'three';
import React, { useEffect, useRef } from "react";

const START_X = -11.5;

const Keyboard = ({ midiInputDevices, setMidiInputDevices, currentDevice, setCurrentDevice, notes, setNotes }) => {
    const refContainer = useRef(null);

    useEffect(() => {
        const container = refContainer.current;
        // Use container's dimensions rather than window dimensions.
        const width = container.clientWidth;
        const height = container.clientHeight;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf8f9fa);

        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 15, 10);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        // Append renderer's DOM element to the container instead of document.body:
        container.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(0xffffee, 3);
        light.position.set(0, 5, 1);
        scene.add(light);

        createPianoKeys(scene);

        const animate = () => {
            if (resizeRendererToDisplaySize(renderer, container)) {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
            }
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    const resizeRendererToDisplaySize = (renderer, container) => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        const needResize = renderer.domElement.width !== width || renderer.domElement.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    };

    const createPianoKeys = (scene) => {
        for (let i = 0; i < 7; i++) {
            for (let index = 0; index < 7; index++) {
                const geometry = new THREE.BoxGeometry(0.5, 1, 4);
                const edges = new THREE.EdgesGeometry(geometry);
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

                const material = new THREE.MeshPhongMaterial({ color: 0xffffee });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.x = START_X + 1 + 0.5 * index + i * 3.5;
                line.position.x = cube.position.x;
                scene.add(cube);
                scene.add(line);
            }

            for (let index = 0; index < 2; index++) {
                const geometry = new THREE.BoxGeometry(0.25, 0.5, 2.5);
                const material = new THREE.MeshPhongMaterial({ color: 0x1e1e1e });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(START_X + 1 + 0.25 + (0.5 * index) + i * 3.5, 0.5, -0.5);
                scene.add(cube);
            }

            for (let index = 0; index < 3; index++) {
                const geometry = new THREE.BoxGeometry(0.25, 0.5, 2.5);
                const material = new THREE.MeshPhongMaterial({ color: 0x1e1e1e });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(START_X + 1 + 1.75 + (0.5 * index) + i * 3.5, 0.5, -0.5);
                scene.add(cube);
            }
        }

        for (let index = 0; index < 2; index++) {
            const geometry = new THREE.BoxGeometry(0.5, 1, 4);
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

            const material = new THREE.MeshPhongMaterial({ color: 0xffffee });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = START_X + 0.5 * index;
            line.position.x = cube.position.x;
            scene.add(cube);
            scene.add(line);
        }

        for (let index = 0; index < 1; index++) {
            const geometry = new THREE.BoxGeometry(0.25, 0.5, 2.5);
            const material = new THREE.MeshPhongMaterial({ color: 0x1e1e1e });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(START_X + 0.25, 0.5, -0.5);
            scene.add(cube);
        }

        for (let index = 0; index < 1; index++) {
            const geometry = new THREE.BoxGeometry(0.5, 1, 4);
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

            const material = new THREE.MeshPhongMaterial({ color: 0xffffee });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = START_X + 1 + 7 * 3.5;
            line.position.x = cube.position.x;
            scene.add(cube);
            scene.add(line);
        }
    };

    return (
        <div ref={refContainer} style={{ width: "100%", height: "100%" }}></div>
    );
};

export default Keyboard;
