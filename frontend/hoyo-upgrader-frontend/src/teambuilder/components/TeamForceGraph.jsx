/* eslint-disable no-unused-vars */
import React, { useCallback, useRef } from 'react';
import * as THREE from 'three';
import { ForceGraph3D } from 'react-force-graph';

import paths, { getCharacterImgPath } from '../../data/paths';
import ownedCharacters from '../data/mock/ownedCharacters';
import characters from '../data/characters';

// import '../styles/TeamForceGraph.scss';

export default function TeamForceGraph({
  filteredElements,
}) {
  const graph = useRef();
  const [selectedNode, setSelectedNode] = React.useState(null);

  const handleClickNode = useCallback((node) => {
    // Aim at node from outside it
    const distance = 200;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    graph.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000, // ms transition duration
    );

    console.log(node);
    setSelectedNode(node.id);
  }, [graph]);

  if (!filteredElements) {
    return null;
  }

  const ownedCharacterData = characters
    .filter((char) => ownedCharacters.includes(char.name));

  const filteredCharacterData = ownedCharacterData
    .filter((char) => filteredElements.includes(char.element) || char.name === 'Traveler');

  const characterNodes = filteredCharacterData.map((character) => ({
    id: character.name,
    img: getCharacterImgPath(
      Object.keys(paths.character).find((key) => paths.character[key] === character.name),
    ),
  }));

  // Links
  const links = [];
  const linkNeeds = {
    value: 10,
    color: '#ffffff',
  };
  const linkLikes = {
    value: 3,
    color: '#5555ff',
    linkWidth: 10,
  };
  filteredCharacterData.forEach((char) => {
    const { name, mates } = char;
    const { needs, likes } = mates;
    needs.forEach((need) => {
      if (filteredCharacterData.find((fChar) => fChar.name === need)) {
        links.push({
          source: name,
          target: need,
          ...linkNeeds,
        });
      }
    });
    likes.forEach((like) => {
      if (filteredCharacterData.find((fChar) => fChar.name === like)) {
        links.push({
          source: name,
          target: like,
          ...linkLikes,
        });
      }
    });
  });

  const gData = {
    nodes: characterNodes,
    links,
  };

  const drawCharacterNode = ({ img }) => {
    const imgTexture = new THREE.TextureLoader().load(img);
    imgTexture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.SpriteMaterial({ map: imgTexture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(10, 10);
    return sprite;
  };

  return (
    <div
      className="TeamForceGraph"
    >
      <ForceGraph3D
        ref={graph}
        graphData={gData}
        nodeThreeObject={drawCharacterNode}
        linkWidth={0.5}
        linkOpacity={0.4}
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
        linkDirectionalParticles="value"
        onNodeClick={handleClickNode}
      />
    </div>
  );
}
