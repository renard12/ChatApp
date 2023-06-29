import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { authentication, database } from 'libs/firebase';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { scaleByWidth } from 'utils/theme';

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const messageLimit = 25;

  const constraints = [orderBy('createdAt', 'desc'), limit(messageLimit)];

  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, ...constraints);

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const onLoadEarlier = () => {
    console.log('first');
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage
        showAvatarForEveryMessage
        loadEarlier
        listViewProps={{
          refreshControl: (
            <RefreshControl refreshing={refreshing} onRefresh={onLoadEarlier} />
          ),
        }}
        // onLoadEarlier={onLoadEarlier}
        onSend={messages => onSend(messages)}
        user={{
          _id: authentication?.currentUser?.email ?? 1,
          avatar: 'https://i.pravatar.cc/300',
          name: 'Test User',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleByWidth(12),
    flex: 1,
    paddingBottom: 10,
  },
});
