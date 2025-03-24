// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { Link } from 'expo-router';

// const StartCause = ({  }) => {
//   // State for form data
//   const [groupName, setGroupName] = useState('');
//   const [goalName, setGoalName] = useState('');
//   const [goalAmount, setGoalAmount] = useState('');
//   const [memberName, setMemberName] = useState('');
//   const [members, setMembers] = useState([]);

//   // Add member to the list
//   const addMember = () => {
//     if (memberName.trim() === '') {
//       Alert.alert('Error', 'Please enter a member name');
//       return;
//     }

//     // Add new member with unique ID
//     setMembers([...members, { id: Date.now().toString(), name: memberName.trim() }]);
//     setMemberName(''); // Clear input field
//   };

//   // Remove member from the list
//   const removeMember = (id) => {
//     setMembers(members.filter(member => member.id !== id));
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     // Validate inputs
//     if (groupName.trim() === '') {
//       Alert.alert('Error', 'Please enter a group name');
//       return;
//     }
//     if (goalName.trim() === '') {
//       Alert.alert('Error', 'Please enter a goal name');
//       return;
//     }
//     if (goalAmount.trim() === '' || isNaN(Number(goalAmount))) {
//       Alert.alert('Error', 'Please enter a valid goal amount');
//       return;
//     }
//     if (members.length === 0) {
//       Alert.alert('Error', 'Please add at least one member');
//       return;
//     }

//     // Create group object
//     const newGroup = {
//       id: Date.now().toString(),
//       name: groupName.trim(),
//       goal: {
//         name: goalName.trim(),
//         amount: Number(goalAmount),
//       },
//       members: members,
//       createdAt: new Date().toISOString(),
//     };

//     // Here you would typically save this data to your state management or API
//     console.log('New Group Created:', newGroup);
    
//     // Show success and navigate back (you can replace with your navigation logic)
//     Alert.alert(
//       'Success',
//       'Group created successfully!'
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView style={styles.scrollView}>
//           <View style={styles.content}>
//             <Text style={styles.title}>Create a New Group</Text>
            
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Group Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={groupName}
//                 onChangeText={setGroupName}
//                 placeholder="Enter group name"
//               />
//             </View>
            
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Goal Name</Text>
//               <TextInput
//                 style={styles.input}
//                 value={goalName}
//                 onChangeText={setGoalName}
//                 placeholder="Enter goal name"
//               />
//             </View>
            
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Goal Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={goalAmount}
//                 onChangeText={setGoalAmount}
//                 placeholder="Enter goal amount"
//                 keyboardType="numeric"
//               />
//             </View>
            
//             <View style={styles.memberSection}>
//               <Text style={styles.label}>Add Members</Text>
//               <View style={styles.addMemberRow}>
//                 <TextInput
//                   style={styles.memberInput}
//                   value={memberName}
//                   onChangeText={setMemberName}
//                   placeholder="Enter member name"
//                 />
//                 <TouchableOpacity style={styles.addButton} onPress={addMember}>
//                   <Text style={styles.addButtonText}>Add</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
            
//             {members.length > 0 && (
//               <View style={styles.memberList}>
//                 <Text style={styles.memberListTitle}>Members:</Text>
//                 {members.map((member) => (
//                   <View key={member.id} style={styles.memberItem}>
//                     <Text style={styles.memberName}>{member.name}</Text>
//                     <TouchableOpacity
//                       style={styles.removeButton}
//                       onPress={() => removeMember(member.id)}
//                     >
//                       <Text style={styles.removeButtonText}>Remove</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}
//               </View>
//             )}
            
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//               <Text style={styles.submitButtonText}>Create Group</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   keyboardAvoid: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//     textAlign: 'center',
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#555',
//     fontWeight: '500',
//   },
//   input: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   memberSection: {
//     marginBottom: 15,
//   },
//   addMemberRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   memberInput: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginRight: 10,
//   },
//   addButton: {
//     backgroundColor: '#6200ee',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   memberList: {
//     marginBottom: 20,
//   },
//   memberListTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//     color: '#555',
//   },
//   memberItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderRadius: 8,
//     marginBottom: 8,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   memberName: {
//     fontSize: 16,
//   },
//   removeButton: {
//     backgroundColor: '#ff5252',
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 6,
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   submitButton: {
//     backgroundColor: '#6200ee',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default StartCause;