import BottomSheet from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react';

import { ChatTeardropDots } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

import { feedbackTypes } from '../../utils/feedbackTypes'

import { Form } from '../Form';
import { Options } from '../Options';
import { Success } from '../Success'

import { styles } from './styles';
import { theme } from '../../theme';

export type FeedbackType =  keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setfeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setfeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand()
  }

  function handleRestartFeedback() {
    setfeedbackType(null);
    setfeedbackSent(false);
  }

  function handleFeedbackSent() {
    setfeedbackSent(true)
  }



  return (
   <>
    <TouchableOpacity 
      style={styles.button}
      onPress={handleOpen}
    >
      <ChatTeardropDots 
        size={24}
        weight="bold"
        color={theme.colors.text_on_brand_color}
      />

    </TouchableOpacity>

    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[1, 280]}
      backgroundStyle={styles.modal}
      handleIndicatorStyle={styles.indicator}
    >

      
     {
       feedbackSent 
       ?
       <Success 
        onSendAnotherFeedback={handleRestartFeedback}
       />
       :
       <>
          {
            feedbackType ?
            <Form 
              feedbackType={feedbackType}
              onFeedbackSent={handleFeedbackSent}
              onFeedbackCanceled={handleRestartFeedback}
            />
            :
            <Options 
              onFeedbackTypeChanged={setfeedbackType}
            />
      
          }
       </> 
      }
    </BottomSheet>

   </>
     
   
  );
}

export default gestureHandlerRootHOC(Widget);