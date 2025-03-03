import * as THREE from 'three';
import React, { useEffect, useRef } from "react";

const START_X = -11.5;

const Keyboard = ({ midiInputDevices, setMidiInputDevices, currentDevice, setCurrentDevice, notes, setNotes }) => {
    const refContainer = useRef(null);
    const keys = useRef({});

    useEffect(() => {
        Object.keys(keys.current).forEach(key => {
            if (notes.includes(key)) {
                keys.current[key].material.color.setHex(0xff0000);
            } else {
                if (key.includes("#")) {
                    keys.current[key].material.color.setHex(0x1e1e1e);
                } else keys.current[key].material.color.setHex(0xffffee);
            }
        });
    }, [notes]);

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

                let name;
                // mapping
                switch (index) {
                    case 0:
                        name = "C";
                        break;
                    case 1:
                        name = "D";
                        break;
                    case 2:
                        name = "E";
                        break;
                    case 3:
                        name = "F";
                        break;
                    case 4:
                        name = "G";
                        break;
                    case 5:
                        name = "A";
                        break;
                    case 6:
                        name = "B";
                        break;
                    default:
                        break;
                }

                keys.current[`${name}${i + 1}`] = cube;
            }

            for (let index = 0; index < 2; index++) {
                const geometry = new THREE.BoxGeometry(0.25, 0.5, 2.5);
                const material = new THREE.MeshPhongMaterial({ color: 0x1e1e1e });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(START_X + 1 + 0.25 + (0.5 * index) + i * 3.5, 0.5, -0.5);
                scene.add(cube);

                if (index === 0) {
                    keys.current[`C#${i + 1}`] = cube;
                } else {
                    keys.current[`D#${i + 1}`] = cube;
                }
            }

            for (let index = 0; index < 3; index++) {
                const geometry = new THREE.BoxGeometry(0.25, 0.5, 2.5);
                const material = new THREE.MeshPhongMaterial({ color: 0x1e1e1e });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(START_X + 1 + 1.75 + (0.5 * index) + i * 3.5, 0.5, -0.5);
                scene.add(cube);

                if (index === 0) {
                    keys.current[`F#${i + 1}`] = cube;
                }
                if (index === 1) {
                    keys.current[`G#${i + 1}`] = cube;
                }
                if (index === 2) {
                    keys.current[`A#${i + 1}`] = cube;
                }
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

            if (index === 0) {
                keys.current["A0"] = cube;
            } else {
                keys.current["B0"] = cube;
            }
        }

        for (let index = 0; index < 1; index++) {
            const geometry = new THREE.BoxGeometry(0.25, 0.5, 2.5);
            const material = new THREE.MeshPhongMaterial({ color: 0x1e1e1e });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(START_X + 0.25, 0.5, -0.5);
            scene.add(cube);

            keys.current["A#0"] = cube;
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

            keys.current["C8"] = cube;
        }
    };

    return (
        <div ref={refContainer} style={{ width: "100%", height: "100%" }}></div>
    );
};

export default Keyboard;
