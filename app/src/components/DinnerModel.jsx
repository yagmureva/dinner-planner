// src/components/DinnerModel/DinnerModel.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function DinnerModel() {
  const { scene } = useGLTF("/models/scene.gltf");
  return (
    <div className="threejs-container">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <primitive object={scene} scale={[1.5, 1.5, 1.5]} />{" "}
        {/* Adjust scale if needed */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/scene.gltf");

export default DinnerModel;
