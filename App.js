import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = () => {
    setMessages([...messages, { text: input, user: true }]);
    setInput("");
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <ScrollView 
        style={styles.messagesContainer} 
        ref={scrollViewRef}
      >
        {messages.map((message, index) => (
          <Text key={index} style={message.user ? styles.userMessage : styles.aiMessage}>
            {message.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={text => setInput(text)}
          placeholder="Type your message..."
          placeholderTextColor="white"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
    backgroundColor: '#f1faee',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 50,
    marginBottom: 30,
  },
  userMessage: {
    fontSize: 20,
    textAlign: 'right',
    color: '#1d3557',
    margin: 5,
  },
  aiMessage: {
    textAlign: 'left',
    color: 'green',
    margin: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#1d3557',
    borderRadius: 5,
    marginHorizontal: 10,
    marginBottom: 30,
    padding: 5,
    color: '#1d3557',
  },
  sendButton: {
    backgroundColor: '#a8dadc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#1d3557',
    fontSize: 18,
  }
});
