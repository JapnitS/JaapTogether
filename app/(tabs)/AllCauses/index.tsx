import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';

import { sampleCauses } from '@/constants/initialCauses';
import { Cause } from '@/types/cause';
import AllCauseItem from '@/components/AllCauseItem';


// Ek Onkar SVG Path

const AllCauses = ({  }) => {
  const renderCauseItem = ({ item } : {item: Cause}) => {
    const progressPercentage = (item.currentJaaps / item.goal) * 100;
    
    return (
      <AllCauseItem cause={item} onJoin={() => {}} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Join a Cause</Text>
        
      </View>

      <FlatList
        data={sampleCauses}
        renderItem={renderCauseItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => {}}
      >
        <Text style={styles.createButtonText}>+ Start New Cause</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginBottom: 10,
    width: 80,
    height: 80,
    
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  listContainer: {
    padding: 16,
  },
  causeCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  causeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  membersContainer: {
    backgroundColor: '#F0F5FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  membersText: {
    fontSize: 12,
    color: '#4A6FE7',
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A6FE7',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#EEF1F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFA500',
    borderRadius: 4,
  },
  recentActivity: {
    flexDirection: 'row',
    marginTop: 8,
  },
  recentText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  contributorsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contributorName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  createButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AllCauses;