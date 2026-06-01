import React from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';
import Verified from '../assets/icons/Verified.jsx';

const ProfileCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: user?.profile_picture || 'https://via.placeholder.com/80',
        }}
        style={styles.profileImage}
      />
      <View style={{ gap: 4 }}>
        <View style={{ gap: 2 }}>
          <Text style={styles.name}>{user?.full_name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        {user?.is_email_verified ? (
          <View style={styles.verified}>
            <Verified width={16} height={16} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        ) : (
          <View style={styles.notVerified}>
            <Text style={styles.notVerifiedText}>Not Verified</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    gap: 16,
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#DBEAFF',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  verified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DBEAFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#DBEAFF',
  },
  verifiedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#165DFC',
  },
  notVerifiedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#92400E',
  },
  notVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FEF9C3',
  },
});

export default ProfileCard;
