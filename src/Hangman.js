import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const image0 = require('./assets/Frame0.png');
const image1 = require('./assets/Frame1.png');
const image2 = require('./assets/Frame2.png');
const image3 = require('./assets/Frame3.png');
const image4 = require('./assets/Frame4.png');
const image5 = require('./assets/Frame5.png');
const image6 = require('./assets/Frame6.png');

import {words as w} from './words';

const MAX_ATTEMP = 6;

const Hangman = () => {
  const [words] = useState(w);
  const [selectedWord, setSelectedWord] = useState(null);
  const [inputLetters, setInputLetters] = useState([]);
  const [mistake, setMistake] = useState(0);
  // const [images] = [image0, image1, image2, image3, image4, image5, image6];

  useEffect(() => {
    setInputLetters([]);
    generateRandomWord();
  }, [generateRandomWord]);

  const handleRestart = () => {
    generateRandomWord();
    setInputLetters([]);
    setMistake(0);
  };

  const checkIsFinished = () => {
    const isMistakesFull = mistake === MAX_ATTEMP;

    const isThereAnyLetter =
      selectedWord &&
      [...selectedWord.word].filter((l) => !checkIsIncluded(l)).length === 0;

    return mistake === 6 || (isThereAnyLetter && !isMistakesFull);
  };

  const checkIsIncluded = (item) => {
    return inputLetters.includes(item);
  };

  const generateRandomWord = useCallback(() => {
    const index = Math.floor(Math.random() * words.length);
    setSelectedWord(words[index]);
    console.log(words[index]);
  }, [words]);

  const generateButtons = () => {
    return 'abcdefghijklmnoprstuvwxyz'.split('').map((letter, i) => (
      <TouchableOpacity
        key={i}
        disabled={checkIsIncluded(letter) || checkIsFinished()}
        onPress={() => {
          if (!selectedWord.word.includes(letter)) {
            setMistake(mistake + 1);
          }
          return setInputLetters([...inputLetters, letter]);
        }}>
        <View
          style={[
            styles.button,
            checkIsIncluded(letter) && styles.disabledButton,
          ]}>
          <Text style={styles.letter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  const generateLetters = () => {
    return (
      selectedWord &&
      [...selectedWord.word].map((letter) =>
        checkIsIncluded(letter.trim())
          ? `${letter} `
          : !letter.trim()
          ? '      '
          : '__ ',
      )
    );
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={mistake + 1} style={{width: 200, height: 300}} />
      <View style={styles.buttonGroup}>{generateButtons()}</View>

      <Text style={{marginHorizontal: 'auto'}}>{generateLetters()}</Text>

      <Text>Type: {selectedWord?.type}</Text>
      <Text>Remaining: {MAX_ATTEMP - mistake}</Text>

      {checkIsFinished() && (
        <>
          {mistake === MAX_ATTEMP && <Text>Word was: {selectedWord.word}</Text>}
          <Text style={{color: mistake === MAX_ATTEMP ? 'red' : 'green'}}>
            {' '}
            {mistake === MAX_ATTEMP ? 'YOU LOST' : 'YOU WON'}
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              styles.restartButton,
              {backgroundColor: mistake === MAX_ATTEMP ? 'red' : 'green'},
            ]}
            onPress={handleRestart}>
            <Text style={styles.letter}>RESTART</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    margin: 1,
    backgroundColor: 'lightblue',
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  disabledButton: {
    backgroundColor: 'lightgray',
  },
  restartButton: {
    width: 100,
  },
  letter: {
    fontSize: 17,
    textTransform: 'uppercase',
  },
});

export default Hangman;
