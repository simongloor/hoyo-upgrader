export default function getElementalCombinations(focusedElement, elements) {
  // return all possible combinations of elements
  // that include the focused element
  // the focused element will always be the first element in the combination
  return elements.reduce((acc, element) => {
    if (element === focusedElement) return acc;
    acc.push([focusedElement, element]);
    return acc;
  }, []);
}
