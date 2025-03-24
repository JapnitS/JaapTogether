import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
  Dimensions,
  Vibration,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Cause } from '../types/cause';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AllCauseItem = ({ 
  cause,
  onJoin,
}: { 
  cause: Cause;
  onJoin: (causeId: string) => void;
}) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  
  const handleStartJaap = () => {
    router.push({
      pathname: '/Jaap/',
      params: { jaapGoal: cause.goal, jaapTitle: cause.title },
    });
  };

  const handleJoinPress = () => {
    onJoin(cause.id);
  };

  const handleLongPress = () => {
    // Add vibration feedback (100ms)
    Vibration.vibrate(100);
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    setModalVisible(true);
  };

  // Calculate progress percentage
  const progressPercentage = Math.round((cause.currentJaaps / cause.goal) * 100);
  
  // Determine progress color based on percentage
  const getProgressColor = () => {
    if (progressPercentage < 30) return ['#FF9D80', '#FF6B5B'];
    if (progressPercentage < 70) return ['#FFCF5C', '#FFA90F'];
    return ['#7BE495', '#329D9C'];
  };

  return (
    <>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.causeCard}
          onPress={handleStartJaap}
          onLongPress={handleLongPress}
          delayLongPress={400}
          activeOpacity={0.9}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.causeName}>{cause.title}</Text>
              <View style={styles.membersContainer}>
                <Ionicons name="people" size={14} color="#4A6FE7" />
                <Text style={styles.membersText}>{cause.members.length}</Text>
              </View>
              
              {/* Moved Baani badge to a better position */}
              <View style={styles.baaniBadge}>
                <Text style={styles.baaniText}>Baani</Text>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressText}>
                  <Text style={styles.currentCount}>{cause.currentJaaps}</Text>
                  <Text style={styles.slashStyle}> / </Text>
                  <Text style={styles.goalCount}>{cause.goal}</Text>
                </Text>
                <Text style={styles.progressPercentage}>
                  {progressPercentage}%
                </Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <LinearGradient
                  colors={getProgressColor()}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.progressBar, { width: `${progressPercentage}%` }]}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.joinButton}
                onPress={handleJoinPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#6A3093', '#A044FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.joinButtonGradient}
                >
                  <Ionicons name="add-circle-outline" size={16} color="white" />
                  <Text style={styles.joinButtonText}>Join This Cause</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.previewButton}
                onPress={handleStartJaap}
              >
                <Text style={styles.previewButtonText}>Preview</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.longPressHint}>Long press for details</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Detailed Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{cause.title}</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Ionicons name="close-circle" size={24} color="#6A3093" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalDivider} />
                
                <View style={styles.modalInfoSection}>
                  <View style={styles.modalInfoRow}>
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="flame" size={20} color="#FFA90F" />
                      <View>
                        <Text style={styles.modalInfoLabel}>Goal</Text>
                        <Text style={styles.modalInfoValue}>{cause.goal} Jaaps</Text>
                      </View>
                    </View>
                    
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="people" size={20} color="#4A6FE7" />
                      <View>
                        <Text style={styles.modalInfoLabel}>Members</Text>
                        <Text style={styles.modalInfoValue}>{cause.members.length}</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.modalInfoRow}>
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="bar-chart" size={20} color="#329D9C" />
                      <View>
                        <Text style={styles.modalInfoLabel}>Progress</Text>
                        <Text style={styles.modalInfoValue}>{progressPercentage}% Complete</Text>
                      </View>
                    </View>
                    
                    <View style={styles.modalInfoItem}>
                      <Ionicons name="time" size={20} color="#A044FF" />
                      <View>
                        <Text style={styles.modalInfoLabel}>Current</Text>
                        <Text style={styles.modalInfoValue}>{cause.currentJaaps} Jaaps</Text>
                      </View>
                    </View>
                  </View>
                </View>
                
                {cause.description && (
                  <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionTitle}>About this cause</Text>
                    <Text style={styles.descriptionText}>{cause.description || "Join this cause to contribute to our collective goal and make a difference together."}</Text>
                  </View>
                )}
                
                {cause.recentContributors && cause.recentContributors.length > 0 && (
                  <View style={styles.contributorsSection}>
                    <Text style={styles.contributorsTitle}>Recent Contributors</Text>
                    <View style={styles.contributorsList}>
                      {cause.recentContributors.map((contributor, index) => (
                        <Text key={index} style={styles.contributorName}>
                          {contributor}{index < cause.recentContributors.length - 1 ? ', ' : ''}
                        </Text>
                      ))}
                    </View>
                  </View>
                )}
                
                <View style={styles.modalButtonsContainer}>
                  <Pressable 
                    style={styles.modalJoinButton}
                    onPress={() => {
                      handleJoinPress();
                      setModalVisible(false);
                    }}
                  >
                    <LinearGradient
                      colors={['#6A3093', '#A044FF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.modalJoinGradient}
                    >
                      <Text style={styles.modalJoinText}>Join This Cause</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  causeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  baaniBadge: {
    backgroundColor: '#6A3093',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
    // No longer absolute positioned
  },
  baaniText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  causeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  membersContainer: {
    backgroundColor: '#F0F5FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  membersText: {
    fontSize: 12,
    color: '#4A6FE7',
    fontWeight: '600',
    marginLeft: 4,
  },
  progressSection: {
    marginBottom: 14,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  currentCount: {
    fontWeight: '700',
    color: '#333',
  },
  slashStyle: {
    color: '#999',
  },
  goalCount: {
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A3093',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#EEF1F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  joinButton: {
    flex: 2,
    marginRight: 8,
    borderRadius: 25,
    overflow: 'hidden',
  },
  joinButtonGradient: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 6,
  },
  previewButton: {
    flex: 1,
    backgroundColor: '#F0F5FF',
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#4A6FE7',
    fontWeight: '600',
    fontSize: 14,
  },
  longPressHint: {
    textAlign: 'center',
    fontSize: 11,
    color: '#AAA',
    marginTop: 10,
    fontStyle: 'italic',
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: width * 0.9,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 12,
  },
  modalInfoSection: {
    marginVertical: 10,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalInfoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInfoLabel: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  modalInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  descriptionSection: {
    marginTop: 6,
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contributorsSection: {
    marginBottom: 16,
  },
  contributorsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  contributorsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contributorName: {
    fontSize: 14,
    color: '#4A6FE7',
    marginRight: 4,
  },
  modalButtonsContainer: {
    marginTop: 10,
  },
  modalJoinButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  modalJoinGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalJoinText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AllCauseItem;