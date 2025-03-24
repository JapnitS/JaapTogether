// import { Text, View } from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Vibration,
  SafeAreaView,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';




const USERNAME = 'John'; // Replace with actual user name from your auth system

const JaapScreen = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const buttonScale = useRef(new Animated.Value(1)).current;
  const bubblePosition = useRef(new Animated.Value(0)).current;
  const bubbleOpacity = useRef(new Animated.Value(0)).current;
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleValue, setBubbleValue] = useState(1);
  const { jaapGoal, jaapTitle } = useLocalSearchParams();

  // Handle button press animation
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Handle emoji bubble animation
  const animateBubble = (value)  => {
    setShowBubble(true);
    setBubbleValue(value);
    bubblePosition.setValue(0);
    bubbleOpacity.setValue(1);

    Animated.parallel([
      Animated.timing(bubblePosition, {
        toValue: -100,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(bubbleOpacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowBubble(false);
    });
  };

  const handlePress = () => {
    // Update counter
    setCount(prevCount => prevCount + 1);
    
    // Trigger vibration
    Vibration.vibrate(50);
    
    // Trigger animations
    animateButton();
    animateBubble(1);
  };

  const handleManualSubmit = () => {
    // Validate input
    const value = parseInt(inputValue, 10);
    if (isNaN(value) || value <= 0) {
      return; // Invalid input
    }
    
    // Update counter
    setCount(prevCount => prevCount + value);
    
    // Trigger vibration
    Vibration.vibrate(50);
    
    // Show bubble with the added value
    animateBubble(value);
    
    // Close modal and reset input
    setModalVisible(false);
    setInputValue('');
  };

  const progressPercentage = (count / jaapGoal) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Prominent Team Goal Display */}
        <View style={styles.goalHeaderContainer}>
          <Text style={styles.goalHeaderTitle}>{jaapTitle}</Text>
          <Text style={styles.goalHeaderValue}>{count} / {jaapGoal}</Text>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>

        <View style={styles.buttonContainer}>
          {showBubble && (
            <Animated.View
              style={[
                styles.bubble,
                {
                  transform: [{ translateY: bubblePosition }],
                  opacity: bubbleOpacity,
                },
              ]}
            >
              <Text style={styles.bubbleText}>🙏 +{bubbleValue}</Text>
              <Text style={styles.bubbleName}>{USERNAME}</Text>
            </Animated.View>
          )}

          <Animated.View
            style={{
              transform: [{ scale: buttonScale }],
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={handlePress}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>PRAY</Text>
            </TouchableOpacity>
          </Animated.View>
          
          {/* Manual Input Button */}
          <TouchableOpacity
            style={styles.manualInputButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.manualInputButtonText}>Enter Manually</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Manual Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.modalContainer}
              >
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Add to Counter</Text>
                  
                  <TextInput
                    style={styles.modalInput}
                    value={inputValue}
                    onChangeText={setInputValue}
                    placeholder="Enter amount to add"
                    keyboardType="numeric"
                    autoFocus={true}
                  />
                  
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.modalCancelButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.modalCancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.modalAddButton}
                      onPress={handleManualSubmit}
                    >
                      <Text style={styles.modalAddButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 100,
  },
  // Prominent Team Goal Header
  goalHeaderContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  goalHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  goalHeaderValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 60,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 50,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Manual Input Button
  manualInputButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6200ee',
  },
  manualInputButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '500',
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bubbleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bubbleName: {
    fontSize: 12,
    color: '#555',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancelButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
  },
  modalAddButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#6200ee',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalAddButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default JaapScreen;



