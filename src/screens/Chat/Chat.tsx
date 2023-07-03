import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  limit,
  startAfter,
} from 'firebase/firestore';
import { authentication, database } from 'libs/firebase';
import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { scaleByHeight, scaleByWidth } from 'utils/theme';

export const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newChatMessages, setNewChatMessages] = useState<IMessage[]>([]);
  const [moreChatsAvailable, setMoreChatsAvailable] = useState<boolean>(true);

  const collectionRef = collection(database, 'chats');

  const messageLimit = 25;

  useLayoutEffect(() => {
    const constraints = [orderBy('createdAt', 'desc'), limit(messageLimit)];
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
    return unsubscribe;
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
    if (messages.length < messageLimit) return setMoreChatsAvailable(false);

    const lastVisible = newChatMessages.length
      ? newChatMessages[newChatMessages.length - 1]
      : messages[messages.length - 1];

    const constraints = [
      orderBy('createdAt', 'desc'),
      startAfter(lastVisible.createdAt),
      limit(messageLimit),
    ];

    const q = query(collectionRef, ...constraints);

    onSnapshot(q, querySnapshot => {
      const newMessages = querySnapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));

      setNewChatMessages(newMessages);

      if (!newMessages.length) {
        return setMoreChatsAvailable(false);
      }

      setMessages(previousMessages =>
        GiftedChat.append(newMessages, previousMessages),
      );
    });
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage
        loadEarlier={moreChatsAvailable}
        infiniteScroll
        onLoadEarlier={onLoadEarlier}
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
    paddingBottom: scaleByHeight(10),
  },
});
