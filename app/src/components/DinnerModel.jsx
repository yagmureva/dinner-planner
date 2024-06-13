import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const DinnerModel = () => {
  const { scene } = useGLTF("models/scene.gltf");
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <primitive object={scene} scale={2} />
      <OrbitControls />
    </Canvas>
  );
};

export default DinnerModel;
