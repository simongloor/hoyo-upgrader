/* eslint-disable no-unused-vars */
import React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import * as THREE from 'three';
import paths, { getCharacterImgPath } from '../../data/paths';
// import '../styles/TeamForceGraph.scss';

export default function TeamForceGraph({ children }) {
  const characterNodes = [
    {
      id: paths.character.Bennett,
      img: getCharacterImgPath(paths.character.Bennett),
    },
    {
      id: paths.character.Xiangling,
      img: getCharacterImgPath(paths.character.Xiangling),
    },
    {
      id: paths.character.Gaming,
      img: getCharacterImgPath(paths.character.Gaming),
    },
  ];

  const gData = {
    nodes: characterNodes,
    links: [
      {
        source: paths.character.Xiangling,
        target: paths.character.Bennett,
        linkLabel: 'hui',
        linkColor: 'red',
        linkWidth: 3,
        val: 1,
        value: 1,
        color: '#ffff00',
      },
      {
        source: paths.character.Gaming,
        target: paths.character.Bennett,
        val: 10,
        value: 10,
        color: '#ffffff',
      },
    ],
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
        graphData={gData}
        nodeThreeObject={drawCharacterNode}
        linkWidth={0.5}
        linkOpacity={0.6}
        // nodeAutoColorBy="value"
        // linkAutoColorBy="value"
        linkDirectionalParticles="value"
        linkDirectionalParticleSpeed={(d) => d.val * 0.001}
      />
    </div>
  );
}