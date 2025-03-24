import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({  }) => {
//   const [userName, setUserName] = useState(route.params?.userName || '');

//   const handleSave = () => {
//     navigation.navigate('OpenCauses', { userName }); // Pass back to OpenCauses
//   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value="Abcd"
        // onChangeText={setUserName}
      />
      <Button title="Save" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, width: '80%', marginBottom: 15, borderRadius: 5 },
});

export default ProfileScreen;