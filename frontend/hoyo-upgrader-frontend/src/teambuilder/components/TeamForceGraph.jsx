/* eslint-disable no-unused-vars */
import React from 'react';
import * as THREE from 'three';
import { ForceGraph3D } from 'react-force-graph';

import paths, { getCharacterImgPath } from '../../data/paths';
import ownedCharacters from '../data/mock/ownedCharacters';
import characters from '../data/characters';

// import '../styles/TeamForceGraph.scss';

export default function TeamForceGraph() {
  const characterNodes = ownedCharacters.map((character) => ({
    id: character,
    img: getCharacterImgPath(character),
  }));

  const links = [];
  const colorNeeds = '#ffffff';
  const colorLikes = '#5555ff';
  characters.forEach((char) => {
    const { name, mates } = char;
    const { needs, likes, hates } = mates;
    needs.forEach((need) => {
      links.push({
        source: name,
        target: need,
        value: 10,
        color: colorNeeds,
      });
    });
    likes.forEach((like) => {
      links.push({
        source: name,
        target: like,
        value: 3,
        color: colorLikes,
      });
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
        graphData={gData}
        nodeThreeObject={drawCharacterNode}
        linkWidth={0.5}
        linkOpacity={0.4}
        linkDirectionalParticleSpeed={(d) => d.value * 0.001}
        linkDirectionalParticles="value"
      />
    </div>
  );
}
