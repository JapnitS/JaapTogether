// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     SafeAreaView,
//     FlatList,
//     TouchableOpacity,
//     Image,
//     StatusBar,
//   } from 'react-native';

// import { useRouter, useLocalSearchParams } from 'expo-router';  
// import { Cause } from '../types/cause';

// const CauseItemProper = ({ 
//     cause, 
// }: { 
//     cause: Cause; 
// }) => {
//     const router = useRouter();
//     const handleStartJaap = () => {
//         router.push({
//           pathname: '/Jaap/',
//           params: { jaapGoal:cause.goal, jaapTitle:cause.title  }, // Placeholder
//         });
//       };
//   return (
//      <TouchableOpacity
//             style={styles.causeCard}
//             onPress={handleStartJaap}
//           >
//             <View style={styles.cardHeader}>
//               <Text style={styles.causeName}>{cause.title}</Text>
//               <View style={styles.membersContainer}>
//                 <Text style={styles.membersText}>{cause.members.length} members</Text>
//               </View>
//             </View>
    
//             <View style={styles.progressSection}>
//               <View style={styles.progressInfo}>
//                 <Text style={styles.progressText}>
//                   {cause.currentJaaps} / {cause.goal}
//                 </Text>
//                 <Text style={styles.progressPercentage}>
//                 {Math.round((cause.currentJaaps / cause.goal) * 100)}%
//                 </Text>
//               </View>
              
//               <View style={styles.progressBarContainer}>
//                 <View 
//                   style={[styles.progressBar, { width: `${Math.round((cause.currentJaaps / cause.goal) * 100)}%` }]} 
//                 />
//               </View>
//             </View>
    
//             {/* <View style={styles.recentActivity}>
//               <Text style={styles.recentText}>Recent: </Text>
//               <View style={styles.contributorsContainer}>
//                 {cause.recentContributors.map((contributor, index) => (
//                   <Text key={index} style={styles.contributorName}>
//                     {contributor}{index < cause.recentContributors.length - 1 ? ', ' : ''}
//                   </Text>
//                 ))}
//               </View>
//             </View> */}
//           </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#F9F9F9',
//     },
//     header: {
//       alignItems: 'center',
//       paddingVertical: 20,
//       backgroundColor: '#FFF',
//       borderBottomWidth: 1,
//       borderBottomColor: '#F0F0F0',
//       elevation: 2,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 1 },
//       shadowOpacity: 0.1,
//       shadowRadius: 2,
//     },
//     icon: {
//       marginBottom: 10,
//       width: 80,
//       height: 80,
      
//     },
//     welcomeText: {
//       fontSize: 22,
//       fontWeight: 'bold',
//       color: '#333',
//       marginBottom: 5,
//     },
//     listContainer: {
//       padding: 16,
//     },
//     causeCard: {
//       backgroundColor: '#FFF',
//       borderRadius: 12,
//       padding: 16,
//       marginBottom: 16,
//       elevation: 3,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//     },
//     cardHeader: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: 12,
//     },
//     causeName: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       color: '#333',
//       flex: 1,
//     },
//     membersContainer: {
//       backgroundColor: '#F0F5FF',
//       paddingHorizontal: 10,
//       paddingVertical: 5,
//       borderRadius: 20,
//     },
//     membersText: {
//       fontSize: 12,
//       color: '#4A6FE7',
//       fontWeight: '500',
//     },
//     progressSection: {
//       marginBottom: 12,
//     },
//     progressInfo: {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       marginBottom: 8,
//     },
//     progressText: {
//       fontSize: 14,
//       color: '#666',
//       fontWeight: '500',
//     },
//     progressPercentage: {
//       fontSize: 14,
//       fontWeight: 'bold',
//       color: '#4A6FE7',
//     },
//     progressBarContainer: {
//       height: 8,
//       backgroundColor: '#EEF1F6',
//       borderRadius: 4,
//       overflow: 'hidden',
//     },
//     progressBar: {
//       height: '100%',
//       backgroundColor: '#FFA500',
//       borderRadius: 4,
//     },
//     recentActivity: {
//       flexDirection: 'row',
//       marginTop: 8,
//     },
//     recentText: {
//       fontSize: 12,
//       color: '#888',
//       fontWeight: '500',
//     },
//     contributorsContainer: {
//       flex: 1,
//       flexDirection: 'row',
//       flexWrap: 'wrap',
//     },
//     contributorName: {
//       fontSize: 12,
//       color: '#666',
//       fontWeight: '500',
//     },
//     createButton: {
//       position: 'absolute',
//       bottom: 20,
//       alignSelf: 'center',
//       backgroundColor: '#6200EE',
//       paddingVertical: 12,
//       paddingHorizontal: 24,
//       borderRadius: 30,
//       elevation: 5,
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.3,
//       shadowRadius: 3,
//     },
//     createButtonText: {
//       color: '#FFF',
//       fontWeight: 'bold',
//       fontSize: 16,
//     },
//   });

// export default CauseItemProper;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Cause } from '../types/cause';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const JoinedCauseItem = ({ 
  cause, 
}: { 
  cause: Cause; 
}) => {
  const router = useRouter();
  
  const handleStartJaap = () => {
    router.push({
      pathname: '/Jaap/',
      params: { jaapGoal: cause.goal, jaapTitle: cause.title },
    });
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
    <TouchableOpacity
      style={styles.causeCard}
      onPress={handleStartJaap}
      activeOpacity={0.9}
    >
      {/* Baani Badge */}
      <View style={styles.baaniBadge}>
        <Text style={styles.baaniText}>Baani</Text>
      </View>
      
      <View style={styles.cardHeader}>
        <Text style={styles.causeName}>{cause.title}</Text>
        <View style={styles.membersContainer}>
          <Ionicons name="people" size={14} color="#4A6FE7" />
          <Text style={styles.membersText}>{cause.members.length}</Text>
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
        <LinearGradient
          colors={['#6A3093', '#A044FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.startJaapButton}
        >
          <Text style={styles.startJaapText}>Start Jaap</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  causeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    position: 'relative',
  },
  baaniBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: '#6A3093',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#6A3093',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  baaniText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  causeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    letterSpacing: 0.2,
  },
  membersContainer: {
    backgroundColor: '#F0F5FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  membersText: {
    fontSize: 12,
    color: '#4A6FE7',
    fontWeight: '600',
    marginLeft: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    height: 10,
    backgroundColor: '#EEF1F6',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  startJaapButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#6A3093',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  startJaapText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  }
});

export default JoinedCauseItem;