interface CharacterFrequencies {
  [character: string]: number;
}

export function minimumCharactersForWords(words: string[]) {
  const maximumCharacterFrequencies: CharacterFrequencies = {};

  for (const word of words) {
    const characterFrequencies = countCharacterFrequencies(word);
    updateMaximumFrequencies(characterFrequencies, maximumCharacterFrequencies);
  }

  return makeArrayFromCharacterFrequencies(maximumCharacterFrequencies);
}

function countCharacterFrequencies(string: string) {
  const characterFrequencies: CharacterFrequencies = {};

  for (const character of string) {
    if (!(character in characterFrequencies)) {
      characterFrequencies[character] = 0;
    }

    characterFrequencies[character] += 1;
  }

  return characterFrequencies;
}

function updateMaximumFrequencies(frequencies: CharacterFrequencies, maximumFrequencies: CharacterFrequencies) {
  for (const character in frequencies) {
    const frequency = frequencies[character];

    if (character in maximumFrequencies) {
      maximumFrequencies[character] = Math.max(frequency, maximumFrequencies[character]);
    } else {
      maximumFrequencies[character] = frequency;
    }
  }
}

function makeArrayFromCharacterFrequencies(characterFrequencies: CharacterFrequencies) {
  const characters: string[] = [];

  for (const character in characterFrequencies) {
    const frequency = characterFrequencies[character];

    for (let idx = 0; idx < frequency; idx++) {
      characters.push(character);
    }
  }

  return characters;
}
