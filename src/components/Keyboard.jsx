import * as THREE from 'three';
import React, { useEffect, useRef } from "react";

const pianoSpecs = {
    white: {
        width: 0.9,
        height: 1.8,
        depth: 7.2,
        color: 0xffffee
    },
    black: {
        width: 0.45,
        height: 0.9,
        depth: 4.5,
        color: 0x3f3f3f
    }
};

const START_X = -26.0 * pianoSpecs.white.width;

const Keyboard = ({ midiInputDevices, setMidiInputDevices, currentDevice, setCurrentDevice, notes, setNotes }) => {
    const refContainer = useRef(null);
    const keys = useRef({});

    useEffect(() => {
        Object.keys(keys.current).forEach(key => {
            if (notes.includes(key)) {
                keys.current[key].material.color.setHex(0xff0000);
            } else {
                if (key.includes("#")) {
                    keys.current[key].material.color.setHex(pianoSpecs.black.color);
                } else keys.current[key].material.color.setHex(pianoSpecs.white.color);
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
        // camera.position.set(0, -10,0)/
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        // Append renderer's DOM element to the container instead of document.body:
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        const light1 = new THREE.DirectionalLight(0xffffee, 1);
        light1.position.set(-10, 5, 0);
        const light2 = new THREE.DirectionalLight(0xffffee, 1);
        light2.position.set(10, 5, 0);
        scene.add(light1);
        scene.add(light2);

        createPianoKeys(scene);

        light1.target = keys.current["C2"];
        light2.target = keys.current["C6"];

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
                const geometry = new THREE.BoxGeometry(
                    pianoSpecs.white.width,
                    pianoSpecs.white.height,
                    pianoSpecs.white.depth
                );
                const edges = new THREE.EdgesGeometry(geometry);
                const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

                const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.white.color, shininess: 100});
                const cube = new THREE.Mesh(geometry, material);
                cube.position.x = START_X + 2 * pianoSpecs.white.width + pianoSpecs.white.width * index + i * 7 * pianoSpecs.white.width;
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
                const geometry = new THREE.BoxGeometry(
                    pianoSpecs.black.width,
                    pianoSpecs.black.height,
                    pianoSpecs.black.depth
                );
                const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.black.color, shininess: 150 });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(START_X + pianoSpecs.white.width * 2 + pianoSpecs.black.width + (pianoSpecs.white.width * index) + i * 7 * pianoSpecs.white.width, pianoSpecs.white.width, -pianoSpecs.white.width);
                scene.add(cube);

                if (index === 0) {
                    keys.current[`C#${i + 1}`] = cube;
                } else {
                    keys.current[`D#${i + 1}`] = cube;
                }
            }

            for (let index = 0; index < 3; index++) {
                const geometry = new THREE.BoxGeometry(
                    pianoSpecs.black.width,
                    pianoSpecs.black.height,
                    pianoSpecs.black.depth
                );
                const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.black.color, shininess: 150 });
                const cube = new THREE.Mesh(geometry, material);
                cube.position.set(START_X + pianoSpecs.white.width * 2 + 7 * pianoSpecs.black.width + (pianoSpecs.white.width * index) + i * 7 * pianoSpecs.white.width, pianoSpecs.white.width, -pianoSpecs.white.width);
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
            const geometry = new THREE.BoxGeometry(
                pianoSpecs.white.width,
                pianoSpecs.white.height,
                pianoSpecs.white.depth
            );
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

            const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.white.color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = START_X + pianoSpecs.white.width * index;
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
            const geometry = new THREE.BoxGeometry(
                pianoSpecs.black.width,
                pianoSpecs.black.height,
                pianoSpecs.black.depth
            );
            const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.black.color, shininess: 150 });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(START_X + pianoSpecs.black.width, pianoSpecs.white.width, -pianoSpecs.white.width);
            scene.add(cube);

            keys.current["A#0"] = cube;
        }

        for (let index = 0; index < 1; index++) {
            const geometry = new THREE.BoxGeometry(
                pianoSpecs.white.width,
                pianoSpecs.white.height,
                pianoSpecs.white.depth
            );
            const edges = new THREE.EdgesGeometry(geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x000000 }));

            const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.white.color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.x = START_X + 2 * pianoSpecs.white.width + 7 * 7 * pianoSpecs.white.width;
            line.position.x = cube.position.x;
            scene.add(cube);
            scene.add(line);

            keys.current["C8"] = cube;
        }

        {
            const geometry = new THREE.BoxGeometry(
                7 * 7 * pianoSpecs.white.width + 3 * pianoSpecs.white.width,
                pianoSpecs.white.height * 2.2,
                pianoSpecs.white.depth / 2.0
            );

            const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.black.color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(0, 0, -5);
            scene.add(cube);
        }

        {
            const geometry = new THREE.BoxGeometry(
                2 * pianoSpecs.white.width,
                pianoSpecs.white.height * 2.2,
                pianoSpecs.white.depth * 1.5,
            );

            const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.black.color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(START_X - 1, 0, -1.43);
            scene.add(cube);
        }

        {
            const geometry = new THREE.BoxGeometry(
                2 * pianoSpecs.white.width,
                pianoSpecs.white.height * 2.2,
                pianoSpecs.white.depth * 1.5,
            );

            const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.black.color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(-START_X + 1, 0, -1.43);
            scene.add(cube);
        }

        {
            const geometry = new THREE.BoxGeometry(
                7 * 7 * pianoSpecs.white.width + 3 * pianoSpecs.white.width,
                pianoSpecs.black.height,
                pianoSpecs.white.depth * 1.5
            );

            const material = new THREE.MeshPhongMaterial({ color: pianoSpecs.black.color });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(0, -1, -1.5);
            scene.add(cube);
        }
    };

    return (
        <div ref={refContainer} style={{ width: "100%", height: "100%" }}></div>
    );
};

export default Keyboard;
