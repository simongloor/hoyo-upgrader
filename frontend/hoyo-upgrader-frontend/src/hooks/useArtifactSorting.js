/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { sortIntoSections } from '../data/sorting';

// export default function useArtifactSorting(artifacts) {
//   const [sortedArtifacts, setSortedArtifacts] = useState(null);

//   useEffect(() => {
//     if (artifacts.isEvaluated) {
//       const asList = [...artifacts.asList];

//       // sort into quality sections
//       const asQualitySections = sortIntoSections(asList);

//       setSortedArtifacts(asQualitySections);
//     }
//   }, [artifacts]);

//   // console.log(evaluatedArtifacts, builds);
//   return sortedArtifacts;
// }
